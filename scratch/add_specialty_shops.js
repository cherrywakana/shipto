
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const NEW_SHOPS = [
  {
    name: 'Vitacost（ビタコスト）',
    slug: 'vitacost',
    url: 'https://www.vitacost.com/',
    country: 'アメリカ',
    category: 'コスメ・ヘルスケア',
    image_url: 'https://www.vitacost.com/Images/logo-blue.svg',
    description: 'iHerbと双璧をなす世界的なサプリメント・自然派食品のECサイト。iHerbでは扱っていないブランドも多く、価格競争力も非常に高いのが特徴です。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: '原則として関税未払い（DDU）です。16,666円以下の免税範囲内での購入が推奨されます。iHerbと同様の基準で関税が発生します。',
    fee_guide: '国際送料は重量制です。頻繁に送料無料キャンペーンや「Buy 1 Get 1 Free」などの大型セールを実施しています。'
  },
  {
    name: 'Digi-Key（デジキー）',
    slug: 'digi-key',
    url: 'https://www.digikey.jp/',
    country: 'アメリカ',
    category: 'ガジェット・家電',
    image_url: 'https://www.digikey.jp/-/media/Images/Marketing/Logos/DigiKey_Logo_Primary_600x315.png',
    description: '世界最大級の電子部品通販サイト。プロから電子工作ファンまで幅広く利用されており、数百万点の在庫を1点から購入可能。日本への配送スピードは驚異的です。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: 'チェックアウト時に消費税・関税が含まれる（DDP）場合が多く、非常に明快です。6,000円以上の注文で手数料等が無料になる仕組みがあります。',
    fee_guide: '6,000円以上の注文で日本への配送料が無料。米国から最短2〜3日で手元に届くため、国内通販と変わらないスピード感です。'
  },
  {
    name: 'Evo（イーヴォ）',
    slug: 'evo',
    url: 'https://www.evo.com/',
    country: 'アメリカ',
    category: 'スポーツ・アウトドア',
    image_url: 'https://www.evo.com/content/dam/evo/logos/evo_logo_black.png',
    description: 'スノーボード、スキー、サーフィン、自転車等のギアを専門に扱うショップ。アウトレットコーナーの割引率が高く、一流ブランドのギアが国内定価の半額以下になることも。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）での発送となります。スノーボード板やブーツなどは関税が無税（消費税のみ）のケースが多いですが、購入前に最新の関税率を確認することをお勧めします。',
    fee_guide: 'UPSやFedEx等を利用した国際配送。送料は重量制でカート内で計算されます。大型商品も日本まで直送可能です。'
  },
  {
    name: 'Moosejaw（ムースジョー）',
    slug: 'moosejaw',
    url: 'https://www.moosejaw.com/',
    country: 'アメリカ',
    category: 'スポーツ・アウトドア',
    image_url: 'https://www.moosejaw.com/content/dam/moosejaw/logos/mj-logo.svg',
    description: '米国のアウトドア用品大手。Patagonia、The North Face、Arc\'teryxなどの主要ブランドが豊富。遊び心のあるサイトデザインと、強力な報酬プログラムが魅力です。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: '原則としてDDU（受取時支払い）です。購入金額が16,666円を超えると関税・消費税が発生する可能性があります。特定ブランドの直送制限には注意。',
    fee_guide: '国際送料は重量に応じて計算されます。米国の祝日に合わせた大型セール時の価格は国内を圧倒します。'
  },
  {
    name: 'Whittard of Chelsea（ウィッタード）',
    slug: 'whittard-of-chelsea',
    url: 'https://www.whittard.co.uk/',
    country: 'イギリス',
    category: 'ホーム・ライフスタイル',
    image_url: 'https://www.whittard.co.uk/on/demandware.static/-/Library-Sites-WhittardLibrary/default/dw1062b9a7/images/logos/whittard-logo.png',
    description: '1886年創業、ロンドンの老舗紅茶店。紅茶、コーヒー、ホットチョコレートの品質はもちろん、アリスのデザインなどを取り入れた美しいパッケージが世界中で愛されています。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。紅茶などの食品は免税範囲内（16,666円以下）であれば無税ですが、金額により国内消費税が発生する場合があります。',
    fee_guide: '日本までの国際送料は、重量に応じて計算されます。一定額（目安£100以上）で送料が割引または固定になるキャンペーンが実施されることもあります。'
  },
  {
    name: 'Thomann（トーマン）',
    slug: 'thomann',
    url: 'https://www.thomann.de/',
    country: 'ドイツ',
    category: 'ホーム・ライフスタイル',
    image_url: 'https://www.thomann.de/static/img/layout/logo.svg',
    description: 'ヨーロッパ最大の楽器・音響機材専門EC。ギター、ベース、DTM機器、照明機材など、あらゆる音楽機材が驚異的な安さで揃います。独自ブランド「Harley Benton」は高コスパで有名。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: '表示価格はドイツの付加価値税(VAT)抜きで、日本受取時に日本の消費税（約10%）と、楽器の種類に応じた関税（ギター等は無税が多い）を支払います。',
    fee_guide: '日本への配送料は一律（目安5,000円〜7,000円程度）に設定されていることが多く、複数商品をまとめ買いすると非常にお得です。UPS等で迅速に届きます。'
  }
]

async function addShops() {
  console.log('Adding new specialty shops with high-quality data...')

  for (const shop of NEW_SHOPS) {
    const { data: existing } = await supabase
      .from('shops')
      .select('id')
      .eq('slug', shop.slug)
      .single()

    if (existing) {
      console.log(`Shop "${shop.name}" already exists. Skipping.`)
      continue
    }

    const { error } = await supabase
      .from('shops')
      .insert([shop])

    if (error) {
      console.error(`Error adding ${shop.name}:`, error)
    } else {
      console.log(`Successfully added "${shop.name}"`)
    }
  }
}

addShops()
