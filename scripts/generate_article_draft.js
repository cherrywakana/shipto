/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const FACTORY_DIR = path.resolve(__dirname, '../tmp/article-factory');
const DRAFT_DIR = path.join(FACTORY_DIR, 'drafts');

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

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
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

function shopSummary(shop) {
    const bullets = [];
    if (shop.shipsToJapan !== false) bullets.push('日本発送候補');
    if (shop.category) bullets.push(shop.category);
    if (shop.country) bullets.push(shop.country);
    return bullets.join(' / ');
}

function buildDraftContent(brief) {
    const introShopNames = brief.topShops.slice(0, 3).map((shop) => shop.name).join('、');

    const sections = [];
    sections.push(`<p>「${escapeHtml(brief.primaryKeyword)}で探している」「${escapeHtml(brief.topShops[0]?.name || '海外通販')}のような有力ショップを比較したい」という人向けに、${escapeHtml(brief.title.replace(/^【.*?】/, ''))}の形で、買いやすさと比較しやすさを重視してまとめます。</p>`);
    sections.push(`<p>まずは ${escapeHtml(introShopNames)} など、${brief.topShops.length}つの候補から見ていくと探しやすいです。</p>`);

    sections.push(`<h2>${escapeHtml(brief.recommendedSections[0])}</h2>`);
    brief.topShops.forEach((shop, index) => {
        sections.push(`<h3>${index + 1}. ${escapeHtml(shop.name)}</h3>`);
        sections.push(`<p>${escapeHtml(shop.description || `${shop.name} は ${shopSummary(shop)} の条件で比較しやすいショップです。`)}</p>`);
        sections.push('<ul>');
        sections.push(`<li>向いている人: ${escapeHtml(shopSummary(shop) || '海外通販でこのブランドを探したい人')}</li>`);
        sections.push(`<li>比較ポイント: ${escapeHtml(shop.popularityScore ? `popularity_score ${shop.popularityScore} の有力候補` : '定番候補として比較しやすい')}</li>`);
        sections.push(`<li>確認ポイント: ${escapeHtml(shop.shipsToJapan === false ? '日本発送可否を先に確認' : '送料・関税・在庫を先に確認')}</li>`);
        sections.push('</ul>');
        if (shop.brandUrl || shop.shopUrl) {
            sections.push(`<p><a href="${escapeHtml(shop.brandUrl || shop.shopUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(shop.name)} で見る ↗</a></p>`);
        }
    });

    sections.push(`<h2>${escapeHtml(brief.recommendedSections[1])}</h2>`);
    sections.push('<ul>');
    sections.push('<li>国内完売品やサイズ欠け商品が見つかりやすい</li>');
    sections.push('<li>ショップごとに価格差があり、比較で得しやすい</li>');
    sections.push('<li>ブランドごとに強い海外ショップが存在する</li>');
    sections.push('</ul>');

    sections.push(`<h2>${escapeHtml(brief.recommendedSections[2])}</h2>`);
    sections.push('<ul>');
    sections.push('<li>日本発送の可否</li>');
    sections.push('<li>関税・送料の見え方</li>');
    sections.push('<li>返品条件</li>');
    sections.push('<li>在庫の深さと取扱モデル</li>');
    sections.push('</ul>');

    sections.push(`<h2>${escapeHtml(brief.recommendedSections[3])}</h2>`);
    sections.push('<table><thead><tr><th>ショップ</th><th>カテゴリ</th><th>発送</th><th>比較情報</th></tr></thead><tbody>');
    brief.topShops.slice(0, 6).forEach((shop) => {
        sections.push(`<tr><td>${escapeHtml(shop.name)}</td><td>${escapeHtml(shop.category || '-')}</td><td>${escapeHtml(shop.shipsToJapan === false ? '要確認' : '候補')}</td><td>${escapeHtml(shopSummary(shop) || '-')}</td></tr>`);
    });
    sections.push('</tbody></table>');

    sections.push(`<h2>${escapeHtml(brief.recommendedSections[4])}</h2>`);
    sections.push('<p>まずは日本発送候補が多いショップから確認し、次に価格差が出やすいセレクトショップを比較する流れが使いやすいです。</p>');

    sections.push(`<h2>${escapeHtml(brief.recommendedSections[5])}</h2>`);
    sections.push(`<p>${escapeHtml(brief.primaryKeyword)}の意図なら、最初の比較候補は ${escapeHtml(introShopNames)} あたりから入るのがおすすめです。より詳しい比較はショップ詳細ページとブランド一覧もあわせて見ると判断しやすくなります。</p>`);

    return sections.join('\n');
}

async function createDraftFromBrief(brief) {
    const [posts, draftRegistry] = await Promise.all([
        fetchPosts(),
        Promise.resolve(collectDraftRegistry()),
    ]);

    assertUniqueTarget(brief, posts, draftRegistry);

    const html = buildDraftContent(brief);
    return {
        generatedAt: new Date().toISOString(),
        canonicalTarget: brief.canonicalTarget,
        slug: brief.slug,
        title: brief.title,
        primaryKeyword: brief.primaryKeyword,
        secondaryKeywords: brief.secondaryKeywords,
        internalLinks: brief.internalLinks,
        topShops: brief.topShops,
        html,
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
    buildDraftContent,
    createDraftFromBrief,
};
