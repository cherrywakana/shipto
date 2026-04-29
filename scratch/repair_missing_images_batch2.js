
import { createClient } from '@supabase/supabase-js'
import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const chromiumExtra = chromium.use(stealth())

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const MISSING_SHOPS = [
  { slug: 'whittard', url: 'https://www.whittard.co.uk/' },
  { slug: 'urban-outfitters', url: 'https://www.urbanoutfitters.com/' },
  { slug: 'muse-home', url: 'https://musehome.shop/' },
  { slug: 'evo', url: 'https://www.evo.com/' },
  { slug: 'next', url: 'https://www.next.co.uk/' },
  { slug: 'moosejaw', url: 'https://www.moosejaw.com/' },
  { slug: 'royal-mile-whiskies', url: 'https://www.royalmilewhiskies.com/' },
  { slug: 'hard-to-find-whisky', url: 'https://www.htfw.com/' },
  { slug: 'fine-drams', url: 'https://www.finedrams.com/' },
  { slug: 'whisky-international-online', url: 'https://www.whiskyinternationalonline.com/' },
  { slug: 'xlmoto', url: 'https://www.xlmoto.com/' },
  { slug: 'whiskybase-shop', url: 'https://shop.whiskybase.com/' },
  { slug: 'louis-motorrad', url: 'https://www.louis-moto.co.uk/' },
  { slug: 'champion-helmets', url: 'https://www.championhelmets.com/' },
  { slug: 'burnout-italy', url: 'https://www.burnoutitaly.com/' },
  { slug: 'ld-mountain-centre', url: 'https://www.ldmountaincentre.com/' },
  // Retry blocked ones with a different wait strategy
  { slug: 'amazon-us', url: 'https://www.amazon.com/' },
  { slug: 'iherb', url: 'https://www.iherb.com/' },
  { slug: 'west-elm', url: 'https://www.westelm.com/' },
  { slug: 'royal-design', url: 'https://royaldesign.com/' }
]

async function repairImages() {
  console.log(`Starting Batch 2 image repair for ${MISSING_SHOPS.length} shops...`)
  const browser = await chromiumExtra.launch({ headless: true })

  for (const shop of MISSING_SHOPS) {
    console.log(`\n📸 Capturing ${shop.slug} (${shop.url})...`)
    const page = await browser.newPage({ 
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    })
    
    try {
      // Use 'load' instead of 'networkidle' for faster completion or to bypass some networkidle waits
      await page.goto(shop.url, { waitUntil: 'load', timeout: 30000 })
      await page.waitForTimeout(2000) // Small extra wait for rendering
      
      const tmpPng = `./tmp_${shop.slug}.png`
      const tmpWebp = `./tmp_${shop.slug}.webp`
      
      await page.screenshot({ path: tmpPng })
      execSync(`npx -y sharp-cli -i ${tmpPng} -o ${tmpWebp}`)
      
      const fileContent = fs.readFileSync(tmpWebp)
      const { error } = await supabase.storage
        .from('shop-thumbnails')
        .upload(`${shop.slug}.webp`, fileContent, { contentType: 'image/webp', upsert: true })

      if (error) throw error
      console.log(`✅ Successfully uploaded ${shop.slug}.webp`)

      if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng)
      if (fs.existsSync(tmpWebp)) fs.unlinkSync(tmpWebp)
    } catch (e) {
      console.error(`❌ Failed to capture ${shop.slug}: ${e.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('\nBatch 2 repair process finished.')
}

repairImages()
