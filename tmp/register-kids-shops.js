const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const newShops = [
  { 
    slug: 'childrensalon', 
    name: 'Childrensalon', 
    url: 'https://www.childrensalon.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'イギリス発。BURBERRYやGUCCIなど世界有数のハイブランド子供服を取り揃える、海外通販最大の登竜門的サイト。' 
  },
  { 
    slug: 'babyshop', 
    name: 'Babyshop', 
    url: 'https://www.babyshop.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'スウェーデン発。Mini Rodiniなど北欧系のオシャレなキッズブランドを網羅。日本のママからの人気が極めて高い。' 
  },
  { 
    slug: 'next-kids', 
    name: 'Next', 
    url: 'https://www.next.co.uk/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'イギリスの国民的ブランド。何と言っても価格が安く、保育園用のまとめ買いなどで日常的に利用されている大本命。' 
  },
  { 
    slug: 'boden', 
    name: 'Boden (Mini Boden)', 
    url: 'https://www.boden.co.uk/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'イギリス発。カラフルで質が高く、洗濯に強いことで知られる。キャサリン妃の子供たちも愛用していることで有名。' 
  },
  { 
    slug: 'patpat', 
    name: 'PatPat', 
    url: 'https://www.patpat.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'アメリカ発。とにかく圧倒的な安さとトレンドを押さえたデザインが魅力。親子リンクコーデの服を探すならここ。' 
  },
  { 
    slug: 'carters', 
    name: 'Carter\'s', 
    url: 'https://www.carters.com/', 
    category: 'キッズ・ベビー', 
    ships_to_japan: true, 
    description: 'アメリカの定番ベビー服ブランド。ロンパースやセットアップの可愛らしさと耐久性は世界中で愛されている。' 
  }
];

async function insertShops() {
  const { data, error } = await supabase.from('shops').upsert(newShops, { onConflict: 'slug' });
  if (error) {
    console.error('Error inserting kids shops:', error);
  } else {
    console.log('Successfully registered 6 major KIDS FASHION shops to the database!');
  }
}
insertShops();
