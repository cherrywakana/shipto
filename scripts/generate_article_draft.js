/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const FACTORY_DIR = path.resolve(__dirname, '../tmp/article-factory');
const DRAFT_DIR = path.join(FACTORY_DIR, 'drafts');
const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = process.env.OPENAI_ARTICLE_MODEL || 'gpt-5.4';
const MIN_TEXT_LENGTH = 2200;
const MIN_SECTION_COUNT = 5;
const MIN_SHOP_LINKS = 3;
const MAX_GENERATION_ATTEMPTS = 2;

function parseArgs(argv) {
    const args = {
        brief: null,
        brandSlug: null,
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--brief' && argv[i + 1]) {
            args.brief = argv[++i];
        } else if (arg === '--brand-slug' && argv[i + 1]) {
            args.brandSlug = argv[++i];
        }
    }

    return args;
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function getBriefPath(args) {
    if (args.brief) return path.resolve(process.cwd(), args.brief);
    if (args.brandSlug) return path.join(FACTORY_DIR, `${args.brandSlug}-brief.json`);
    throw new Error('Usage: node scripts/generate_article_draft.js --brief <path> or --brand-slug <slug>');
}

async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('slug, title, category');

    if (error) throw error;
    return data || [];
}

function inferCanonicalTargetFromPost(post) {
    if (post.slug.endsWith('-overseas-shopping-guide')) {
        const brandSlug = post.slug.replace(/-overseas-shopping-guide$/, '');
        return `brand:${brandSlug}:cheap-overseas-shopping`;
    }

    const title = (post.title || '').toLowerCase();
    if (title.includes('ハイブランド') && title.includes('海外通販')) {
        return 'category:ラグジュアリー・ハイブランド:best-overseas-shopping-sites';
    }
    if ((title.includes('スニーカー') || title.includes('海外スニーカー')) && title.includes('海外通販')) {
        return 'category:ストリート・スニーカー:best-overseas-shopping-sites';
    }
    if (title.includes('アウトドア') && title.includes('海外通販')) {
        return 'category:スポーツ・アウトドア:best-overseas-shopping-sites';
    }

    return null;
}

function collectDraftRegistry() {
    if (!fs.existsSync(DRAFT_DIR)) return [];

    return fs.readdirSync(DRAFT_DIR)
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
            const fullPath = path.join(DRAFT_DIR, file);
            try {
                const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                return {
                    canonicalTarget: data.canonicalTarget || null,
                    slug: data.slug || null,
                    source: fullPath,
                };
            } catch {
                return null;
            }
        })
        .filter(Boolean);
}

function assertUniqueTarget(brief, posts, draftRegistry) {
    const postOwner = posts.find((post) => inferCanonicalTargetFromPost(post) === brief.canonicalTarget && post.slug !== brief.slug);
    if (postOwner) {
        throw new Error(`Canonical target already owned by existing post: ${postOwner.slug}`);
    }

    const draftOwner = draftRegistry.find((draft) => draft.canonicalTarget === brief.canonicalTarget && draft.slug !== brief.slug);
    if (draftOwner) {
        throw new Error(`Canonical target already owned by existing draft: ${draftOwner.source}`);
    }
}

function normalizeText(value) {
    return String(value || '')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractTextFromResponsePayload(payload) {
    if (payload.output_text) return payload.output_text;

    const output = Array.isArray(payload.output) ? payload.output : [];
    const textParts = [];

    output.forEach((item) => {
        if (!Array.isArray(item.content)) return;
        item.content.forEach((part) => {
            if (part.type === 'output_text' && part.text) {
                textParts.push(part.text);
            }
        });
    });

    return textParts.join('\n').trim();
}

function extractJsonObject(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) {
        throw new Error('Model returned an empty response.');
    }

    try {
        return JSON.parse(trimmed);
    } catch {
        const firstBrace = trimmed.indexOf('{');
        const lastBrace = trimmed.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
            throw new Error('Could not find JSON object in model response.');
        }
        return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    }
}

function summarizeShop(shop) {
    return {
        rankHint: shop.rankHint,
        name: shop.name,
        shopSlug: shop.slug,
        category: shop.category || null,
        country: shop.country || null,
        shipsToJapan: shop.shipsToJapan,
        popularityScore: shop.popularityScore || null,
        brandUrl: shop.brandUrl || null,
        shopUrl: shop.shopUrl || null,
        description: shop.description || null,
    };
}

