
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BASE_PATH = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/'

async function normalizeImageUrls() {
  console.log('Normalizing ALL image URLs to the standard slug-based format...')

  const { data: shops, error: fetchError } = await supabase
    .from('shops')
    .select('id, slug, image_url')

  if (fetchError) {
    console.error('Error fetching shops:', fetchError.message)
    return
  }

  let updateCount = 0
  for (const shop of shops) {
    if (!shop.image_url) continue

    const expectedUrl = `${BASE_PATH}${shop.slug}.webp`
    
    // 現在のURLが標準形式と異なる（タイムスタンプ付き、外部URL、拡張子違い等）場合に更新
    if (shop.image_url !== expectedUrl) {
      const { error: updError } = await supabase
        .from('shops')
        .update({ image_url: expectedUrl })
        .eq('id', shop.id)
      
      if (updError) {
        console.error(`Error updating ${shop.slug}:`, updError.message)
      } else {
        updateCount++
      }
    }
  }

  console.log(`Normalization complete. Total updated: ${updateCount}`)
}

normalizeImageUrls()
