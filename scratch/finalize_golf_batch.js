
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'fairwaygolfusa',
    country: 'アメリカ',
    description: 'カリフォルニア州サンディエゴに拠点を置く、日本人ゴルファー御用達の有名ショップ。日本未発売の限定モデル、カスタムシャフト、特注クラブの取り扱いに非常に強く、日本語でのサポートも充実しています。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。ゴルフバッグや衣類には関税がかかる場合がありますが、ゴルフクラブ自体は無税（0%）です。ただし、受取時に日本の消費税（約10%）と通関手数料が発生します。',
    fee_guide: '日本への配送実績が極めて豊富で、安全かつ迅速に届きます。送料は商品の重量・サイズによりカート内で自動計算されます。大型のキャディバッグなども直送可能です。'
  },
  {
    slug: 'globalgolf',
    country: 'アメリカ',
    description: '米国最大級のオンラインゴルフショップ。テーラーメイド、キャロウェイ、タイトリストなどの主要ブランドの新品はもちろん、厳しい基準をクリアした「認定中古品」の品揃えも圧倒的です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。ゴルフクラブは関税無税ですが、16,666円を超える注文には受取時に国内消費税が課税されます。インボイスが正確に発行されるため通関もスムーズです。',
    fee_guide: '国際配送業者（UPSやFedEx等）による迅速な配送を提供。送料はカート内でリアルタイムに計算されます。中古品を組み合わせた賢い買い方が人気です。'
  },
  {
    slug: 'rockbottomgolf',
    country: 'アメリカ',
    description: '「安さ」に特化した米国の人気ゴルフ通販サイト。型落ちモデルや過剰在庫品を驚異的なディスカウント価格で放出しており、ボールやアクセサリー、アパレルなどの消耗品をまとめ買いするのに最適です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。一点あたりの単価が安いため、16,666円の免税範囲に収まるように買い物をすると、税金コストを最小限に抑えられます。',
    fee_guide: '国際送料は重量制。定期的に送料無料キャンペーン（米国内向けが多いですが）や国際送料の割引プロモーションが開催されることがあります。'
  },
  {
    slug: 'carlsgolfland',
    country: 'アメリカ',
    description: '1958年創業の米国老舗ゴルフショップ。一流ブランドの正規代理店として高い信頼性を誇り、丁寧なカスタマーサービスに定評があります。最新ギアをいち早く、かつ確実に手に入れたいゴルファーにおすすめ。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。ゴルフクラブ（関税0%）の輸入実績が多く、適正な税務処理で届きます。受取時に日本の消費税の支払いが必要になる場合があります。',
    fee_guide: '日本への直送に対応。送料設定が非常にクリアで、チェックアウト時に総額を確認できます。追跡サービスも完備されており、高額なクラブも安心して注文できます。'
  },
  {
    slug: 'americangolf',
    country: 'イギリス',
    description: 'ヨーロッパ最大のゴルフ小売店。米国系ショップとは異なる、欧州独自のブランドやアパレルラインナップが魅力。英国を拠点とするGalvin Greenなどの高級ウェアを狙うならここです。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。英国からの発送となります。16,666円を超える場合は受取時に消費税等が発生します。ポンド建てでの決済となるため、為替の有利な時期が狙い目です。',
    fee_guide: '英国から日本までの国際配送に対応。アパレル等の軽量な商品であれば、比較的リーズナブルな送料で英国の最新トレンドを入手可能です。'
  }
]

async function finalizeGolfBatch() {
  console.log('Finalizing golf shops batch with high-quality data...')

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

finalizeGolfBatch()
