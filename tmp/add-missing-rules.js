const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function addMissingRules() {
  const filePath = path.resolve(__dirname, '../scripts/autonomous_collector.js');
  let scriptContent = fs.readFileSync(filePath, 'utf-8');
  
  const shopRulesMatch = scriptContent.match(/const SHOP_RULES = {([\s\S]*?)};\s*\n/);
  if (!shopRulesMatch) return console.error("Could not find SHOP_RULES block");
  
  const rulesBlock = shopRulesMatch[1];
  const definedSlugs = [];
  rulesBlock.split('\n').forEach(line => {
    const m = line.match(/^\s*'([^']+)'\s*:/);
    if (m) definedSlugs.push(m[1]);
  });

  const { data: shops } = await supabase.from('shops').select('slug, url');
  const missingShops = shops.filter(s => !definedSlugs.includes(s.slug));

  let newRulesBlock = '\n    // --- AUTO-GENERATED FALLBACK SEARCH RULES ---\n';
  for (const shop of missingShops) {
    // Determine the base URL without trailing slash
    const baseUrl = shop.url ? shop.url.replace(/\/$/, '') : '';
    // If no base URL found, skip
    if (!baseUrl) continue;
    
    // Shopify/Standard e-commerce generic search query routing
    newRulesBlock += `    '${shop.slug}': (slug) => \`${baseUrl}/search?q=\${slug}\`,\n`;
  }

  // Insert exactly before the closing bracket of SHOP_RULES
  const insertionPoint = scriptContent.indexOf('};', shopRulesMatch.index);
  scriptContent = scriptContent.slice(0, insertionPoint) + newRulesBlock + scriptContent.slice(insertionPoint);

  fs.writeFileSync(filePath, scriptContent);
  console.log(`Successfully mapped ${missingShops.length} missing shops to generic search queries in autonomous_collector.js`);
}

addMissingRules();
