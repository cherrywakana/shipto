const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const corrections = {
  'dainese': 'Dainese',
  'alpinestars': 'Alpinestars',
  'shoei': 'SHOEI',
  'arai': 'Arai',
  'bell-helmets': 'Bell Helmets',
  'schuberth': 'Schuberth',
  'klim': 'Klim',
  'revit': "REV'IT!",
  'fox-racing': 'Fox Racing',
  'icon-motorsports': 'Icon Motorsports',
  'shark-helmets': 'Shark Helmets'
};

async function fixBrandNames() {
  console.log('Fixing display names for motorcycle brands...');
  for (const [slug, correctName] of Object.entries(corrections)) {
    const { error } = await supabase
      .from('brands')
      .update({ name: correctName })
      .eq('slug', slug);
      
    if (error) {
      console.error(`❌ Failed to update ${slug}:`, error.message);
    } else {
      console.log(`✅ Fixed: ${slug} -> ${correctName}`);
    }
  }
  console.log('All parenthesis names have been stripped and sanitized.');
}

fixBrandNames();
