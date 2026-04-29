
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const DOWNLOAD_DIR = '/Users/reona/Downloads/original-price-shops'
const IMAGE_MAPPING = {
  // Batch 2
  '24mx.webp': '24mx',
  'americangolf.webp': 'american-golf',
  'carlsgolfland.webp': 'carls-golfland',
  'casetify.webp': 'casetify',
  'digikey.webp': 'digi-key',
  'fortnumandmason.webp': 'fortnum-and-mason',
  'iherb.webp': 'iherb',
  'libertylondon.webp': 'liberty-london',
  'myprotein.webp': 'myprotein',
  'newegg.webp': 'newegg',
  'zavvi.webp': 'zavvi',
  // Batch 1 (Keeping for reference or if they reappear)
  'childrensplace.webp': 'childrens-place',
  'nordicnest.webp': 'nordic-nest',
  'etsy.webp': 'etsy',
  'nordstrom.webp': 'nordstrom',
  'footdistrict.webp': 'foot-district',
  'publiclands.webp': 'public-lands',
  'ldmountaincentre.webp': 'ld-mountain-centre',
  'thomann.webp': 'thomann',
  'louis-moto.webp': 'louis-motorrad',
  'westelm.webp': 'west-elm',
  'luisaviaroma.webp': 'luisaviaroma',
  'whiskyinternationalonline.webp': 'whisky-international-online',
  'masterofmalt.webp': 'master-of-malt',
  'whittard.webp': 'whittard',
  'nextdirect.webp': 'next-kids'
}

const BASE_URL = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/'

async function uploadAndSyncImages() {
  console.log('Processing images from downloads folder...')

  for (const [filename, slug] of Object.entries(IMAGE_MAPPING)) {
    const filePath = path.join(DOWNLOAD_DIR, filename)
    if (!fs.existsSync(filePath)) {
      continue // Skip missing files silently (they might be in a different batch)
    }

    const fileContent = fs.readFileSync(filePath)
    const targetName = `${slug}.webp`
    const targetUrl = `${BASE_URL}${targetName}`

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('shop-thumbnails')
      .upload(targetName, fileContent, { contentType: 'image/webp', upsert: true })

    if (uploadError) {
      console.error(`Failed to upload ${targetName}:`, uploadError.message)
      continue
    }
    console.log(`✅ Uploaded: ${targetName}`)

    // 2. Update DB
    const { error: dbError } = await supabase
      .from('shops')
      .update({ image_url: targetUrl })
      .eq('slug', slug)

    if (dbError) {
      console.error(`Failed to update DB for ${slug}:`, dbError.message)
    } else {
      console.log(`🔗 Linked ${slug} to ${targetUrl}`)
    }
  }

  console.log('\nAll available images processed and synced.')
}

uploadAndSyncImages()
