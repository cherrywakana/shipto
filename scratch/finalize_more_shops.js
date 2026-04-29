
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const UPDATES = [
  {
    slug: 'mytheresa',
    country: 'ドイツ',
    category: 'ファッション・スニーカー',
    description: 'ドイツを拠点とする世界最高峰のラグジュアリーセレクトショップ。ハイブランドの最新コレクションから、限定コラボアイテムまで厳選された品揃えが魅力です。',
    shipping_guide: '○ 対応',
    tax_guide: '関税込み（DDP）方式。表示価格に輸入関税・消費税がすべて含まれているため、商品到着時の追加支払いは一切ありません。非常に分かりやすい価格設定です。',
    fee_guide: '通常、一定額（目安€600前後）以上の注文で日本への配送料が無料になります。DHL等のエクスプレス便により、欧州から最短3〜5日程度で到着します。'
  },
  {
    slug: '24s',
    country: 'フランス',
    category: 'ファッション・スニーカー',
    description: 'LVMHグループが運営する、パリの老舗百貨店「ボン・マルシェ」のオンラインストア。ルイ・ヴィトンやセリーヌなどの独占販売ブランドを含む、極めて高い信頼性が特徴。',
    shipping_guide: '○ 対応',
    tax_guide: '関税込み（DDP）方式。チェックアウト時に日本円での確定総額が表示され、受取時の追加費用は一切不要。日本語カスタマーサポートも充実しています。',
    fee_guide: '通常42,000円前後の注文で日本への配送料が無料。それ未満でも3,000円程度の固定送料で、パリから超高速（最短3日）で届きます。'
  },
  {
    slug: 'luisaviaroma',
    country: 'イタリア',
    category: 'ファッション・スニーカー',
    description: 'イタリア・フィレンツェ発の老舗ラグジュアリーセレクトショップ。世界中のファッショニスタから支持され、最新トレンドからレアな限定品まで幅広く取り扱います。',
    shipping_guide: '○ 対応',
    tax_guide: '関税込み（DDP）方式。関税・消費税・通関手数料がすべて含まれた価格表示のため、商品到着時にサプライズな請求が発生することはありません。',
    fee_guide: '送料は商品や配送オプションにより異なります。DHL等の国際エクスプレス便を利用し、イタリアから日本まで数日で届く配送品質を維持しています。'
  },
  {
    slug: 'modaoperandi',
    country: 'アメリカ',
    category: 'ファッション・スニーカー',
    description: 'ランウェイに登場したばかりの最新コレクションを予約注文できる「トランクショー」が有名な、NY発のハイエンドファッションサイト。',
    shipping_guide: '○ 対応',
    tax_guide: '関税先払い（DDP）オプションをサポート。予約注文時でも、将来の関税を含めた総額を確定させておくことが可能です。',
    fee_guide: '国際送料は重量や配送スピードに基づき算出されます。高額商品の取り扱いが多いため、配送保険や追跡体制が非常に強固です。'
  },
  {
    slug: 'saksfifthavenue',
    country: 'アメリカ',
    category: 'ファッション・スニーカー',
    description: 'ニューヨークの5番街に本店を構える、米国を代表する高級百貨店。クラシックなスタイルからモダンなブランドまで、米国の富裕層に支持されるラインナップが揃います。',
    shipping_guide: '○ 対応',
    tax_guide: 'Borderfreeを介した関税先払い（DDP）に対応。日本円での決済が可能で、通関時の不透明な費用を一切気にする必要がありません。',
    fee_guide: '国際送料はチェックアウト時に自動計算されます。米国の祝日に合わせた大型セールでは、高級ブランドが大幅な割引価格で日本へ直送可能です。'
  },
  {
    slug: 'huckberry',
    country: 'アメリカ',
    category: 'スポーツ・アウトドア',
    description: '「冒険とライフスタイル」をテーマにした、サンフランシスコ発のセレクトショップ。アパレルからキャンプギア、インテリアまで、男心をくすぐる優れたキュレーションが特徴。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。購入金額が16,666円を超えると、日本到着時に消費税や通関手数料が発生します。免税範囲内での買い物が最もお得です。',
    fee_guide: '日本への国際送料は、重量やサイズに基づきカート内で計算されます。米国のこだわりブランドが豊富で、送料を払っても輸入する価値のある商品が揃っています。'
  },
  {
    slug: 'strawberrynet',
    country: '香港',
    category: 'コスメ・ヘルスケア',
    description: '「ストロベリーネット」の愛称で親しまれる、香港発の世界最大級コスメ・ディスカウントサイト。ハイブランドの香水、スキンケア、メイクアップが驚きの割引価格で手に入ります。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式ですが、単価が安いため16,666円の免税範囲に収まることが多く、手軽に利用できます。サイトは完全に日本語化されています。',
    fee_guide: '一定金額以上の注文で日本への配送料が無料になります。香港からの発送のため、米国や欧州に比べて配送時間が比較的短く、利便性が高いのが特徴です。'
  },
  {
    slug: 'space-nk',
    country: 'イギリス',
    category: 'コスメ・ヘルスケア',
    description: 'ロンドン発、世界中のカルト的人気ブランドを厳選した高級ビューティーセレクトショップ。日本未発売のスキンケアやメイクアップブランドをいち早く手に入れることができます。',
    shipping_guide: '○ 対応',
    tax_guide: '関税未払い（DDU）方式。16,666円以下の免税範囲内であれば、消費税等を気にせずお得に買い物ができます。ギフト包装のクオリティも高いことで有名です。',
    fee_guide: '一定金額以上の注文で国際配送料が無料になるキャンペーンを頻繁に実施。追跡付きの安定した配送サービスで日本まで届きます。'
  }
]

async function finalizeMoreShops() {
  console.log('Finalizing another batch of major shops with high-quality data...')

  for (const update of UPDATES) {
    const { error } = await supabase
      .from('shops')
      .update({
        country: update.country,
        category: update.category,
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

finalizeMoreShops()
