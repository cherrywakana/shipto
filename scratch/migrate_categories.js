
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const MAPPING = {
  // ファッション・スニーカー
  'ストリート・スニーカー': 'ファッション・スニーカー',
  'ラグジュアリー・ハイブランド': 'ファッション・スニーカー',
  '韓国・アジアトレンド': 'ファッション・スニーカー',
  'ファッション': 'ファッション・スニーカー',

  // スポーツ・アウトドア
  'スポーツ・アウトドア': 'スポーツ・アウトドア',
  'アウトドア・スポーツ': 'スポーツ・アウトドア',
  '自転車・パーツ': 'スポーツ・アウトドア',
  'ロードバイク・自転車用品': 'スポーツ・アウトドア',
  'ロードバイク・アウトドア': 'スポーツ・アウトドア',
  'オートバイ用品・ヘルメット': 'スポーツ_アウトドア', // 一時的にアンダースコアで分けて後で一括変換（重複回避のため）

  // コスメ・ヘルスケア
  'コスメ・ビューティー': 'コスメ・ヘルスケア',

  // ガジェット・家電
  'ガジェット・家電': 'ガジェット・家電',
  'カメラ・PC・電子機器': 'ガジェット・家電',
  '海外ガジェット・中華EC': 'ガジェット・家電',
  '海外ガジェット・スマートフォン': 'ガジェット・家電',
  '海外スマートフォン・カメラ': 'ガジェット・家電',

  // ホーム・ライフスタイル
  'インテリア・家具・雑貨': 'ホーム・ライフスタイル',
  'キッズ・ベビー服': 'ホーム・ライフスタイル',
  'ウイスキー・洋酒': 'ホーム・ライフスタイル'
}

async function updateCategories() {
  console.log('Starting category update...')

  for (const [oldCat, newCat] of Object.entries(MAPPING)) {
    const { data, error, count } = await supabase
      .from('shops')
      .update({ category: newCat.replace('_', '・') })
      .eq('category', oldCat)
      .select('id')

    if (error) {
      console.error(`Error updating ${oldCat} to ${newCat}:`, error)
    } else {
      console.log(`Updated ${data?.length || 0} shops from "${oldCat}" to "${newCat.replace('_', '・')}"`)
    }
  }

  // Check if any categories were missed
  const { data: remaining, error: fetchError } = await supabase
    .from('shops')
    .select('category')
  
  const counts = (remaining || []).reduce((acc, shop) => {
    acc[shop.category] = (acc[shop.category] || 0) + 1
    return acc
  }, {})

  console.log('\nNew Category Counts:', JSON.stringify(counts, null, 2))
}

updateCategories()
