const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const brandSlug = 'newera';
const shopSlugs = ['lids', 'amazingstore', 'asos', 'end', 'urban-outfitters', 'stockx'];

async function linkBrandToShops() {
  console.log(`Linking ${brandSlug} to ${shopSlugs.join(', ')}...`);

  // 1. Get Brand ID
  const { data: brandData, error: brandErr } = await supabase.from('brands').select('id').eq('slug', brandSlug).single();
  if (brandErr || !brandData) {
    console.error('Failed to get brand ID:', brandErr);
    return;
  }
  const brandId = brandData.id;

  // 2. Get Shop IDs
  const { data: shopData, error: shopErr } = await supabase.from('shops').select('id, slug').in('slug', shopSlugs);
  if (shopErr || !shopData || shopData.length === 0) {
    console.error('Failed to get shop IDs:', shopErr);
    return;
  }

  // 3. Prepare upsert payload
  const mappingPayload = shopData.map(shop => ({
    shop_id: shop.id,
    brand_id: brandId,
    status: 'found',
    last_checked_at: new Date().toISOString()
  }));

  // Upsert by shop_id and brand_id (requires composite unique key in DB, if not handled manually. We will try upsert, if fails we do insert logic)
  const { error: insertErr } = await supabase.from('shop_brands').upsert(mappingPayload, { onConflict: 'shop_id, brand_id' });
  
  if (insertErr) {
    console.error('Failed to upsert shop_brands:', insertErr);
    // If composite key is missing, fallback to raw insert (ignoring duplicates for now)
    for (const mapping of mappingPayload) {
      const { data: existing } = await supabase.from('shop_brands').select('*').eq('shop_id', mapping.shop_id).eq('brand_id', mapping.brand_id).limit(1);
      if (!existing || existing.length === 0) {
        await supabase.from('shop_brands').insert([mapping]);
        console.log(`Inserted manually for shop: ${mapping.shop_id}`);
      }
    }
  } else {
    console.log('Successfully upserted shop_brand links via native Conflict rule.');
  }
  console.log('shop_brands maintenance for New Era complete.');
}

linkBrandToShops();
