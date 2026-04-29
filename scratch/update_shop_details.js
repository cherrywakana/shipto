
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SHOP_UPDATES = [
  {
    slug: 'amazon-us',
    shipping_guide: '○ 対応',
    tax_guide: 'Import Fees Depositシステムにより、関税・消費税の見積額を注文時に先払いできます。受取時の支払いは原則不要で、実際の税額が安かった場合は差額が返金されます。',
    fee_guide: '配送スピードに応じて3つのプランから選択可能。Priority（優先配送）なら最短2〜5営業日で到着します。送料は商品の重量・サイズにより計算されます。'
  },
  {
    slug: 'ebay',
    shipping_guide: '○ 対応',
    tax_guide: 'Global Shipping Program (GSP)対象商品は、関税・消費税が注文時に計算・先払いされます。それ以外はセラーにより異なり、受取時に支払い（DDU）が必要な場合があります。',
    fee_guide: '送料はセラーや商品ごとに異なります。GSP対象品は国際送料も明確に表示されますが、セラー直接配送の場合は事前に確認が必要です。'
  },
  {
    slug: 'iherb',
    shipping_guide: '○ 対応',
    tax_guide: '関税込み（DDP）表示です。カート内で関税が計算され、支払い合計に含まれるため、受取時の追加支払いはありません。免税範囲内での買い物が非常にスムーズです。',
    fee_guide: '一定金額（目安6,000円前後）以上の注文で送料無料。佐川急便やヤマト運輸が配送を担当し、国内通販に近い利便性があります。'
  },
  {
    slug: 'myprotein',
    shipping_guide: '○ 対応',
    tax_guide: '原則として関税未払い（DDU）です。16,666円を超える注文や、衣類が含まれる場合は受取時に関税・消費税が発生する可能性があるため注意が必要です。',
    fee_guide: '8,500円〜9,000円以上の注文で送料無料。それ未満は1,800円〜2,500円程度の送料がかかります。追跡付きの配送で安心です。'
  },
  {
    slug: 'bh-photo-video',
    shipping_guide: '○ 対応',
    tax_guide: '支払い時に「Duties & Taxes」を先払い（Pre-paid）するオプションが選べます。これを利用すれば受取時の支払いは一切不要（DDP）になります。',
    fee_guide: 'DHLやFedExによる超高速配送に対応。送料は商品の重量によりますが、日本までの配送スピードは海外通販の中でもトップクラスです。'
  },
  {
    slug: 'newegg',
    shipping_guide: '○ 対応',
    tax_guide: 'チェックアウト時にVATおよび関税の見積額が表示され、先払い（DDP）が可能です。受取時のサプライズを避けることができます。',
    fee_guide: '日本への直送に対応したNewegg Global対象商品が豊富。送料はカート内で自動計算されます。'
  },
  {
    slug: 'temu',
    shipping_guide: '○ 対応',
    tax_guide: '基本的に関税未払い（DDU）ですが、個々の商品価格が安いため免税範囲に収まることがほとんどです。高額注文時は注意が必要です。',
    fee_guide: 'ほぼすべての注文で送料無料キャンペーンを実施中。低価格ながら追跡可能な配送を提供しています。'
  },
  {
    slug: 'fortnum-and-mason',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）での発送となります。紅茶や食品は免税範囲内（16,666円以下）であれば無税ですが、金額により受取時に消費税等が発生します。',
    fee_guide: '英国からの国際送料は重量制です。軽量なギフトで£25〜£40程度から。梱包が非常に丁寧で、高級感のある配送品質です。'
  }
]

async function updateShopDetails() {
  console.log('Updating shop details with high-quality guides...')

  for (const update of SHOP_UPDATES) {
    const { error } = await supabase
      .from('shops')
      .update({
        shipping_guide: update.shipping_guide,
        tax_guide: update.tax_guide,
        fee_guide: update.fee_guide,
        updated_at: new Date().toISOString()
      })
      .eq('slug', update.slug)

    if (error) {
      console.error(`Error updating ${update.slug}:`, error)
    } else {
      console.log(`Successfully updated detailed guides for "${update.slug}"`)
    }
  }
}

updateShopDetails()
