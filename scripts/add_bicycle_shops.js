const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const bicycleShops = [
    {
        name: 'Bikeinn（バイクイン）',
        slug: 'bikeinn',
        url: 'https://www.tradeinn.com/bikeinn/jp',
        country: 'スペイン',
        category: 'サイクル・スポーツ',
        description: '世界最大級のスポーツ通販グループTradeinnが運営する自転車専門店。パーツ、ウェア、アクセサリを驚きの低価格で日本へ直送可能です。',
        ships_to_japan: true,
        popularity_score: 95
    },
    {
        name: 'Bike24',
        slug: 'bike24',
        url: 'https://www.bike24.com/',
        country: 'ドイツ',
        category: 'サイクル・スポーツ',
        description: 'ドイツを拠点とするヨーロッパ最大級の自転車通販サイト。シマノやカンパニョーロなどのコンポーネントが非常に充実しており、日本のサイクリスト御用達です。',
        ships_to_japan: true,
        popularity_score: 92
    },
    {
        name: 'Sigma Sports（シグマスポーツ）',
        slug: 'sigma-sports',
        url: 'https://www.sigmasports.com/',
        country: 'イギリス',
        category: 'サイクル・スポーツ',
        description: 'プレミアムなロードバイクやトライアスロンギアに特化したイギリスの有力店。最新のハイエンドモデルやスタイリッシュなウェアの品揃えに定評があります。',
        ships_to_japan: true,
        popularity_score: 88
    },
    {
        name: 'Mantel（マンテル）',
        slug: 'mantel',
        url: 'https://www.mantel.com/',
        country: 'オランダ',
        category: 'サイクル・スポーツ',
        description: 'オランダ最大の自転車通販サイト。迅速な配送と競争力のある価格設定、そして充実したテクニカルサポートが魅力です。',
        ships_to_japan: true,
        popularity_score: 80
    },
    {
        name: 'Evans Cycles（エバンスサイクル）',
        slug: 'evans-cycles',
        url: 'https://www.evanscycles.com/',
        country: 'イギリス',
        category: 'サイクル・スポーツ',
        description: 'イギリスで100年以上の歴史を持つ老舗自転車店。完成車からパーツまで幅広く扱い、信頼性の高いサービスを提供しています。',
        ships_to_japan: true,
        popularity_score: 85
    },
    {
        name: 'Bike-Discount',
        slug: 'bike-discount',
        url: 'https://www.bike-discount.de/en',
        country: 'ドイツ',
        category: 'サイクル・スポーツ',
        description: 'ドイツの格安自転車通販サイト。自社ブランド「Radon」の展開や、タイヤ、コンポーネント類の圧倒的な安さで世界中にファンがいます。',
        ships_to_japan: true,
        popularity_score: 82
    },
    {
        name: 'Bike-Components',
        slug: 'bike-components',
        url: 'https://www.bike-components.de/en/',
        country: 'ドイツ',
        category: 'サイクル・スポーツ',
        description: 'パーツ（コンポーネント）に特化したドイツの専門店。ニッチな部品から最新モデルまで揃い、テクニカルな要望に応える品揃えが特徴です。',
        ships_to_japan: true,
        popularity_score: 78
    },
    {
        name: 'Condor Cycles',
        slug: 'condor-cycles',
        url: 'https://www.condorcycles.com/',
        country: 'イギリス',
        category: 'サイクル・スポーツ',
        description: 'ロンドンに拠点を置く歴史ある自転車店。オリジナルの手作りフレームや、洗練されたサイクリングアパレルのセレクトが素晴らしい。',
        ships_to_japan: true,
        popularity_score: 70
    },
    {
        name: 'Ribble Cycles',
        slug: 'ribble-cycles',
        url: 'https://www.ribblecycles.co.uk/',
        country: 'イギリス',
        category: 'サイクル・スポーツ',
        description: '自社開発の高性能バイクで知られるイギリスのブランド。オンラインでのカスタムオーダーに対応しており、日本への配送も可能です。',
        ships_to_japan: true,
        popularity_score: 75
    },
    {
        name: 'Rapha（ラファ）',
        slug: 'rapha',
        url: 'https://www.rapha.cc/',
        country: 'イギリス',
        category: 'サイクル・スポーツ',
        description: '世界で最も洗練されたサイクリングウェアを提案するプレミアムブランド。機能性と高いデザイン性を兼ね備え、サイクリング文化を牽引しています。',
        ships_to_japan: true,
        popularity_score: 98
    }
];

async function addShops() {
    console.log('--- Adding Bicycle Shops to Supabase ---');
    for (const shop of bicycleShops) {
        const { data, error } = await supabase
            .from('shops')
            .upsert(shop, { onConflict: 'slug' });
        
        if (error) {
            console.error(`❌ Failed to add ${shop.name}:`, error.message);
        } else {
            console.log(`✅ Successfully added ${shop.name}`);
        }
    }
    console.log('--- Done ---');
}

addShops();
