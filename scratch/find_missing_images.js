
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function findMissingImages() {
  console.log('Comparing Database Slugs with Storage Bucket Files...')

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
    .select('name, slug, image_url')
  
  if (dbError) {
    console.error('Error fetching shops:', dbError.message)
    return
  }

  const missing = []
  const noUrl = []

  for (const shop of shops) {
    if (!shop.image_url) {
      noUrl.push(shop.name)
      continue
    }

    const expectedFileName = `${shop.slug}.webp`
    if (!bucketFileSet.has(expectedFileName)) {
      missing.push({ name: shop.name, slug: shop.slug, expected: expectedFileName })
    }
  }

  console.log('\n--- ❌ Images missing in Bucket (but expected by DB) ---')
  console.table(missing)

  console.log('\n--- ⚠️ Shops with NO image_url set ---')
  console.log(noUrl.join(', '))
}

findMissingImages()
