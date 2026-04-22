const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const newShops = [
  { 
    slug: 'hard-to-find-whisky', 
    name: 'Hard To Find Whisky', 
    url: 'https://www.htfw.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: '英国発。「見つけにくいウイスキー」という名の通り、ヴィンテージやオールドボトルに異常な強さを誇るコレクター向けの超有名店。' 
  },
  { 
    slug: 'royal-mile-whiskies', 
    name: 'Royal Mile Whiskies', 
    url: 'https://www.royalmilewhiskies.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: 'エディンバラの中心地「ロイヤルマイル」に実店舗を構える老舗。インディペンデント・ボトラーや小規模蒸留所の発掘に長ける。' 
  },
  { 
    slug: 'whiskybase-shop', 
    name: 'WhiskyBase Shop', 
    url: 'https://shop.whiskybase.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: '全ウイスキー飲みが検索する世界最強のデータベース「WhiskyBase」が運営するオランダの公式ショップ。マニアックな在庫が揃う。' 
  }
];

const imageDir = '/Users/reona/Downloads/original-price-shops';

const slugToImage = {
  'the-whisky-exchange': 'thewhiskyexchange.webp',
  'master-of-malt': 'masterofmalt.webp',
  'whisky-international-online': 'whiskyinternationalonline.webp',
  'the-whisky-barrel': 'thewhiskybarrel.webp',
  'fine-drams': 'finedrams.webp'
};

async function updateEcosystem() {
  // 1. Insert New Shops
  console.log('Inserting 3 massive new whisky shops...');
  const { error: insertError } = await supabase.from('shops').upsert(newShops, { onConflict: 'slug' });
  if (insertError) console.error('Insert error:', insertError);

  // 2. Upload Screenshots for original 5
  console.log('Uploading real screenshots for the first 5 shops...');
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
      
    console.log(`Updating DB for ${slug}...`);
    await supabase.from('shops').update({ image_url: publicUrlData.publicUrl }).eq('slug', slug);
  }

  console.log('All DB expansions and image uploads completed successfully!');
}

updateEcosystem();
