
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const RENAMES = [
  { old: 'global.webp', new: 'olive-young.webp' },
  { old: 'fairwaygolfusa.webp', new: 'fairway-golf.webp' },
  { old: 'rockbottomgolf.webp', new: 'rock-bottom-golf.webp' },
  { old: 'carlsgolfland.webp', new: 'carls-golfland.webp' },
  { old: 'thewhiskyexchange.webp', new: 'the-whisky-exchange.webp' },
  { old: 'bigbadtoystore.webp', new: 'big-bad-toy-store.webp' },
  { old: 'saksfifthavenue.webp', new: 'saks-fifth-avenue.webp' },
  { old: 'whittard-of-chelsea.webp', new: 'whittard.webp' },
  { old: 'hannaandersson.webp', new: 'hanna-andersson.webp' },
  { old: 'childrensplace.webp', new: 'childrens-place.webp' },
  { old: 'lightinthebox.webp', new: 'light-in-the-box.webp' },
  { old: 'modaoperandi.webp', new: 'moda-operandi.webp' },
  { old: 'strawberrynet.webp', new: 'strawberry-net.webp' }
]

async function renameBucketFiles() {
  console.log('Renaming files in Supabase Storage bucket to match new slugs...')

  for (const item of RENAMES) {
    // まずコピー
    const { error: moveError } = await supabase.storage
      .from('shop-thumbnails')
      .move(item.old, item.new)

    if (moveError) {
      // 既に存在するか、元ファイルがない場合はスキップ
      console.warn(`Could not move ${item.old} to ${item.new}:`, moveError.message)
    } else {
      console.log(`Successfully renamed bucket file: ${item.old} -> ${item.new}`)
    }
  }
  
  console.log('Bucket cleanup complete.')
}

renameBucketFiles()
