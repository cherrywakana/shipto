
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'bloomingdales',
    country: 'アメリカ',
    description: 'ニューヨークの「ビッグ・ブラウン・バッグ」で有名な高級百貨店。ファッション、ビューティー、ホーム用品まで、NYらしい洗練されたセレクトが魅力。日本円での決済や関税計算に対応しており、非常に使いやすいサイトです。',
    shipping_guide: '○ 対応',
    tax_guide: 'Borderfreeを介した関税先払い（DDP）に対応。チェックアウト時に日本円での確定総額が表示され、受取時の追加支払いは一切ありません。',
    fee_guide: '国際送料はカート内で自動計算されます。百貨店ならではの丁寧な梱包と、信頼性の高い配送ルート（DHL等）で日本まで直送されます。'
  },
  {
    slug: 'libertylondon',
    country: 'イギリス',
    description: '1875年創業、ロンドンのリージェント・ストリートに佇む伝説的な百貨店。独自のリバティプリントを施したテキスタイルや、世界中から集められた前衛的なファッション、ラグジュアリーなインテリアが揃います。',
    shipping_guide: '○ 対応',
    tax_guide: 'チェックアウト時に関税・消費税を確定させて支払う（DDP）ことが可能です。英国からの発送であっても、受取時の不透明な費用を気にする必要はありません。',
    fee_guide: '英国からの国際送料は重量制です。リバティプリントの生地や雑貨は軽量なため、複数購入しても送料を抑えやすく、ギフト探しにも最適です。'
  },
  {
    slug: 'bigbadtoystore',
    country: 'アメリカ',
    description: '世界中のコレクターに愛される米国最大級のトイショップ。アメコミ、映画、アニメのフィギュアやスタチューの予約において圧倒的な信頼を誇ります。マニアックな在庫も豊富。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。フィギュアは関税が無税（0%）となることが多いですが、16,666円を超える注文には国内消費税（約10%）が受取時に課税されます。',
    fee_guide: '独自の「Pile of Loot（お宝の山）」機能が最大の特徴。購入した商品を最長90日間無料で預かり、好きなタイミングで1つにまとめて発送することで、国際送料を大幅に節約できます。'
  },
  {
    slug: 'sideshow',
    country: 'アメリカ',
    description: '世界最高峰の品質を誇るスタチューやフィギュアのメーカー兼ショップ。マーベル、DC、スター・ウォーズなどの公式ライセンス製品が並び、その造形美はもはや芸術品の域です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。高額な製品が多いため、日本到着時に消費税（10%）と通関手数料が発生します。高額ですが、国内代理店を通すより早く、かつ限定版を入手できるメリットがあります。',
    fee_guide: '精密な商品を保護するため、極めて頑丈な二重梱包で発送されます。送料は重量とサイズにより算出。高額商品専用の保険付き配送で確実に届きます。'
  },
  {
    slug: 'theordinary',
    country: 'カナダ',
    description: '「誠実な美容」を掲げるDECIEM社の看板ブランド。高濃度の美容成分を配合しながら、広告費を削ることで驚異的な低価格を実現。世界中の美容マニアから絶大な信頼を寄せられている「成分系スキンケア」の代名詞です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。1点あたりの価格が数千円と安いため、免税範囲（16,666円）に収めるのが非常に容易です。関税コストを気にせず、最新の美容成分を試せます。',
    fee_guide: '一定金額（目安$35〜$50以上）の注文で日本への配送料が無料。複数の美容液をまとめ買いしても送料の心配がなく、非常にコストパフォーマンスが高いのが特徴です。'
  },
  {
    slug: 'glossier',
    country: 'アメリカ',
    description: '「肌を隠すのではなく、美しさを引き出す」という哲学で、NYのミレニアル世代から熱狂的な支持を得たビューティーブランド。ミニマルで可愛らしいデザインと、肌に優しい成分が特徴です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。免税範囲（16,666円）以内での買い物が推奨されます。',
    fee_guide: '国際配送料は重量制。ブランドを象徴するピンクのバブルポーチに丁寧に梱包されて届きます。自分へのご褒美や友人へのプレゼントとしても非常に人気があります。'
  }
]

async function finalizeGlobalBatch() {
  console.log('Finalizing global batch (Famous Dept/Hobby/Trendy Beauty) with detailed data...')

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

finalizeGlobalBatch()
