
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BASE_PATH = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/'

async function syncDbWithBucket() {
  console.log('Syncing DB image_url with existing Bucket files...')

  // 1. Get bucket files
  const { data: bucketFiles, error: storageError } = await supabase.storage
    .from('shop-thumbnails')
    .list('', { limit: 1000 })
  
  if (storageError) {
    console.error('Error listing storage:', storageError.message)
    return
  }
  const bucketFileSet = new Set(bucketFiles.map(f => f.name))

  // 2. Get DB shops
  const { data: shops, error: dbError } = await supabase
    .from('shops')
    .select('id, slug, image_url')
  
  if (dbError) {
    console.error('Error fetching shops:', dbError.message)
    return
  }

  let updateCount = 0
  for (const shop of shops) {
    const expectedFileName = `${shop.slug}.webp`
    const expectedUrl = `${BASE_PATH}${expectedFileName}`

    // バケットにファイルが存在し、かつDBのURLが未設定または古い場合に更新
    if (bucketFileSet.has(expectedFileName) && shop.image_url !== expectedUrl) {
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

  console.log(`\n✅ Sync complete. Updated ${updateCount} shops with valid image URLs.`)
}

syncDbWithBucket()
