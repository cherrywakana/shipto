const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function findMissingShopRules() {
  // Read autonomous_collector.js to extract keys from SHOP_RULES
  const scriptContent = fs.readFileSync(path.resolve(__dirname, '../scripts/autonomous_collector.js'), 'utf-8');
  
  // Quick regex to find all keys inside SHOP_RULES
  const shopRulesMatch = scriptContent.match(/const SHOP_RULES = {([\s\S]*?)};\s*\n/);
  if (!shopRulesMatch) {
    console.error("Could not find SHOP_RULES block");
    return;
  }
  
  const rulesBlock = shopRulesMatch[1];
  const definedSlugs = [];
  
  // Match lines like: 'shop-slug': (slug) => ...
  const lines = rulesBlock.split('\n');
  for (const line of lines) {
    const keyMatch = line.match(/^\s*'([^']+)'\s*:/);
    if (keyMatch) {
      definedSlugs.push(keyMatch[1]);
    }
  }

  // Get all shop slugs from database
  const { data: shops, error } = await supabase.from('shops').select('slug, name, url');
  if (error) {
    console.error("DB Error:", error);
    return;
  }
  
  const missingShops = shops.filter(shop => !definedSlugs.includes(shop.slug));
  
  console.log(`Found ${missingShops.length} missing shops from SHOP_RULES:`);
  console.log(JSON.stringify(missingShops, null, 2));
}

findMissingShopRules();