function buildPromptPayload(brief) {
    return {
        title: brief.title,
        slug: brief.slug,
        primaryKeyword: brief.primaryKeyword,
        secondaryKeywords: brief.secondaryKeywords,
        searchIntent: brief.searchIntent,
        monetizationGoal: brief.monetizationGoal,
        canonicalTarget: brief.canonicalTarget,
        recommendedSections: brief.recommendedSections,
        internalLinks: brief.internalLinks,
        writingGuidelines: brief.writingGuidelines,
        topShops: brief.topShops.map(summarizeShop),
    };
}

function buildWriterPrompt(brief) {
    const payload = JSON.stringify(buildPromptPayload(brief), null, 2);

    return [
        'あなたは、日本語のアフィリエイト記事を自然に書ける編集者です。',
        '与えられた情報だけを根拠に、検索意図と送客の両方を満たす高品質な記事を書いてください。',
        'ブランドやショップに関する未提供の事実は捏造しないでください。わからないことは断定せず、比較の観点や選び方として自然に書いてください。',
        '文章はテンプレ感を避け、読み手がそのまま比較とクリックに進める流れにしてください。',
        '出力は JSON 1個だけにしてください。キーは "html" と "quality_summary" のみです。',
        '"html" は article 本文として使う HTML 文字列です。Markdown は使わず、<h2> <h3> <p> <ul> <li> <table> <thead> <tbody> <tr> <th> <td> <strong> <a> の範囲で組み立ててください。',
        '"quality_summary" は 80文字以内で、記事の狙いと読後行動を要約してください。',
        '必須要件:',
        `- 本文テキストは ${MIN_TEXT_LENGTH}文字以上`,
        `- <h2> を ${MIN_SECTION_COUNT}個以上`,
        '- 冒頭2段落で「この記事でわかること」と「どんな人向けか」を自然に説明する',
        '- 上位ショップを比較する table を1つ入れる',
        '- 少なくとも上位3ショップには外部リンク付き CTA を入れる',
        '- 少なくとも1つは内部リンクを入れる',
        '- 各ショップ紹介では「どんな人に向いているか」「見る前に気をつけたい点」を自然文で触れる',
        '- まとめでは最初に見るべきショップ群を短く提案する',
        '避けること:',
        '- 箇条書きだらけで終えること',
        '- どのショップにも同じ説明を繰り返すこと',
        '- 「最新条件は公式を確認」などの運営目線の注意書きを多用すること',
        '- 根拠のない最安保証、安全保証、配送保証',
        '使ってよい情報は以下のみです。',
        payload,
    ].join('\n');
}

function buildRevisionPrompt(brief, firstPass, issues) {
    return [
        buildWriterPrompt(brief),
        '',
        '前回の出力を改善してください。前回HTML:',
        firstPass.html,
        '',
        '修正すべき品質上の問題:',
        ...issues.map((issue) => `- ${issue}`),
        '',
        '同じ JSON 形式で、全面的に改善した完成版だけを返してください。',
    ].join('\n');
}

function collectOutgoingLinks($) {
    return $('a[href]')
        .map((_, element) => $(element).attr('href'))
        .get()
        .filter(Boolean);
}

