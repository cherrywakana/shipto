const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const newShops = [
  { 
    slug: 'nordic-nest', 
    name: 'Nordic Nest（ノルディックネスト）', 
    url: 'https://www.nordicnest.jp/', 
    category: 'インテリア', 
    ships_to_japan: true, 
    description: 'スウェーデン発。北欧デザインを代表するインテリア通販。日本語サイトがあり個人輸入初心者にも最適。' 
  },
  { 
    slug: 'finnish-design-shop', 
    name: 'Finnish Design Shop（フィニッシュデザインショップ）', 
    url: 'https://www.finnishdesignshop.com/', 
    category: 'インテリア', 
    ships_to_japan: true, 
    description: 'フィンランド発。アルテックやマリメッコなど北欧インテリアを網羅する世界最大級のプロバイダー。' 
  },
  { 
    slug: 'anthropologie', 
    name: 'Anthropologie（アンソロポロジー）', 
    url: 'https://www.anthropologie.com/', 
    category: 'インテリア', 
    ships_to_japan: true, 
    description: 'アメリカ発。ボヘミアンで華やかな世界観のインテリア雑貨や壁紙、家具が国内でも圧倒的な人気を誇る。' 
  },
  { 
    slug: 'royal-design', 
    name: 'RoyalDesign（ロイヤルデザイン）', 
    url: 'https://royaldesign.jp/', 
    category: 'インテリア', 
    ships_to_japan: true, 
    description: 'スウェーデン発。北欧の食器や照明、インテリア雑貨の世界最大級サイト。日本向けのローカライズも優秀。' 
  },
  { 
    slug: 'west-elm', 
    name: 'West elm（ウエストエルム）', 
    url: 'https://www.westelm.com/', 
    category: 'インテリア', 
    ships_to_japan: true, 
    description: 'NY・ブルックリン発。都会的でモダン・コンテンポラリーなインテリアを提案する最先端ブランド。' }
];

async function insertShops() {
  const { data, error } = await supabase.from('shops').upsert(newShops, { onConflict: 'slug' });
  if (error) {
    console.error('Error inserting shops:', error);
  } else {
    console.log('Successfully registered 5 major interior shops to the database!');
  }
}
insertShops();
