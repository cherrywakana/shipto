const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const BRAND_SLUG = 'newera';

const NEW_MAPPINGS = {
  'urban-outfitters': 'https://www.urbanoutfitters.com/brands/new-era',
  'asos': 'https://www.asos.com/men/a-to-z-of-brands/new-era/cat/?cid=7475',
  'end': 'https://www.endclothing.com/jp/brands/new-era',
  'stockx': 'https://stockx.com/brands/new-era'
};

async function updateBrandUrls() {
  console.log('Fetching brand ID for', BRAND_SLUG);
  const { data: brand } = await supabase.from('brands').select('id').eq('slug', BRAND_SLUG).single();
  if (!brand) return console.error('Brand not found');

  const { data: shops } = await supabase.from('shops').select('id, slug').in('slug', Object.keys(NEW_MAPPINGS));
  
  for (const shop of shops) {
    const targetUrl = NEW_MAPPINGS[shop.slug];
    const { error } = await supabase
      .from('shop_brands')
      .update({ brand_url: targetUrl })
      .eq('brand_id', brand.id)
      .eq('shop_id', shop.id);
      
    if (error) console.error('Error updating', shop.slug, error);
    else console.log('Successfully updated exact brand_url for', shop.slug, '->', targetUrl);
  }
}

updateBrandUrls();
