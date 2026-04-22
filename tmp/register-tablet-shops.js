const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const tabletShops = [
  { 
    slug: 'aliexpress', 
    name: 'AliExpress（アリエクスプレス）', 
    url: 'https://ja.aliexpress.com/', 
    category: 'ガジェット・家電', 
    ships_to_japan: true, 
    description: 'タブレット個人輸入における最大のプラットフォーム。Lenovo（Xiaoxin）やXiaomi、Teclastなど中華タブレットの公式ストアが多数出店しており、大型セール時の安さは他を圧倒します。' 
  },
  { 
    slug: 'banggood', 
    name: 'Banggood（バングッド）', 
    url: 'https://www.banggood.com/', 
    category: 'ガジェット・家電', 
    ships_to_japan: true, 
    description: 'ガジェットオタク御用達の巨大通販サイト。安価なAndroidタブレットやミニPCの品揃えが豊富で、AliExpressよりも梱包が比較的丁寧なことで知られています。' 
  },
  { 
    slug: 'geekbuying', 
    name: 'Geekbuying（ギークバイイング）', 
    url: 'https://www.geekbuying.com/', 
    category: 'ガジェット・家電', 
    ships_to_japan: true, 
    description: '電子機器に特化した老舗の越境ECサイト。タブレットやスマートフォンの新製品がいち早く並び、日本向けの優先配送（Priority Line）が早いのが特徴です。' 
  },
  { 
    slug: 'bh-photo-video', 
    name: 'B&H Photo Video', 
    url: 'https://www.bhphotovideo.com/', 
    category: 'ガジェット・家電', 
    ships_to_japan: true, 
    description: 'アメリカ・ニューヨーク発の超名門カメラ・家電量販店。円高時やBlack Fridayには、プロ仕様のiPadやSamsung Galaxy Tabの高スペック版を安全に輸入するのに最適なショップです。' 
  },
  { 
    slug: 'gshopper', 
    name: 'Gshopper（ジーパーズ）', 
    url: 'https://www.gshopper.com/', 
    category: 'ガジェット・家電', 
    ships_to_japan: true, 
    description: 'Xiaomi系列のタブレット（Xiaomi Padシリーズ等）を異常なまでの割引クーポンで販売することで有名な新鋭サイト。最安値を狙うなら必ずチェックすべきです。' 
  },
  { 
    slug: 'etoren', 
    name: 'Etoren（イートレン）', 
    url: 'https://jp.etoren.com/', 
    category: 'ガジェット・家電', 
    ships_to_japan: true, 
    description: '香港・シンガポール発。最大の特徴は「表示価格が関税・消費税込み」であること。さらに12ヶ月の独自保証が付くため、海外モデルのタブレットを国内通販感覚で最も安全に買えます。' 
  }
];

async function insertTabletShops() {
  const { data, error } = await supabase.from('shops').upsert(tabletShops, { onConflict: 'slug' });
  if (error) {
    console.error('Error inserting tablet shops:', error);
  } else {
    console.log('Successfully registered 6 major TABLET & GADGET shops to the database!');
  }
}
insertTabletShops();
