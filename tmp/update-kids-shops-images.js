const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const imageDir = '/Users/reona/Downloads/original-price-shops';

const slugToImage = {
  'childrensalon': 'childrensalon.webp',
  'smallable': 'smallable.webp',
  'patpat': 'patpat.webp',
  'next-kids': 'nextdirect.webp',
  'babyshop': 'babyshop.webp',
  'boden': 'boden.webp',
  'vertbaudet': 'vertbaudet.webp'
};

async function syncKidsDatabase() {
  // 1. Delete unsupported shops
  console.log('Removing unsupported shops from DB...');
  await supabase.from('shops').delete().in('slug', ['the-childrens-place', 'carters', 'hanna-andersson']);

  // 2. Fix Next URL
  console.log('Updating Next direct URL...');
  await supabase.from('shops').update({ url: 'https://www.nextdirect.com/jp/ja' }).eq('slug', 'next-kids');

  // 3. Upload images and map
  console.log('Uploading 7 real screenshots...');
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
      console.error(`Upload error for ${fileName}:`, uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from('shop-thumbnails')
      .getPublicUrl(fileName);
      
    console.log(`Linking DB for ${slug}...`);
    await supabase.from('shops').update({ image_url: publicUrlData.publicUrl }).eq('slug', slug);
  }

  console.log('Kids Database Sync and Image Upload Completed!');
}

syncKidsDatabase();
