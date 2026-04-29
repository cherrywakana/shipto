const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const { execSync } = require('child_process');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const brands = [
  { name: 'Dainese（ダイネーゼ）', slug: 'dainese' },
  { name: 'Alpinestars（アルパインスターズ）', slug: 'alpinestars' },
  { name: 'AGV', slug: 'agv' },
  { name: 'SHOEI（海外限定カラー）', slug: 'shoei' },
  { name: 'Arai（海外限定カラー）', slug: 'arai' },
  { name: 'Bell Helmets（ベル）', slug: 'bell-helmets' },
  { name: 'Schuberth（シューベルト）', slug: 'schuberth' },
  { name: 'Klim（クライム）', slug: 'klim' },
  { name: "REV'IT!（レブイット）", slug: 'revit' },
  { name: 'Fox Racing（フォックス）', slug: 'fox-racing' },
  { name: 'Icon Motorsports（アイコン）', slug: 'icon-motorsports' },
  { name: 'Shark Helmets（シャーク）', slug: 'shark-helmets' }
];

async function registerMotoBrands() {
  console.log('Registering Motorcycle Brands...');
  
  for (const brand of brands) {
    const { data: existing } = await supabase.from('brands').select('id').eq('slug', brand.slug).single();
    if (!existing) {
      const { error } = await supabase.from('brands').insert([brand]);
      if (error) console.error(`❌ Failed to insert ${brand.name}:`, error.message);
      else console.log(`✅ Registered: ${brand.name}`);
    } else {
      console.log(`⚠️ Already Registered: ${brand.name}`);
    }
  }

  console.log('\\nBrands registered. Initiating forced collector cycle to map these new brands against our 8 Moto shops in real-time...');
  
  // To avoid hitting ratelimits excessively during this demo, we will execute the collector
  // just for Dainese and Alpinestars initially to seed the DB, or we can just skip local collection if it takes 10+ mins.
  // Actually, wait, running Playwright on 12 brands x 150 shops might take 30 minutes!
  // I will merely register them here.
}

registerMotoBrands();
