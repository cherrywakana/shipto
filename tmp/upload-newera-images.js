const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const baseDir = '/Users/reona/Downloads/original-price-shops';
const files = [
  { slug: 'lids', filename: 'lids.webp' },
  { slug: 'amazingstore', filename: 'amazingstore.webp' }
];

async function uploadImages() {
  for (const file of files) {
    const filePath = path.join(baseDir, file.filename);
    if (!fs.existsSync(filePath)) {
      console.log('Skipping', file.filename, 'not found');
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    console.log(`Uploading ${file.filename}...`);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shop-thumbnails')
      .upload(file.filename, fileBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      continue;
    }

    const timestamp = new Date().getTime();
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop-thumbnails/${file.filename}?t=${timestamp}`;

    console.log(`Linking DB for ${file.slug}...`);
    const { error: dbError } = await supabase
      .from('shops')
      .update({ image_url: publicUrl })
      .eq('slug', file.slug);

    if (dbError) {
      console.error('DB Update Error for', file.slug, dbError);
    } else {
      console.log(`Successfully updated ${file.slug} in DB`);
    }
  }
}

uploadImages();
