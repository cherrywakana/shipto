
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'mouser',
    country: 'アメリカ',
    description: '1964年創業、テキサス州に拠点を置く世界有数の電子部品ディストリビューター。数百万点の在庫を持ち、半導体から受動部品まで、最新の電子部品を1点から購入可能です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税・消費税込み（DDP）方式。チェックアウト時の合計金額に日本の消費税等が含まれており、商品受取時の追加支払いは一切ありません。',
    fee_guide: '6,000円以上の注文で日本への配送料が無料。テキサスから最短3〜4営業日で到着する、国内通販と遜色ないスピード感が最大の魅力です。'
  },
  {
    slug: 'play-asia',
    country: '香港',
    description: 'アジア圏のゲーム、アニメグッズ、ガジェットに特化した通販サイト。日本未発売の海外版ゲームや、逆に日本の限定品を海外から買い戻す際にも利用されるユニークな存在です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。購入金額が16,666円を超える場合、日本到着時に消費税や通関手数料が発生します。免税範囲内での買い物がおすすめです。',
    fee_guide: '国際郵便からDHL等のエクスプレス便まで、予算に合わせて配送方法を選択可能。送料は商品のサイズ・重量に応じてカート内で計算されます。'
  },
  {
    slug: 'kbdfans',
    country: '中国',
    description: '世界中のカスタムキーボード愛好家から絶大な支持を受ける専門ショップ。独自の基板(PCB)、ケース、スイッチ、キーキャップなど、こだわりのパーツが豊富に揃います。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。キーボードパーツは関税が無税（0%）となることが多いですが、16,666円を超える注文には国内消費税（約10%）が受取時に課税されます。',
    fee_guide: 'FedExやDHLによる高速配送に対応。送料は重量制ですが、世界中から注文が集まるショップのため、日本への配送も非常に安定しています。'
  },
  {
    slug: 'global', // OLIVE YOUNG Global (Automatically generated slug was 'global' based on URL)
    name: 'OLIVE YOUNG Global（オリーブヤング）',
    country: '韓国',
    description: '韓国最大のドラッグストア「オリーブヤング」の公式グローバルサイト。最新のK-Beautyトレンドを反映したスキンケア、メイクアップ製品が現地と変わらない鮮度で手に入ります。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。免税範囲（16,666円）以内での注文が推奨されます。韓国からの発送のため、通関も比較的スムーズです。',
    fee_guide: '$60以上の注文で日本への配送料が無料。頻繁に開催される「BIG SALE」期間中は、さらにお得な割引やプロモーションが実施されます。'
  },
  {
    slug: 'fragrancex',
    country: 'アメリカ',
    description: 'ブランド香水の在庫処分やディスカウント品を専門に扱う、世界最大級の香水EC。日本国内では廃盤になった希少な香りや、最新のデザイナー香水が格安で見つかります。',
    shipping_guide: '○ 対応',
    tax_guide: 'チェックアウト時に関税・消費税を先払いできるオプションを選択可能。これにより受取時の手間を省き、確定した総額で安心して買い物ができます。',
    fee_guide: '一定金額以上の注文で送料無料になるクーポンが常時提供されています。香水というデリケートな商品の国際配送において、長年の実績と信頼があります。'
  },
  {
    slug: 'lightinthebox',
    country: '中国',
    description: 'アパレルから家庭用ガジェット、ウェディング関連まで幅広く扱うグローバル総合通販。AliExpressに近い品揃えながら、独自のサプライチェーンによる低価格が強みです。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。低価格商品が多いため免税範囲に収まりやすいですが、まとめ買いなどで高額になる場合は、受取時の消費税課税に注意が必要です。',
    fee_guide: '配送方法を複数から選択可能。最も安価な方法から、追跡可能なエクスプレス便まで予算に応じて選べます。送料はカート内で自動計算されます。'
  }
]

async function finalizeSpecialBatch() {
  console.log('Finalizing special batch (Gadget/Cosmetic/Marketplace) with detailed data...')

  for (const update of UPDATES) {
    const { error } = await supabase
      .from('shops')
      .update({
        name: update.name || undefined,
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

finalizeSpecialBatch()
