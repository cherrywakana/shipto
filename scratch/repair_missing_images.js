
import { createClient } from '@supabase/supabase-js'
import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import dotenv from 'dotenv'

// Ensure env is loaded from the root directory
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const chromiumExtra = chromium.use(stealth())

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const MISSING_SHOPS = [
  { slug: 'amazon-us', url: 'https://www.amazon.com/' },
  { slug: 'ebay', url: 'https://www.ebay.com/' },
  { slug: 'newegg', url: 'https://www.newegg.com/' },
  { slug: 'iherb', url: 'https://www.iherb.com/' },
  { slug: 'myprotein', url: 'https://www.myprotein.com/' },
  { slug: 'etsy', url: 'https://www.etsy.com/' },
  { slug: 'vitacost', url: 'https://www.vitacost.com/' },
  { slug: 'bh-photo-video', url: 'https://www.bhphotovideo.com/' },
  { slug: 'digi-key', url: 'https://www.digikey.jp/' },
  { slug: 'thomann', url: 'https://www.thomann.de/' },
  { slug: 'nordic-nest', url: 'https://www.nordicnest.com/' },
  { slug: 'west-elm', url: 'https://www.westelm.com/' },
  { slug: 'finnish-design-shop', url: 'https://www.finnishdesignshop.com/' },
  { slug: 'royal-design', url: 'https://royaldesign.com/' },
  { slug: 'the-conran-shop', url: 'https://www.conranshop.jp/' },
  { slug: 'etoren', url: 'https://jp.etoren.com/' },
  { slug: 'master-of-malt', url: 'https://www.masterofmalt.com/' },
  { slug: 'the-whisky-barrel', url: 'https://www.thewhiskybarrel.com/' },
  { slug: 'fortnum-and-mason', url: 'https://www.fortnumandmason.com/' }
]

async function repairImages() {
  console.log(`Starting image repair for ${MISSING_SHOPS.length} shops...`)
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not defined in environment.')
    return
  }

  const browser = await chromiumExtra.launch({ headless: true })

  for (const shop of MISSING_SHOPS) {
    console.log(`\n📸 Capturing ${shop.slug} (${shop.url})...`)
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    
    try {
      await page.goto(shop.url, { waitUntil: 'networkidle', timeout: 30000 })
      const tmpPng = `./tmp_${shop.slug}.png`
      const tmpWebp = `./tmp_${shop.slug}.webp`
      
      await page.screenshot({ path: tmpPng })
      
      // Convert to WebP
      execSync(`npx -y sharp-cli -i ${tmpPng} -o ${tmpWebp}`)
      
      // Upload to Supabase
      const fileContent = fs.readFileSync(tmpWebp)
      const { error } = await supabase.storage
        .from('shop-thumbnails')
        .upload(`${shop.slug}.webp`, fileContent, { contentType: 'image/webp', upsert: true })

      if (error) throw error
      console.log(`✅ Successfully uploaded ${shop.slug}.webp`)

      // Cleanup
      if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng)
      if (fs.existsSync(tmpWebp)) fs.unlinkSync(tmpWebp)
    } catch (e) {
      console.error(`❌ Failed to capture ${shop.slug}: ${e.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('\nImage repair process finished.')
}

repairImages()
