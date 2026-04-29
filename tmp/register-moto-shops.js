const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const shops = [
  {
    name: 'FC-Moto',
    slug: 'fc-moto',
    url: 'https://www.fc-moto.de/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=FC-Moto'
  },
  {
    name: 'MotardInn（モタードイン）',
    slug: 'motardinn',
    url: 'https://www.tradeinn.com/motardinn/ja',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=MotardInn'
  },
  {
    name: 'ChromeBurner（クロームバーナー）',
    slug: 'chromeburner',
    url: 'https://www.chromeburner.com/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=ChromeBurner'
  },
  {
    name: 'RevZilla（レヴジラ）',
    slug: 'revzilla',
    url: 'https://www.revzilla.com/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=RevZilla'
  },
  {
    name: 'XLmoto',
    slug: 'xlmoto',
    url: 'https://www.xlmoto.com/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=XLmoto'
  },
  {
    name: 'Louis Motorrad',
    slug: 'louis-motorrad',
    url: 'https://www.louis.eu/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=Louis+Motorrad'
  },
  {
    name: 'Champion Helmets',
    slug: 'champion-helmets',
    url: 'https://www.championhelmets.com/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=Champion+Helmets'
  },
  {
    name: 'BurnOut Italy',
    slug: 'burnout-italy',
    url: 'https://www.burnoutmotor.com/',
    image_url: 'https://placehold.co/800x533/ffcce6/000000.png?text=BurnOut+Italy'
  }
];

async function registerMotoShops() {
  console.log('Registering Motorcycle Gear shops...');
  for (const shop of shops) {
    const { data: existing } = await supabase.from('shops').select('id').eq('slug', shop.slug).single();
    
    if (!existing) {
      const { error } = await supabase.from('shops').insert([shop]);
      if (error) console.error(`❌ Failed to insert ${shop.name}:`, error.message);
      else console.log(`✅ Registered: ${shop.name}`);
    } else {
      console.log(`⚠️ Alread Registered: ${shop.name}`);
    }
  }
  console.log('Done!');
}

registerMotoShops();
