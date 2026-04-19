/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const OUTPUT_DIR = path.resolve(__dirname, '../tmp/article-factory');

const CATEGORY_KEYWORD_MAP = {
    'ラグジュアリー・ハイブランド': ['安い 海外通販', 'どこで買う', '通販 おすすめ'],
    'ストリート・スニーカー': ['安い 海外通販', 'おすすめショップ', '海外限定 買い方'],
    'スポーツ・アウトドア': ['安い 海外通販', 'おすすめショップ', '個人輸入'],
    '自転車・パーツ': ['安い 海外通販', 'おすすめショップ', '個人輸入'],
    '韓国・アジアトレンド': ['安い 海外通販', 'おすすめサイト', 'どこで買う'],
    'コスメ・ビューティー': ['安い 海外通販', 'おすすめサイト', 'どこで買う'],
};

const CATEGORY_LIST_TEMPLATES = [
    {
        key: 'outdoor-bestshops',
        category: 'スポーツ・アウトドア',
        title: '海外アウトドア通販おすすめショップ一覧',
        primaryKeyword: 'アウトドア 海外通販 おすすめ',
        secondaryKeywords: ['登山 海外通販', 'キャンプ 海外通販', 'アウトドア用品 個人輸入'],
        angle: '収益が出ているアウトドア系ページ群を横展開する一覧記事。',
        slug: 'articles-plan/outdoor-overseas-shopping-sites',
    },
    {
        key: 'luxury-bestshops',
        category: 'ラグジュアリー・ハイブランド',
        title: 'ハイブランドが安い海外通販おすすめショップ一覧',
        primaryKeyword: 'ハイブランド 安い 海外通販',
        secondaryKeywords: ['ラグジュアリー 海外通販 おすすめ', 'ブランド品 海外通販 本物', '関税込み 海外通販'],
        angle: '高単価ブランドの比較意図を狙うマネーページ。',
        slug: 'articles-plan/luxury-overseas-shopping-sites',
    },
    {
        key: 'sneaker-bestshops',
        category: 'ストリート・スニーカー',
        title: 'スニーカーが安い海外通販おすすめショップ一覧',
        primaryKeyword: 'スニーカー 海外通販 おすすめ',
        secondaryKeywords: ['海外限定 スニーカー 買い方', 'ナイキ 海外通販', '海外スニーカーサイト'],
        angle: '既存のスニーカーページ群を再強化する一覧記事。',
        slug: 'articles-plan/sneaker-overseas-shopping-sites',
    },
] ;

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function slugToPathname(slug) {
    if (slug.startsWith('http')) return slug;
    if (slug.includes('/') && !slug.startsWith('articles/')) return `/${slug}`;
    if (slug.startsWith('articles/')) return `/${slug}`;
    return `/articles/${slug}`;
}

function readLatestSkimlinksPageReport() {
    const dir = path.resolve(__dirname, '../tmp/growth-metrics/skimlinks');
    if (!fs.existsSync(dir)) return null;

    const files = fs.readdirSync(dir)
        .filter((file) => file.startsWith('skimlinks-page-') && file.endsWith('.json'))
        .sort();

    if (files.length === 0) return null;

    const latest = path.join(dir, files[files.length - 1]);
    return JSON.parse(fs.readFileSync(latest, 'utf8'));
}

function keywordVariants(brandName, category) {
    const suffixes = CATEGORY_KEYWORD_MAP[category] || ['安い 海外通販', '通販 おすすめ', 'どこで買う'];
    return suffixes.map((suffix) => `${brandName} ${suffix}`);
}

function pageCategoryHint(page) {
    if (!page) return null;
    if (page.includes('/outdoor')) return 'スポーツ・アウトドア';
    if (page.includes('/fashionbrand/') || page.includes('/fashionshop/')) return 'ストリート・スニーカー';
    if (page.includes('/bicycle/')) return '自転車・パーツ';
    return null;
}

async function fetchBrandRows() {
    const { data, error } = await supabase
        .from('shop_brands')
        .select(`
            brand_id,
            brands:brand_id (
                slug,
                name,
                has_guide_article
            ),
            shops:shop_id (
                category,
                ships_to_japan,
                popularity_score
            )
        `)
        .eq('status', 'found');

    if (error) throw error;
    return data || [];
}

async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('slug, title, category');

    if (error) throw error;
    return data || [];
}

