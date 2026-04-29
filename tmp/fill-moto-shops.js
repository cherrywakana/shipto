const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updates = [
  {
    slug: 'fc-moto',
    country: 'ドイツ',
    category: 'オートバイ用品・ヘルメット',
    description: 'ドイツを拠点とする世界最大級のオートバイ用品専門店。AraiやSHOEIはもちろん、DaineseやAlpinestarsなどトップブランドの品揃えが圧倒的です。日本への配送も対応しており、セール時には国内価格の半額近くになることも。',
    shipping_guide: 'DHL等を通じて日本へ直送可能',
    tax_guide: 'チェックアウト時は非課税（付加価値税免除）になり、日本での受け取り時に日本の関税・消費税を配達員に支払うDDU方式です。',
    fee_guide: '送料は重量によって変動しますが、通常3,000円〜5,000円程度かかります。',
    is_affiliate: true,
    popularity_score: 95
  },
  {
    slug: 'motardinn',
    country: 'スペイン',
    category: 'オートバイ用品・ヘルメット',
    description: 'スペインの巨大ECグループ「TradeInn」が運営するバイク用品専門サイト。とにかく送料が安く抑えられる配送オプションの多さと、膨大な在庫が魅力。小間物からヘルメットまで幅広く揃います。',
    shipping_guide: '日本郵便（EMS）またはDHLでの直送に対応',
    tax_guide: '関税・消費税は受け取り時払いのDDU方式（免税価格で購入可能）。',
    fee_guide: '日本郵便を選択すると送料が1,000円台〜と格安になることが多いです。',
    is_affiliate: true,
    popularity_score: 90
  },
  {
    slug: 'chromeburner',
    country: 'オランダ',
    category: 'オートバイ用品・ヘルメット',
    description: 'オランダの急成長中バイク用品EC。特にヘルメットの品揃えと価格競争力に優れています。発送が非常に速く、梱包も丁寧なことで日本のライダーからも高く評価されています。',
    shipping_guide: 'FedEx等による日本へのスピーディーな直送に対応',
    tax_guide: '関税・消費税は受け取り時払いのDDU方式。システム上、EUの消費税は自動で控除されます。',
    fee_guide: '一定金額以上の購入で日本への送料無料キャンペーンを行うことがあります。',
    is_affiliate: true,
    popularity_score: 85
  },
  {
    slug: 'revzilla',
    country: 'アメリカ',
    category: 'オートバイ用品・ヘルメット',
    description: 'アメリカ最大のオンラインモーターサイクルストア。IconやBellなど、アメリカンブランドやクルーザー向けアイテム、USフィットのウェアを探すならここが一番です。',
    shipping_guide: 'メーカーによっては日本直送不可のため、Planet Express等の米国輸入代行サービス（転送）の併用を推奨します。',
    tax_guide: 'アメリカ国内の通販のため、非課税州へ転送すれば州税はかかりません。日本到着時に国内関税がかかります。',
    fee_guide: '米国国内は一定額以上で送料無料。転送費用が別途かかります。',
    is_affiliate: true,
    popularity_score: 80
  },
  {
    slug: 'xlmoto',
    country: 'スウェーデン',
    category: 'オートバイ用品・ヘルメット',
    description: 'ヨーロッパ圏に広大なネットワークを持つバイク用品店。自社ブランドのスリップオンマフラーやバッグ類が非常に安く、頻繁に行われるメガセールが特徴です。',
    shipping_guide: '日本への海外直送が可能',
    tax_guide: '受け取り時に関税・消費税を支払うDDU方式になります。',
    fee_guide: 'ヨーロッパ圏内からの発送となるため、送料は数千円程度かかります。',
    is_affiliate: true,
    popularity_score: 75
  },
  {
    slug: 'louis-motorrad',
    country: 'ドイツ',
    category: 'オートバイ用品・ヘルメット',
    description: 'ヨーロッパ最大の超老舗モーターサイクルストア。Vanucciなど高品質なオリジナルブランドが充実しており、ツーリング用品やキャンプギアまでバイクに関するすべてが揃います。',
    shipping_guide: 'DHL一律料金による日本直送に対応',
    tax_guide: 'EU消費税免税。関税・消費税は国内到着時に支払い。',
    fee_guide: 'DHLの送料が一律設定（約20ユーロ強）で分かりやすいのが特徴です。',
    is_affiliate: true,
    popularity_score: 85
  },
  {
    slug: 'champion-helmets',
    country: 'オランダ',
    category: 'オートバイ用品・ヘルメット',
    description: 'ヘルメットを主軸に扱う気鋭のショップ。YouTubeでの詳細なレビュー動画が世界中で人気を博しており、日本人向けサポートやサイトの日本語化にも力を入れています。',
    shipping_guide: '安心の日本直送対応',
    tax_guide: 'EU等域外免税。関税・消費税は国内到着時に支払い。',
    fee_guide: '商品購入の際に課金される送料が明確で、還元ポイントシステムも豊富。',
    is_affiliate: true,
    popularity_score: 80
  },
  {
    slug: 'burnout-italy',
    country: 'イタリア',
    category: 'オートバイ用品・ヘルメット',
    description: 'ダイネーゼやアルパインスターズ等、イタリアンブランドのバイクギアを本国価格で安く買える専門店。ハイエンドなレーシングスーツなども豊富に揃います。',
    shipping_guide: '日本直送に完全対応',
    tax_guide: 'EU域外からの注文は自動的に免税価格が表示されます。関税着払い。',
    fee_guide: '重量に応じて変動しますが、イタリア本国から迅速に配送されます。',
    is_affiliate: true,
    popularity_score: 75
  },
  {
    slug: 'lids',
    country: 'アメリカ',
    category: 'ファッション',
    description: "北米最大のスポーツヘッドウェア専門店。ニューエラキャップの品揃えは世界一で、限定コラボやMLBショップ独占モデルが多数あります。",
    shipping_guide: '日本への直接配送不可。米国輸入代行（転送サービス）が必須です。',
    tax_guide: 'オレゴン州などの非課税州の転送アドレスを利用すれば米国消費税ゼロ。到着時に日本の関税を払います。',
    fee_guide: '米国国内の送料は小額、もしくは一定額で無料。転送手数料と国際送料が別途かかります。',
    is_affiliate: true,
    popularity_score: 85
  },
  {
    slug: 'amazingstore',
    country: '日本',
    category: 'ファッション',
    description: "並行輸入のニューエラを極めて大量に扱う国内最大クラスのセレクトショップ。転送や言語の壁を気にせず、安全・国内最速で海外限定モデルが手に入ります。",
    shipping_guide: '日本国内からの発送',
    tax_guide: '表示価格はすべて国内の消費税・関税・輸入経費が含まれたコミコミ価格です。',
    fee_guide: '国内通販のため、全国一律の通常送料設定。翌日配送等も可能です。',
    is_affiliate: false,
    popularity_score: 85
  }
];

async function fillMissingData() {
  console.log('Filling missing NULL fields for 10 recent shops...');
  for (const shop of updates) {
    const { error } = await supabase
      .from('shops')
      .update({
        country: shop.country,
        category: shop.category,
        description: shop.description,
        shipping_guide: shop.shipping_guide,
        tax_guide: shop.tax_guide,
        fee_guide: shop.fee_guide,
        is_affiliate: shop.is_affiliate,
        popularity_score: shop.popularity_score
      })
      .eq('slug', shop.slug);

    if (error) {
      console.error(`❌ Error updating ${shop.slug}:`, error.message);
    } else {
      console.log(`✅ Fully populated: ${shop.slug}`);
    }
  }
  console.log('Update Complete.');
}

fillMissingData();
