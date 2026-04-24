const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function registerNewEra() {
  console.log('Registering New Era in brands table...');
  const { error: brandErr } = await supabase.from('brands').upsert([{ 
    name: 'New Era（ニューエラ）', 
    slug: 'newera', 
    search_slugs: ['new-era', 'newera-cap'],
    has_guide_article: true 
  }], { onConflict: 'slug' });
  
  if (brandErr) console.error('Brand Error:', brandErr);
  else console.log('Successfully registered New Era brand.');

  console.log('Registering Lids and Amazingstore in shops table...');
  const newShops = [
    { 
      slug: 'lids', 
      name: 'Lids（リッズ）', 
      url: 'https://www.lids.com/', 
      category: 'ファッション', 
      ships_to_japan: false, 
      description: '北米最大のスポーツライセンス・ヘッドウェア専門店。ニューエラキャップの品揃えは世界一で、限定コラボやMLBショップ独占モデルが多数あります。日本直送非対応のため転送サービス必須。' 
    },
    { 
      slug: 'amazingstore', 
      name: 'Amazingstore（アメイジングストア）', 
      url: 'https://amazingstore.jp/', 
      category: 'ファッション', 
      ships_to_japan: true, 
      description: '日本国内の並行輸入ショップ。海外限定モデルやカスタム別注モデルの在庫が常時数万点あり、海外通販のハードルなしに即日発送・関税ゼロでレア物を購入できる最強の選択肢です。' 
    }
  ];

  const { error: shopErr } = await supabase.from('shops').upsert(newShops, { onConflict: 'slug' });
  if (shopErr) console.error('Shop Error:', shopErr);
  else console.log('Successfully registered Lids and Amazingstore.');
}
registerNewEra();
