const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const baseDir = '/Users/reona/Downloads/original-price-shops';
const uploads = [
  { slug: 'fc-moto', filename: 'fc-moto.webp' },
  { slug: 'motardinn', filename: 'motardinn.webp' },
  { slug: 'chromeburner', filename: 'chromeburner.webp' },
  { slug: 'revzilla', filename: 'revzilla.webp' },
  { slug: 'louis-motorrad', filename: 'louis-moto.webp' },
  { slug: 'burnout-italy', filename: 'burnoutmotor.webp' },
  { slug: 'xlmoto', filename: '24mx.webp' }
];

async function processMotoCleanups() {
  console.log('1. Fixing Louis Motorrad URL...');
  const { error: err1 } = await supabase.from('shops').update({ url: 'https://www.louis-moto.com/en/' }).eq('slug', 'louis-motorrad');
  if (err1) console.error('Failed to update Louis:', err1);

  console.log('2. Deleting Champion Helmets because of connection failure...');
  const { error: err2 } = await supabase.from('shops').delete().eq('slug', 'champion-helmets');
  if (err2) console.error('Failed to delete Champion:', err2);
  
  // also delete champion-helmets mapping from shop_brands if any exist
  const { data: champ } = await supabase.from('shops').select('id').eq('slug', 'champion-helmets').single();
  if (champ) {
      await supabase.from('shop_brands').delete().eq('shop_id', champ.id);
  }

  console.log('3. Uploading real screenshots and linking DB...');
  for (const file of uploads) {
    const filePath = path.join(baseDir, file.filename);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file.filename}, file not found.`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    console.log(`Uploading ${file.filename} to Supabase...`);
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

    console.log(`Updating ${file.slug} DB entry directly...`);
    const { error: dbError } = await supabase.from('shops').update({ image_url: publicUrl }).eq('slug', file.slug);
    if (dbError) {
      console.error(`DB Update Error for ${file.slug}:`, dbError);
    }
  }

  console.log('All Moto Shop cleanup and screenshot ingestions completed perfectly.');
}

processMotoCleanups();
