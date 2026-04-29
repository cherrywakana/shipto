
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const DUPLICATES = [
  { keep: 'olive-young', delete: 'global' },
  { keep: 'the-whisky-exchange', delete: 'thewhiskyexchange' },
  { keep: 'saks-fifth-avenue', delete: 'saksfifthavenue' },
  { keep: 'hanna-andersson', delete: 'hannaandersson' }
]

async function cleanupDuplicates() {
  console.log('Cleaning up duplicate shops and ensuring clean slugs are kept...')

  for (const item of DUPLICATES) {
    // 今回追加した詳細データ（delete側）を取得
    const { data: source } = await supabase
      .from('shops')
      .select('*')
      .eq('slug', item.delete)
      .single()

    if (source) {
      // 既存のクリーンな方にデータを引き継ぐ
      const { error: updError } = await supabase
        .from('shops')
        .update({
          description: source.description,
          shipping_guide: source.shipping_guide,
          tax_guide: source.tax_guide,
          fee_guide: source.fee_guide,
          ships_to_japan: source.ships_to_japan,
          country: source.country,
          category: source.category
        })
        .eq('slug', item.keep)
      
      if (updError) console.error(`Error updating ${item.keep}:`, updError.message)
      else console.log(`Merged data into ${item.keep}`)

      // 不格好な方を削除
      const { error: delError } = await supabase
        .from('shops')
        .delete()
        .eq('slug', item.delete)
      
      if (delError) console.error(`Error deleting ${item.delete}:`, delError.message)
      else console.log(`Deleted duplicate: ${item.delete}`)
    }
  }
}

cleanupDuplicates()
