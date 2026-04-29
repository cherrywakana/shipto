
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const RENAMES = [
  { old: 'global', new: 'olive-young' },
  { old: 'fairwaygolfusa', new: 'fairway-golf' },
  { old: 'rockbottomgolf', new: 'rock-bottom-golf' },
  { old: 'carlsgolfland', new: 'carls-golfland' },
  { old: 'thewhiskyexchange', new: 'the-whisky-exchange' },
  { old: 'bigbadtoystore', new: 'big-bad-toy-store' },
  { old: 'saksfifthavenue', new: 'saks-fifth-avenue' },
  { old: 'whittard-of-chelsea', new: 'whittard' },
  { old: 'hannaandersson', new: 'hanna-andersson' },
  { old: 'childrensplace', new: 'childrens-place' },
  { old: 'lightinthebox', new: 'light-in-the-box' },
  { old: 'modaoperandi', new: 'moda-operandi' },
  { old: 'strawberrynet', new: 'strawberry-net' }
]

async function renameSlugs() {
  console.log('Renaming shop slugs to follow the clean naming rule...')

  for (const item of RENAMES) {
    const { error } = await supabase
      .from('shops')
      .update({ slug: item.new })
      .eq('slug', item.old)

    if (error) {
      console.error(`Error renaming ${item.old} to ${item.new}:`, error.message)
    } else {
      console.log(`Successfully renamed slug: ${item.old} -> ${item.new}`)
    }
  }
}

renameSlugs()
