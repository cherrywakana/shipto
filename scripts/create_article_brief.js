/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const OUTPUT_DIR = path.resolve(__dirname, '../tmp/article-factory');

function parseArgs(argv) {
    const args = {
        brandSlug: null,
        type: 'brand-guide',
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--brand-slug' && argv[i + 1]) {
            args.brandSlug = argv[++i];
        } else if (arg === '--type' && argv[i + 1]) {
            args.type = argv[++i];
        }
    }

    return args;
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function keywordSet(brandName, category) {
    const keywordBase = category === 'ラグジュアリー・ハイブランド'
        ? ['安い 海外通販', 'どこで買う', '本物 買える']
        : category === 'スポーツ・アウトドア'
            ? ['安い 海外通販', '個人輸入', 'おすすめショップ']
            : ['安い 海外通販', 'おすすめショップ', 'どこで買う'];

    return keywordBase.map((suffix) => `${brandName} ${suffix}`);
}

async function fetchBrandContext(brandSlug) {
    const { data: brand, error: brandError } = await supabase
        .from('brands')
        .select('id, slug, name, has_guide_article')
        .eq('slug', brandSlug)
        .single();

    if (brandError || !brand) throw new Error(`Brand not found: ${brandSlug}`);

    const { data: shopBrands, error: shopError } = await supabase
        .from('shop_brands')
        .select(`
            brand_url,
            shops:shop_id (
                name,
                slug,
                category,
                country,
                description,
                image_url,
                popularity_score,
                ships_to_japan,
                is_affiliate
            )
        `)
        .eq('brand_id', brand.id)
        .eq('status', 'found');

    if (shopError) throw shopError;

    const shops = (shopBrands || [])
        .flatMap((row) => {
            if (!row.shops) return [];
            return [{ ...row.shops, brand_url: row.brand_url }];
        })
        .sort((a, b) => {
            if (a.is_affiliate !== b.is_affiliate) return b.is_affiliate ? 1 : -1;
            if (a.ships_to_japan !== b.ships_to_japan) return b.ships_to_japan !== false ? 1 : -1;
            return (b.popularity_score || 0) - (a.popularity_score || 0);
        });

    return {
        brand,
        shops,
    };
}

function buildBrief(context) {
    const topShops = context.shops.slice(0, 8);
    if (topShops.length === 0) {
        throw new Error(`No shop candidates found for brand: ${context.brand.slug}`);
    }

    const primaryCategory = topShops[0]?.category || '海外通販';
    const keywords = keywordSet(context.brand.name, primaryCategory);
    const slug = `${context.brand.slug}-overseas-shopping-guide`;

    return {
        type: 'brand-guide',
        canonicalTarget: `brand:${context.brand.slug}:cheap-overseas-shopping`,
        slug,
        title: `【2026年最新】${context.brand.name}が安い海外通販サイトおすすめ${Math.max(topShops.length, 3)}選`,
        primaryKeyword: keywords[0],
        secondaryKeywords: keywords.slice(1),
        searchIntent: 'ブランド商品を安く安全に買える海外通販サイトを探したい',
        monetizationGoal: 'ブランド詳細から高意図でショップへ送客する',
        recommendedSections: [
            `${context.brand.name}が安い海外通販サイトおすすめ${Math.max(topShops.length, 3)}選`,
            `${context.brand.name}を海外通販で買うメリット`,
            `${context.brand.name}を買う前に確認したいポイント`,
            `${context.brand.name}のおすすめショップ比較表`,
            `${context.brand.name}に強いショップの選び方`,
            `まとめ: ${context.brand.name}を買うならどこが有力か`,
        ],
        internalLinks: [
            `/brands/${context.brand.slug}`,
            ...topShops.slice(0, 5).map((shop) => `/shops/${shop.slug}`),
            '/articles/overseas-shopping-beginners-guide',
            '/articles/overseas-shopping-customs-tax',
        ],
        topShops: topShops.map((shop, index) => ({
            rankHint: index + 1,
            name: shop.name,
            slug: shop.slug,
            category: shop.category,
            country: shop.country,
            shipsToJapan: shop.ships_to_japan,
            popularityScore: shop.popularity_score,
            brandUrl: shop.brand_url,
            shopUrl: shop.url,
            description: shop.description,
        })),
        writingGuidelines: [
            '見出し直後に、どの読者に向いている記事かを明示する。',
            'ショップごとに「向いている人」「注意点」「直送可否」を短く書く。',
            '公式サイトCTAは各ショップ節の終わりに入れる。',
            '比較表や要点リストを使って、スクロールせず価値が伝わるようにする。',
            '情報系に寄りすぎず、最終的にショップ遷移したくなる構成にする。',
        ],
    };
}

async function main() {
    ensureDir(OUTPUT_DIR);

    const args = parseArgs(process.argv.slice(2));
    if (!args.brandSlug) {
        throw new Error('Usage: node scripts/create_article_brief.js --brand-slug <slug>');
    }

    const context = await fetchBrandContext(args.brandSlug);
    const brief = buildBrief(context);

    const outputPath = path.join(OUTPUT_DIR, `${args.brandSlug}-brief.json`);
    fs.writeFileSync(outputPath, `${JSON.stringify(brief, null, 2)}\n`);

    console.log(JSON.stringify({
        ok: true,
        outputPath,
        title: brief.title,
        primaryKeyword: brief.primaryKeyword,
        topShopCount: brief.topShops.length,
    }, null, 2));
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
