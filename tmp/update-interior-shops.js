const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const imageDir = '/Users/reona/Downloads/original-price-shops';

const slugToImage = {
  'nordic-nest': 'nordicnest.webp',
  'finnish-design-shop': 'finnishdesignshop.webp',
  'royal-design': 'royaldesign.webp',
  'urban-outfitters': 'urbanoutfitters.webp',
  'west-elm': 'westelm.webp',
  'the-conran-shop': 'conranshop.webp',
  'flymee': 'flymee.webp',
  'muse-home': 'musehome.webp'
};

async function updateDatabaseAndImages() {
  // 1. Delete KARE and Anthropologie
  console.log('Deleting KARE and Anthropologie...');
  await supabase.from('shops').delete().in('slug', ['kare', 'anthropologie']);

  // 2. Update RoyalDesign URL
  console.log('Fixing RoyalDesign URL...');
  await supabase.from('shops').update({ url: 'https://royaldesign.com/jp' }).eq('slug', 'royal-design');

  // 3. Upload images and update DB
  for (const [slug, fileName] of Object.entries(slugToImage)) {
    const filePath = path.join(imageDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`Uploading ${fileName}...`);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shop-thumbnails')
      .upload(fileName, fileBuffer, {
        upsert: true,
        contentType: 'image/webp'
      });

    if (uploadError) {
      console.error(`Failed to upload ${fileName}:`, uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from('shop-thumbnails')
      .getPublicUrl(fileName);
      
    const imageUrl = publicUrlData.publicUrl;

    console.log(`Updating DB for ${slug} with image ${imageUrl}...`);
    await supabase.from('shops').update({ image_url: imageUrl }).eq('slug', slug);
  }

  console.log('All DB and image tasks completed successfully!');
}

updateDatabaseAndImages();
