
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkUrlReachability() {
  console.log('Checking image URL reachability...')
  const { data: shops } = await supabase.from('shops').select('name, image_url').limit(50)

  for (const shop of shops) {
    if (!shop.image_url) {
      console.log(`[NULL] ${shop.name}: No URL`)
      continue
    }

    try {
      const res = await axios.get(shop.image_url, { timeout: 5000 })
      console.log(`[${res.status}] ${shop.name}: OK`)
    } catch (e) {
      const status = e.response ? e.response.status : 'ERROR'
      console.log(`[${status}] ${shop.name}: ${shop.image_url}`)
    }
  }
}

checkUrlReachability()
