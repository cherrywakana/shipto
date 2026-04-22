const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const extraShops = [
  { 
    slug: 'smallable', 
    name: 'Smallable', 
    url: 'https://en.smallable.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'フランス発。「ファミリー・コンセプトストア」として、世界中から感度の高いキッズ服やインテリアを集めた非常にお洒落な大型セレクトショップ。' 
  },
  { 
    slug: 'the-childrens-place', 
    name: 'The Children\'s Place', 
    url: 'https://www.childrensplace.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'アメリカの巨大チェーン。Carter\'sと並んで日常使いのアメカジキッズ服として絶大なシェアを誇る。セール時の安さは圧巻。' 
  },
  { 
    slug: 'vertbaudet', 
    name: 'Vertbaudet（ヴェルボデ）', 
    url: 'https://www.vertbaudet.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'フランス発の老舗。フレンチシックで上品なデザインなのに価格が手頃で、マタニティウェアから子供服まで幅広くカバーしている。' 
  },
  { 
    slug: 'hanna-andersson', 
    name: 'Hanna Andersson', 
    url: 'https://www.hannaandersson.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'アメリカ発（北欧ルーツ）。オーガニックコットンを使用した極上の肌触りと、何度洗ってもヘタらない耐久性でファンが多い。パジャマが特に有名。' 
  }
];

async function insertExtraShops() {
  const { data, error } = await supabase.from('shops').upsert(extraShops, { onConflict: 'slug' });
  if (error) {
    console.error('Error inserting extra kids shops:', error);
  } else {
    console.log('Successfully added 4 MORE KIDS FASHION shops to the database! (Total 10)');
  }
}
insertExtraShops();
