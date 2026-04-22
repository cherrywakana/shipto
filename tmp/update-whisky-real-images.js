const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const imageDir = '/Users/reona/Downloads/original-price-shops';

// The new screenshots mapped to slugs
const slugToImage = {
  'hard-to-find-whisky': 'htfw.webp',
  'royal-mile-whiskies': 'royalmilewhiskies.webp',
  'whiskybase-shop': 'shop.webp'
};

async function uploadNewScreenshots() {
  for (const [slug, fileName] of Object.entries(slugToImage)) {
    const filePath = path.join(imageDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`Uploading ${fileName}...`);
    const { uploadError } = await supabase.storage
      .from('shop-thumbnails')
      .upload(fileName, fileBuffer, { upsert: true, contentType: 'image/webp' });

    if (uploadError) {
      console.error(`Failed to upload ${fileName}:`, uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from('shop-thumbnails')
      .getPublicUrl(fileName);
      
    console.log(`Updating DB for ${slug} with URL: ${publicUrlData.publicUrl}`);
    await supabase.from('shops').update({ image_url: publicUrlData.publicUrl }).eq('slug', slug);
  }

  console.log('Successfully completed uploading and linking the 3 new screenshots!');
}

uploadNewScreenshots();
