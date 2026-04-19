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
const MIN_TEXT_LENGTH = 2200;
const MIN_SECTION_COUNT = 5;
const MIN_SHOP_LINKS = 3;
const QUICK_MIN_TEXT_LENGTH = 900;
const QUICK_MIN_SECTION_COUNT = 3;

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

function buildCodexPrompt(brief) {
    const shopPayload = brief.topShops.map((shop) => ({
        rankHint: shop.rankHint,
        name: shop.name,
        slug: shop.slug,
        category: shop.category,
        country: shop.country,
        shipsToJapan: shop.shipsToJapan,
        popularityScore: shop.popularityScore,
        brandUrl: shop.brandUrl,
        shopUrl: shop.shopUrl,
        description: shop.description,
    }));

    return [
        'この記事本文は Codex が日本語で自然に書く。',
        'DBに入っている情報を根拠にしつつ、説明文はテンプレにせず、検索意図に沿った比較記事にする。',
        '未提供の事実は断定しない。わからないことは「選び方」「比較ポイント」として自然に処理する。',
        '出力形式は article 用 HTML。',
        '',
        '必須要件:',
        `- 本文テキスト ${MIN_TEXT_LENGTH}文字以上`,
        `- <h2> を ${MIN_SECTION_COUNT}個以上`,
        '- 冒頭2段落で対象読者とこの記事でわかることを伝える',
        '- 比較表を1つ入れる',
        '- 比較表のショップ名は各ショップへの外部リンクにする',
        `- 少なくとも ${MIN_SHOP_LINKS} ショップに外部リンクCTAを入れる`,
        '- 少なくとも1つ内部リンクを入れる',
        '- 各ショップで「向いている人」「注意点」を自然文で触れる',
        '- まとめで最初に見るべきショップ群を提案する',
        '',
        '避けること:',
        '- 同じ言い回しの繰り返し',
        '- 注意書きだらけの文章',
        '- DBにない断定情報の追加',
        '- 「この記事では」「〜ようにしています」「〜向けに絞っています」など記事の作りを説明するメタ文章',
        '- 読者に見せる必要のない運営目線の案内文',
        '',
        '記事素材:',
        JSON.stringify({
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
            topShops: shopPayload,
        }, null, 2),
    ].join('\n');
}

function resolveQualityProfile(candidate) {
    const style = candidate?.articleStyle || candidate?.article_style || 'standard';
    if (style === 'quick-buy-guide') {
        return {
            style,
            minTextLength: QUICK_MIN_TEXT_LENGTH,
            minSectionCount: QUICK_MIN_SECTION_COUNT,
        };
    }

    return {
        style: 'standard',
        minTextLength: MIN_TEXT_LENGTH,
        minSectionCount: MIN_SECTION_COUNT,
    };
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
    const qualitySummary = normalizeText(candidate?.qualitySummary || candidate?.quality_summary);
    const qualityProfile = resolveQualityProfile(candidate);

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

    if (textContent.length < qualityProfile.minTextLength) {
        issues.push(`本文が短すぎます。${qualityProfile.minTextLength}文字以上必要です。`);
    }

    if (headings.length < qualityProfile.minSectionCount) {
        issues.push(`<h2> が不足しています。${qualityProfile.minSectionCount}個以上必要です。`);
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

    if (/この記事では|ようにしています|向けに絞って|読者向けに|そのままボタンから|気になるショップがあれば/i.test(textContent)) {
        issues.push('記事の作りを説明するメタ文章が含まれています。');
    }

    if (!qualitySummary) {
        issues.push('qualitySummary が空です。');
    }

    return {
        isValid: issues.length === 0,
        issues,
        stats: {
            style: qualityProfile.style,
            textLength: textContent.length,
            sectionCount: headings.length,
            tableCount,
            externalLinkCount: externalLinks.length,
            internalLinkCount: internalLinks.length,
        },
    };
}

async function createDraftFromBrief(brief) {
    const [posts, draftRegistry] = await Promise.all([
        fetchPosts(),
        Promise.resolve(collectDraftRegistry()),
    ]);

    assertUniqueTarget(brief, posts, draftRegistry);

    return {
        status: 'awaiting_codex_article',
        generatedAt: new Date().toISOString(),
        canonicalTarget: brief.canonicalTarget,
        slug: brief.slug,
        title: brief.title,
        primaryKeyword: brief.primaryKeyword,
        secondaryKeywords: brief.secondaryKeywords,
        internalLinks: brief.internalLinks,
        topShops: brief.topShops,
        qualityChecklist: [
            `${MIN_TEXT_LENGTH}文字以上`,
            `${MIN_SECTION_COUNT}個以上の<h2>`,
            '比較表を含める',
            `${MIN_SHOP_LINKS}ショップ以上の外部リンクCTA`,
            '内部リンクを入れる',
            'テンプレ感を避ける',
        ],
        codexPrompt: buildCodexPrompt(brief),
        html: '',
        qualitySummary: '',
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
        status: draft.status,
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
    buildCodexPrompt,
    validateGeneratedArticle,
    createDraftFromBrief,
};
