
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'casetify',
    country: '香港',
    description: 'LA発のグローバルテックアクセサリーブランド。自分好みにカスタマイズできるiPhoneケースは世界中で爆発的な人気。耐衝撃性に優れ、サステナブルな素材も採用しています。',
    shipping_guide: '○ 対応',
    tax_guide: '関税込み（DDP）方式。表示価格に輸入関税が含まれているため、商品到着時の追加支払いは一切ありません。安心して個人輸入が楽しめます。',
    fee_guide: '通常3,500円（または$35）以上の注文で日本への配送料が無料。国際郵便ながら追跡も完備されており、到着まで約1週間程度です。'
  },
  {
    slug: 'nordstrom',
    country: 'アメリカ',
    description: '1901年創業、シアトルに拠点を置く米国の高級百貨店。圧倒的なカスタマーサービスで知られ、ハイブランドからカジュアルまで幅広い品揃えを誇ります。',
    shipping_guide: '○ 対応',
    tax_guide: 'Borderfree社との提携により、関税先払い（DDP）が可能。チェックアウト時に日本円での確定総額が表示され、受取時の追加費用はありません。',
    fee_guide: '日本への国際送料は、商品の内容と配送スピードによりカート内で自動計算されます。百貨店品質の丁寧な梱包で届きます。'
  },
  {
    slug: 'macys',
    country: 'アメリカ',
    description: 'ニューヨークのヘラルドスクエアに本店を置く、米国最大級の老舗百貨店。アパレル、コスメ、ホーム用品まで揃い、特に米国の連休に合わせたセールは驚異的な安さになります。',
    shipping_guide: '○ 対応',
    tax_guide: 'Borderfreeを介した関税先払い（DDP）をサポート。不透明な関税の不安を解消し、日本円での決済が可能です。',
    fee_guide: '国際送料は重量制。米国の大規模な在庫を活用した品揃えは圧倒的で、セール品をまとめ買いすることで1点あたりの送料を抑えるのが賢い使い方です。'
  },
  {
    slug: 'disneystore',
    country: 'アメリカ',
    description: '米国のディズニー公式通販サイト。日本未発売の限定フィギュア、アパレル、パーク限定グッズなどを直接購入できる、ファンにとっての宝庫です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。購入金額が免税範囲（16,666円）を超える場合、日本到着時に消費税や通関手数料を配送業者へ支払う必要があります。',
    fee_guide: '米国からの国際送料は比較的高めに設定されています。軽量な商品よりも、まとめ買いや大型の限定アイテムなど、ここでしか買えないものを狙うのが一般的です。'
  },
  {
    slug: 'swarovski',
    country: 'オーストリア',
    description: '1895年創業のクリスタル・ガラス界の最高峰ブランド。海外公式サイトでは日本未発売のコレクションや、米国の大型セールに合わせた割引価格での購入が可能です。',
    shipping_guide: '○ 対応',
    tax_guide: '国際配送時もチェックアウト時に税金が計算されるDDP（関税込み）方式を採用していることが多く、受取時の手間がありません。',
    fee_guide: '一定金額（目安$75〜$150以上）で国際配送料が無料になるプロモーションが頻繁に行われています。大切なギフトも安全に日本へ直送されます。'
  }
]

async function finalizeShops() {
  console.log('Finalizing new batch of shops with detailed data...')

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

finalizeShops()
