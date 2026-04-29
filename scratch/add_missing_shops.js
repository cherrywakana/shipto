
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const NEW_SHOPS = [
  {
    name: 'Amazon (US)',
    slug: 'amazon-us',
    url: 'https://www.amazon.com/',
    country: 'アメリカ',
    category: '総合・マーケットプレイス',
    image_url: 'https://m.media-amazon.com/images/G/01/social_share/amazon_logo._CB633266945_.png',
    description: '世界最大の通販サイト。日本のアカウントとは別に登録が必要ですが、日本未発売のガジェットや日用品が豊富。日本への直送（Global Shipping）に対応した商品も多い。',
    ships_to_japan: true,
    is_affiliate: false,
    popularity_score: 95
  },
  {
    name: 'eBay',
    slug: 'ebay',
    url: 'https://www.ebay.com/',
    country: 'アメリカ',
    category: '総合・マーケットプレイス',
    image_url: 'https://p.ebaystatic.com/aw/social/logo_ebay_1200x630.png',
    description: '世界最大のオークション・マーケットプレイス。ヴィンテージ品、コレクターズアイテムから最新ガジェットまで、世界中のセラーから購入可能。セラーによって配送条件が異なります。',
    ships_to_japan: true,
    is_affiliate: false,
    popularity_score: 90
  },
  {
    name: 'iHerb',
    slug: 'iherb',
    url: 'https://jp.iherb.com/',
    country: 'アメリカ',
    category: 'コスメ・ヘルスケア',
    image_url: 'https://images.extratix.com/merchants/iHerb-Logo.png',
    description: '日本人に最も利用されているサプリメント・オーガニック製品の通販サイト。日本語対応、日本円決済、迅速な配送で国内通販と変わらない感覚で利用可能。',
    ships_to_japan: true,
    is_affiliate: true,
    popularity_score: 98
  },
  {
    name: 'Myprotein',
    slug: 'myprotein',
    url: 'https://www.myprotein.jp/',
    country: 'イギリス',
    category: 'コスメ・ヘルスケア',
    image_url: 'https://static.thcdn.com/images/v2/app/img/logos/myprotein_logo.svg',
    description: 'ヨーロッパNO.1のスポーツ栄養ブランド。プロテイン、サプリメント、スポーツウェアが圧倒的なコスパで手に入る。頻繁に開催される大型セールが有名。',
    ships_to_japan: true,
    is_affiliate: true,
    popularity_score: 85
  },
  {
    name: 'B&H Photo Video',
    slug: 'bh-photo-video',
    url: 'https://www.bhphotovideo.com/',
    country: 'アメリカ',
    category: 'ガジェット・家電',
    image_url: 'https://static.bhphoto.com/images/bh-logo-header.png',
    description: 'ニューヨークに拠点を持つ世界最大級のカメラ・ビデオ・オーディオ専門店。日本への送料が安く、配送スピード（DHL/FedEx）が非常に早いことで有名。関税の事前支払いも可能。',
    ships_to_japan: true,
    is_affiliate: false,
    popularity_score: 80
  },
  {
    name: 'Newegg',
    slug: 'newegg',
    url: 'https://www.newegg.com/global/jp-en/',
    country: 'アメリカ',
    category: 'ガジェット・家電',
    image_url: 'https://promotions.newegg.com/nepro/19-0931/600x315.png',
    description: 'PCパーツやPC周辺機器に強い老舗テック系ECサイト。自作PC派やゲーマーには必須のサイトで、日本直送にも対応している商品が多数。',
    ships_to_japan: true,
    is_affiliate: false,
    popularity_score: 75
  },
  {
    name: 'TEMU',
    slug: 'temu',
    url: 'https://www.temu.com/',
    country: '中国',
    category: '総合・マーケットプレイス',
    image_url: 'https://ku-static.temu.com/fb/8e860959-8664-4638-b79e-43632598380d.png',
    description: '「億万長者のように買い物をしよう」を掲げる超低価格の総合マーケットプレイス。衣類、雑貨、家電、玩具などが驚きの価格で揃い、日本国内でも急激に利用者が増えています。',
    ships_to_japan: true,
    is_affiliate: false,
    popularity_score: 92
  },
  {
    name: 'Fortnum & Mason',
    slug: 'fortnum-and-mason',
    url: 'https://www.fortnumandmason.com/',
    country: 'イギリス',
    category: 'ホーム・ライフスタイル',
    image_url: 'https://www.fortnumandmason.com/media/wysiwyg/fortnumandmason-logo.png',
    description: '1707年創業、英国王室御用達の老舗百貨店。世界的に有名な紅茶や、美しいパッケージの菓子類、ハンパー（詰め合わせ）などが日本へ直送可能。ギフトにも最適。',
    ships_to_japan: true,
    is_affiliate: false,
    popularity_score: 70
  }
]

async function addShops() {
  console.log('Checking for existing shops...')
  
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