function validateGeneratedArticle(brief, candidate) {
    const issues = [];
    const html = normalizeText(candidate?.html);
    const qualitySummary = normalizeText(candidate?.quality_summary);

    if (!html) {
        issues.push('html が空です。');
        return { isValid: false, issues };
    }

    const $ = cheerio.load(html);
    const textContent = normalizeText($.text());
    const headings = $('h2');
    const tableCount = $('table').length;
    const outgoingLinks = collectOutgoingLinks($);
    const externalLinks = outgoingLinks.filter((href) => /^https?:\/\//.test(href));
    const internalLinks = outgoingLinks.filter((href) => href.startsWith('/'));
    const paragraphs = $('p')
        .map((_, element) => normalizeText($(element).text()))
        .get()
        .filter((value) => value.length >= 25);
    const uniqueParagraphs = new Set(paragraphs.map((value) => value.replace(/[。、！!？?\s]/g, ''))).size;
    const topShopLinks = brief.topShops
        .map((shop) => shop.brandUrl || shop.shopUrl)
        .filter(Boolean)
        .filter((href) => externalLinks.includes(href));

    if (textContent.length < MIN_TEXT_LENGTH) {
        issues.push(`本文が短すぎます。${MIN_TEXT_LENGTH}文字以上必要です。`);
    }

    if (headings.length < MIN_SECTION_COUNT) {
        issues.push(`<h2> が不足しています。${MIN_SECTION_COUNT}個以上必要です。`);
    }

    if (tableCount < 1) {
        issues.push('比較表がありません。');
    }

    if (topShopLinks.length < MIN_SHOP_LINKS) {
        issues.push(`ショップCTAが不足しています。少なくとも${MIN_SHOP_LINKS}ショップに外部リンクが必要です。`);
    }

    if (internalLinks.length < 1) {
        issues.push('内部リンクがありません。');
    }

    if (paragraphs.length < 8) {
        issues.push('段落数が少なく、読み物として薄いです。');
    }

    if (paragraphs.length > 0 && uniqueParagraphs / paragraphs.length < 0.8) {
        issues.push('段落の繰り返しが多く、テンプレ感があります。');
    }

    if (/TODO|TBD|PLACEHOLDER|ここに|未記入/i.test(textContent)) {
        issues.push('プレースホルダー表現が残っています。');
    }

    if (/最新条件は公式|公式サイトで確認してください|自己責任/i.test(textContent)) {
        issues.push('注意書きが運営都合に寄りすぎています。');
    }

    if (!qualitySummary) {
        issues.push('quality_summary が空です。');
    }

    return {
        isValid: issues.length === 0,
        issues,
        stats: {
            textLength: textContent.length,
            sectionCount: headings.length,
            tableCount,
            externalLinkCount: externalLinks.length,
            internalLinkCount: internalLinks.length,
        },
    };
}

async function callOpenAI(prompt, model = DEFAULT_MODEL) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is required for LLM article generation.');
    }

    const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model,
            input: prompt,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
    }

    const payload = await response.json();
    return extractJsonObject(extractTextFromResponsePayload(payload));
}

async function generateArticleWithQualityGate(brief) {
    let attempt = 0;
    let candidate = null;
    let validation = null;

    while (attempt < MAX_GENERATION_ATTEMPTS) {
        const prompt = attempt === 0
            ? buildWriterPrompt(brief)
            : buildRevisionPrompt(brief, candidate, validation.issues);

        candidate = await callOpenAI(prompt);
        validation = validateGeneratedArticle(brief, candidate);

        if (validation.isValid) {
            return {
                candidate,
                validation,
                attempts: attempt + 1,
            };
        }

        attempt += 1;
    }

    throw new Error(`Generated article failed quality checks: ${validation.issues.join(' / ')}`);
}

async function createDraftFromBrief(brief) {
    const [posts, draftRegistry] = await Promise.all([
        fetchPosts(),
        Promise.resolve(collectDraftRegistry()),
    ]);

    assertUniqueTarget(brief, posts, draftRegistry);

    const generation = await generateArticleWithQualityGate(brief);

    return {
        generatedAt: new Date().toISOString(),
        canonicalTarget: brief.canonicalTarget,
        slug: brief.slug,
        title: brief.title,
        primaryKeyword: brief.primaryKeyword,
        secondaryKeywords: brief.secondaryKeywords,
        internalLinks: brief.internalLinks,
        topShops: brief.topShops,
        html: generation.candidate.html,
        qualitySummary: generation.candidate.quality_summary,
        generationMeta: {
            provider: 'openai',
            model: DEFAULT_MODEL,
            attempts: generation.attempts,
            validation: generation.validation.stats,
        },
    };
}

async function main() {
    ensureDir(FACTORY_DIR);
    ensureDir(DRAFT_DIR);

    const args = parseArgs(process.argv.slice(2));
    const briefPath = getBriefPath(args);
    const brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));

    if (!brief.canonicalTarget) {
        throw new Error('Brief is missing canonicalTarget. Rebuild the brief with the latest script.');
    }

    const draft = await createDraftFromBrief(brief);

    const outputPath = path.join(DRAFT_DIR, `${brief.slug}.json`);
    fs.writeFileSync(outputPath, `${JSON.stringify(draft, null, 2)}\n`);

    console.log(JSON.stringify({
        ok: true,
        outputPath,
        canonicalTarget: brief.canonicalTarget,
        slug: brief.slug,
        title: brief.title,
        qualitySummary: draft.qualitySummary,
        generationMeta: draft.generationMeta,
    }, null, 2));
}

if (require.main === module) {
    main().catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });
}

module.exports = {
    fetchPosts,
    inferCanonicalTargetFromPost,
    collectDraftRegistry,
    assertUniqueTarget,
    buildWriterPrompt,
    validateGeneratedArticle,
    createDraftFromBrief,
};
