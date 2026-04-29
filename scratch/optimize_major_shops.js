
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'aliexpress',
    name: 'AliExpress（アリエクスプレス）',
    category: '総合・マーケットプレイス',
    shipping_guide: '○ 対応',
    tax_guide: '基本的に関税未払い（DDU）ですが、16,666円以下の免税範囲内であれば無税です。多くのセラーが低価格で出品しているため、一点買いなら税金はほぼかかりません。',
    fee_guide: '「AliExpress Selection Standard」など追跡可能な配送方法を選ぶのがおすすめ。多くの商品が無料または数百円の低価格で日本まで届きます。'
  },
  {
    slug: 'asos',
    name: 'ASOS（エイソス）',
    category: 'ファッション・スニーカー',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）ですが、免税範囲（16,666円）以内なら無税。高額注文時は、関税が発生しても国内より安くなるケースが多いです。',
    fee_guide: '一定金額（約6,000円〜8,000円前後）以上の注文で日本への配送料が無料になります。それ未満でも1,000円前後とリーズナブルです。'
  },
  {
    slug: 'shein',
    name: 'SHEIN（シーイン）',
    category: 'ファッション・スニーカー',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）ですが、1点あたりの単価が安いため免税範囲に収まることがほとんどです。',
    fee_guide: '2,000円程度の注文で送料無料になることが多く、海外通販としては異例のハードルの低さです。追跡も完備されており非常に安心。'
  },
  {
    slug: 'lookfantastic',
    name: 'Lookfantastic（ルックファンタスティック）',
    category: 'コスメ・ヘルスケア',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）ですが、16,666円以下なら無税。サイトは完全に日本語化されており、初めての個人輸入でも迷うことはありません。',
    fee_guide: '約9,000円以上の注文で日本への配送料が無料になります。定期的に開催されるセールや割引コードの利用が非常にお得です。'
  },
  {
    slug: 'selfridges',
    name: 'SELFRIDGES（セルフリッジズ）',
    category: 'ホーム・ライフスタイル',
    shipping_guide: '○ 対応',
    tax_guide: '関税・消費税込み（DDP）。チェックアウト時に最終額が表示され、受け取り時の追加支払いはありません。高級デパートならではの安心感があります。',
    fee_guide: '年間配送料金プラン「Selfridges+ Global」（約7,000円）に加入すると、回数無制限で日本まで送料無料。コスメや食品を頻繁に買うなら必須のプランです。'
  },
  {
    slug: 'banggood',
    name: 'Banggood（バングッド）',
    category: 'ガジェット・家電',
    shipping_guide: '○ 対応',
    tax_guide: '基本的に関税未払い（DDU）ですが、チェックアウト時に関税保証（Tariff Insurance）を付けられる場合があり、万が一の課税時も安心です。',
    fee_guide: '「Japan Direct Mail」を選択すれば、日本国内は佐川急便等で迅速に届きます。送料も数百円〜と非常に安価に抑えられています。'
  },
  {
    slug: 'backcountry',
    name: 'Backcountry（バックカントリー）',
    category: 'スポーツ・アウトドア',
    shipping_guide: '○ 対応',
    tax_guide: '関税・消費税別。米国からの個人輸入となり、日本での受け取り時に消費税がかかります。Patagonia等の特定ブランドは日本への直送制限がある場合があるため注意。',
    fee_guide: 'UPSやDHLなどの高速国際配送を利用。送料はカート内で重量に基づき計算されます。米国の大型セール時期を狙うと非常に。お得です。'
  }
]

const NEW_SHOPS = [
  {
    name: 'Etsy（エッツィー）',
    slug: 'etsy',
    url: 'https://www.etsy.com/',
    country: 'アメリカ/世界',
    category: 'ホーム・ライフスタイル',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Etsy_logo.svg/1200px-Etsy_logo.svg.png',
    description: '世界中のクリエイターからハンドメイド作品、ヴィンテージ品、クラフト素材を購入できるマーケットプレイス。世界に一つだけのアクセサリーやインテリアを探すのに最適です。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: 'セラーの所在国により異なりますが、多くはDDU（受取時支払い）です。16,666円以下なら免税ですが、高額なヴィンテージ品などは注意が必要です。',
    fee_guide: '送料はセラーごとに異なります。複数の商品を同じセラーから買うと送料が割引される場合もあります。'
  },
  {
    name: 'Sephora（セフォラ）',
    slug: 'sephora',
    url: 'https://www.sephora.com/',
    country: 'アメリカ',
    category: 'コスメ・ヘルスケア',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Sephora_logo.svg/1200px-Sephora_logo.svg.png',
    description: '世界最大級のビューティーショップ。日本未上陸の有名コスメブランドや、Sephora限定アイテムが豊富に揃います。コスメ好きにとっての「聖地」です。',
    ships_to_japan: true,
    shipping_guide: '○ 対応',
    tax_guide: 'チェックアウト時に関税・消費税が計算されるDDP（関税込み）方式です。受取時の追加支払いを心配せず買い物ができます。',
    fee_guide: '一定金額以上の注文で日本への配送料が固定、または割引になります。10,000円前後を目安にカートを確認するのがおすすめです。'
  }
]

async function processShops() {
  console.log('Processing shop updates and additions...')

  // Updates
  for (const update of UPDATES) {
    const { error } = await supabase
      .from('shops')
      .update(update)
      .eq('slug', update.slug)

    if (error) {
      console.error(`Error updating ${update.slug}:`, error)
    } else {
      console.log(`Updated "${update.name}" with high-quality data.`)
    }
  }

  // New Additions
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

processShops()