function buildBrandBacklog(rows, skimlinksPageReport) {
    const brandMap = new Map();
    const revenuePages = skimlinksPageReport?.rows || [];

    for (const row of rows) {
        const brand = row.brands;
        const shop = row.shops;
        if (!brand || !shop) continue;

        const existing = brandMap.get(brand.slug) || {
            slug: brand.slug,
            name: brand.name,
            hasGuideArticle: Boolean(brand.has_guide_article),
            categories: new Map(),
            shopCount: 0,
            japanShopCount: 0,
            popularityScore: 0,
            revenueSignal: 0,
        };

        existing.shopCount += 1;
        if (shop.ships_to_japan !== false) existing.japanShopCount += 1;
        existing.popularityScore += Number(shop.popularity_score || 0);

        const category = shop.category || 'その他';
        existing.categories.set(category, (existing.categories.get(category) || 0) + 1);

        brandMap.set(brand.slug, existing);
    }

    for (const entry of brandMap.values()) {
        const categoryEntries = [...entry.categories.entries()].sort((a, b) => b[1] - a[1]);
        entry.primaryCategory = categoryEntries[0]?.[0] || 'その他';

        const matchingRevenuePages = revenuePages.filter((row) => {
            const page = row.Page || '';
            return page.toLowerCase().includes(`/${entry.slug}/`);
        });

        entry.revenueSignal = matchingRevenuePages.reduce((sum, row) => sum + Number(row.Revenue || 0), 0);
        entry.avgPopularity = entry.shopCount > 0 ? entry.popularityScore / entry.shopCount : 0;
    }

    return [...brandMap.values()]
        .map((entry) => {
            const keywords = keywordVariants(entry.name, entry.primaryCategory);
            const score =
                (entry.hasGuideArticle ? 0 : 50)
                + (entry.japanShopCount * 6)
                + (entry.avgPopularity * 0.4)
                + Math.min(entry.revenueSignal / 1000, 50);

            return {
                type: entry.hasGuideArticle ? 'brand-refresh' : 'brand-guide',
                priorityScore: Number(score.toFixed(1)),
                slug: `${entry.slug}-overseas-shopping-guide`,
                title: `【2026年最新】${entry.name}が安い海外通販サイトおすすめ${Math.max(entry.japanShopCount, 3)}選`,
                brandSlug: entry.slug,
                brandName: entry.name,
                category: entry.primaryCategory,
                keywordPrimary: keywords[0],
                keywordSecondary: keywords.slice(1),
                rationale: [
                    entry.hasGuideArticle ? '既存ガイドの更新候補' : '未作成ブランドガイド',
                    `日本配送候補ショップ数: ${entry.japanShopCount}`,
                    `平均 popularity_score: ${entry.avgPopularity.toFixed(1)}`,
                    entry.revenueSignal > 0 ? `既存売上シグナル: ${Math.round(entry.revenueSignal)} JPY` : '既存売上シグナルなし',
                ],
                recommendedSections: [
                    `${entry.name}が安い海外通販ショップおすすめ`,
                    `${entry.name}を海外通販で買うメリット`,
                    `${entry.name}を買う前に確認したいポイント`,
                    `${entry.name}のおすすめショップ比較表`,
                ],
            };
        })
        .sort((a, b) => b.priorityScore - a.priorityScore);
}

function buildCategoryBacklog(posts, skimlinksPageReport) {
    const existingSlugs = new Set(posts.map((post) => post.slug));
    const revenueRows = skimlinksPageReport?.rows || [];

    return CATEGORY_LIST_TEMPLATES.map((template) => {
        const revenueSignal = revenueRows
            .filter((row) => pageCategoryHint(row.Page) === template.category)
            .reduce((sum, row) => sum + Number(row.Revenue || 0), 0);

        return {
            type: 'category-list',
            priorityScore: Number((40 + Math.min(revenueSignal / 1000, 60)).toFixed(1)),
            slug: template.slug,
            title: template.title,
            category: template.category,
            keywordPrimary: template.primaryKeyword,
            keywordSecondary: template.secondaryKeywords,
            rationale: [
                template.angle,
                revenueSignal > 0 ? `カテゴリ売上シグナル: ${Math.round(revenueSignal)} JPY` : 'カテゴリ売上シグナルは未取得',
                existingSlugs.has(template.slug) ? '既存記事あり。改善・更新候補として扱う' : '新規記事候補',
            ],
            recommendedSections: [
                `${template.category}で海外通販を使うメリット`,
                `${template.category}のおすすめショップ一覧`,
                'ショップの選び方',
                '送料・関税・配送で見るポイント',
            ],
        };
    }).sort((a, b) => b.priorityScore - a.priorityScore);
}

function writeMarkdown(backlog, outputPath) {
    const lines = [
        '# Article Backlog',
        '',
        `Generated at: ${new Date().toISOString()}`,
        '',
        '## Top Opportunities',
        '',
    ];

    backlog.slice(0, 25).forEach((item, index) => {
        lines.push(`### ${index + 1}. ${item.title}`);
        lines.push(`- Type: ${item.type}`);
        lines.push(`- Score: ${item.priorityScore}`);
        lines.push(`- Primary keyword: ${item.keywordPrimary}`);
        lines.push(`- Secondary keywords: ${item.keywordSecondary.join(' / ')}`);
        lines.push(`- Output slug: ${item.slug}`);
        lines.push(`- Path hint: ${slugToPathname(item.slug)}`);
        lines.push(`- Why now: ${item.rationale.join(' | ')}`);
        lines.push('');
    });

    fs.writeFileSync(outputPath, `${lines.join('\n')}\n`);
}

async function main() {
    ensureDir(OUTPUT_DIR);

    const [brandRows, posts] = await Promise.all([
        fetchBrandRows(),
        fetchPosts(),
    ]);

    const skimlinksPageReport = readLatestSkimlinksPageReport();
    const brandBacklog = buildBrandBacklog(brandRows, skimlinksPageReport);
    const categoryBacklog = buildCategoryBacklog(posts, skimlinksPageReport);
    const backlog = [...brandBacklog, ...categoryBacklog].sort((a, b) => b.priorityScore - a.priorityScore);

    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonPath = path.join(OUTPUT_DIR, `article-backlog-${stamp}.json`);
    const mdPath = path.join(OUTPUT_DIR, `article-backlog-${stamp}.md`);

    fs.writeFileSync(jsonPath, `${JSON.stringify({
        generatedAt: new Date().toISOString(),
        skimlinksSourceAvailable: Boolean(skimlinksPageReport),
        totalItems: backlog.length,
        backlog,
    }, null, 2)}\n`);
    writeMarkdown(backlog, mdPath);

    console.log(JSON.stringify({
        ok: true,
        totalItems: backlog.length,
        topItems: backlog.slice(0, 10).map((item) => ({
            type: item.type,
            title: item.title,
            score: item.priorityScore,
            keyword: item.keywordPrimary,
        })),
        jsonPath,
        mdPath,
    }, null, 2));
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
