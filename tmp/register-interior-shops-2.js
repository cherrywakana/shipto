const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const newShops = [
  { slug: 'urban-outfitters', name: 'Urban Outfitters（アーバンアウトフィッターズ）', url: 'https://www.urbanoutfitters.com/', category: 'インテリア', ships_to_japan: true, description: 'アメリカ発。トレンドに敏感な若年層に圧倒的な人気を誇るセレクトショップ系のインテリア。' },
  { slug: 'kare', name: 'KARE（カレ）', url: 'https://kare.co.jp/', category: 'インテリア', ships_to_japan: true, description: 'ドイツ発。ユーモアと個性が溢れる独創的なデザイン家具。日本公式ストアで安全に買える。' },
  { slug: 'the-conran-shop', name: 'The Conran Shop（ザ・コンランショップ）', url: 'https://www.conranshop.jp/', category: 'インテリア', ships_to_japan: true, description: 'イギリス発。世界中から厳選されたモダンで質の高い家具や照明を取り扱うプレミアムなセレクト。' },
  { slug: 'flymee', name: 'FLYMEe（フライミー）', url: 'https://flymee.jp/', category: 'インテリア', ships_to_japan: true, description: '日本最大級の家具・インテリア通販サイト。海外のデザイナーズ家具を国内で安心して購入できる。' },
  { slug: 'muse-home', name: 'MUSE HOME（ミューズホーム）', url: 'https://musehome.shop/', category: 'インテリア', ships_to_japan: true, description: '海外テイストの輸入家具・雑貨専門店。大理石調やゴールドを効かせたラグジュアリーな空間作りに最適。' }
];

async function insertShops() {
  const { data, error } = await supabase.from('shops').upsert(newShops, { onConflict: 'slug' });
  if (error) console.error('Error inserting shops:', error);
  else console.log('Successfully registered 5 MORE interior shops to the database!');
}
insertShops();
