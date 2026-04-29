
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'jomashop',
    country: 'アメリカ',
    description: '世界最大級の高級時計・ブランドファッションのディスカウントサイト。ロレックス、オメガ、タグ・ホイヤーなどの高級時計から、グッチやプラダのバッグまで、米国の並行輸入市場を活かした驚異的な安さが魅力です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。高額な時計やバッグを購入する場合、日本到着時に10%の消費税と通関手数料がかかります。国内定価との価格差が非常に大きいため、税金を払っても数十万円安くなるケースも多々あります。',
    fee_guide: '国際配送（DHL, UPS, FedEx等）に対応。高額商品の紛失・破損に備えた保険付き配送オプションの利用を強くお勧めします。'
  },
  {
    slug: 'thewhiskyexchange',
    country: 'イギリス',
    description: 'ロンドンに拠点を置く、世界最高峰のオンライン酒類販売店。特にウイスキーの品揃えは世界一と言われ、日本未発売の限定ボトルや、二度と手に入らない希少なオールドボトルを求めて世界中から注文が集まります。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。日本到着時に「酒税」と「消費税」が発生します。酒税はアルコール度数や量によりますが、1本あたり数百円程度。高額ボトルの場合は、事前のシミュレーションが重要です。',
    fee_guide: 'お酒専用の非常に頑丈な梱包で発送されます。英国からの送料はやや高めですが、輸送中の破損リスクを最小限に抑えたプロの配送品質です。'
  },
  {
    slug: 'carters',
    country: 'アメリカ',
    description: '1865年創業、全米シェアNo.1を誇るベビー・キッズ服ブランド。高品質ながら圧倒的な低価格、そして米国ブランドらしいカラフルで可愛らしいデザインが、日本のパパ・ママ層からも絶大な支持を得ています。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。衣類は関税率が比較的高めですが、16,666円以下の免税範囲内で購入すれば無税（0円）で個人輸入が可能です。こまめな小分け注文が賢い買い方です。',
    fee_guide: '日本への定額送料キャンペーン（例：3,000円固定など）を頻繁に実施。まとめ買いすることで、1着あたりのコストを国内メーカーよりも安く抑えることができます。'
  },
  {
    slug: 'adorama',
    country: 'アメリカ',
    description: 'ニューヨークに実店舗を構える、B&Hと双璧をなすカメラ・ビデオ機器の巨大ショップ。プロフェッショナル向けの機材から、最新のガジェット、中古品までを網羅。限定セットや大幅なポイント還元セールが狙い目です。',
    shipping_guide: '○ 対応',
    tax_guide: 'Borderfreeを介した関税先払い（DDP）をサポート。チェックアウト時に日本円での確定総額が表示され、受取時の追加支払いは一切不要。安心してプロ機材を輸入できます。',
    fee_guide: 'UPSやDHLによる超高速配送。最短2〜4営業日で日本まで届くため、急ぎの機材調達にも対応可能です。送料はカート内で自動計算されます。'
  },
  {
    slug: 'drop',
    country: 'アメリカ',
    description: 'ユーザーコミュニティの声を反映して製品を開発・販売するユニークなECサイト。特に高音質ヘッドホン（ゼンハイザーとのコラボ等）や、メカニカルキーボード、アウトドアギアにおいて、ここでしか買えない「Drop限定モデル」が絶大な人気を誇ります。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。オーディオ機器やキーボードは関税が無税（0%）となることが多いですが、16,666円を超える注文には国内消費税（約10%）が受取時に課税されます。',
    fee_guide: '受注生産（Group Buy）形式の商品も多いため、発送時期には注意が必要。国際送料は重量制で、追跡可能な方法で世界中に発送されます。'
  },
  {
    slug: 'zavvi',
    country: 'イギリス',
    description: '映画、ゲーム、アニメなどのポップカルチャーに特化した英国のエンタメEC。特に限定デザインの「スチールブック（映画Blu-rayケース）」や、LEGO、アパレル、コレクターズアイテムの品揃えは欧州随一です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。軽量なディスク類やフィギュアなどが多いため、免税範囲（16,666円）に収めやすく、個人輸入初心者でも利用しやすいショップです。',
    fee_guide: '英国からの配送料は比較的リーズナブル。追跡なしの安価な配送から、追跡付きの高速便まで選択可能です。限定品は予約段階で完売することが多いため、早めの注文が推奨されます。'
  }
]

async function finalizeSpecialtyBatch() {
  console.log('Finalizing specialty batch (Luxury/Gourmet/Kids/Hobby) with detailed data...')

  for (const update of UPDATES) {
    const { error } = await supabase
      .from('shops')
      .update({
        country: update.country,
        description: update.description,
        shipping_guide: update.shipping_guide,
        tax_guide: update.tax_guide,
        fee_guide: update.fee_guide,
        updated_at: new Date().toISOString()
      })
      .eq('slug', update.slug)

    if (error) {
      console.error(`Error updating ${update.slug}:`, error)
    } else {
      console.log(`Successfully finalized "${update.slug}"`)
    }
  }
}

finalizeSpecialtyBatch()
