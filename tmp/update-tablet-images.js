const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const imageDir = '/Users/reona/Downloads/original-price-shops';

const slugToImage = {
  'banggood': { file: 'banggood.webp', type: 'image/webp' },
  'gshopper': { file: 'gshopper.webp', type: 'image/webp' },
  'etoren': { file: 'etoren.png', type: 'image/png' },
  'bh-photo-video': { file: 'bhphotovideo.webp', type: 'image/webp' }
};

async function syncTabletDatabase() {
  // 1. Delete Geekbuying per user instruction
  console.log('Removing geekbuying from DB...');
  await supabase.from('shops').delete().eq('slug', 'geekbuying');

  // 2. Upload images and map
  console.log('Uploading real screenshots...');
  for (const [slug, imgData] of Object.entries(slugToImage)) {
    const filePath = path.join(imageDir, imgData.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    console.log(`Uploading ${imgData.file}...`);
    const { uploadError } = await supabase.storage
      .from('shop-thumbnails')
      .upload(imgData.file, fileBuffer, { upsert: true, contentType: imgData.type });

    if (uploadError) {
      console.error(`Upload error for ${imgData.file}:`, uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from('shop-thumbnails')
      .getPublicUrl(imgData.file);
      
    console.log(`Linking DB for ${slug}...`);
    await supabase.from('shops').update({ image_url: publicUrlData.publicUrl }).eq('slug', slug);
  }

  console.log('Tablet Database Sync and Image Upload Completed!');
}

syncTabletDatabase();
