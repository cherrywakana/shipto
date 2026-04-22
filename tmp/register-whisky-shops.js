const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const newShops = [
  { 
    slug: 'the-whisky-exchange', 
    name: 'The Whisky Exchange (TWE)', 
    url: 'https://www.thewhiskyexchange.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: '英国発・世界最大級のウイスキー通販。圧倒的な品揃えと確実な配送実績で、日本国内の愛好家にとっての「基本インフラ」とも言える存在。' 
  },
  { 
    slug: 'master-of-malt', 
    name: 'Master of Malt', 
    url: 'https://www.masterofmalt.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: 'TWEと双璧をなす英国の超有名ショップ。豊富なサンプリング小瓶（Dram）や独自のボトリングが人気。使いやすいインターフェースも魅力。' 
  },
  { 
    slug: 'whisky-international-online', 
    name: 'Whisky International Online', 
    url: 'https://whiskyinternationalonline.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: 'スコットランド・エディンバラを拠点とし、日本への発送に極めて積極的。日本向けの丁寧な梱包や通関手続きサポートに定評がある。' 
  },
  { 
    slug: 'the-whisky-barrel', 
    name: 'The Whisky Barrel', 
    url: 'https://www.thewhiskybarrel.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: 'ここでしか買えない独占販売のボトラーズ（インディペンデント・ボトラー）が豊富。スコットランドからの直送でマニア垂涎のボトルが並ぶ。' 
  },
  { 
    slug: 'fine-drams', 
    name: 'Fine Drams', 
    url: 'https://www.finedrams.com/', 
    category: '酒類・ウイスキー', 
    ships_to_japan: true, 
    description: 'デンマークに拠点を置く気鋭のショップ。欧州圏の強力なコネクションを持ち、特にヨーロッパ市場限定リリースなどを探す際に重宝する。' 
  }
];

async function insertShops() {
  const { data, error } = await supabase.from('shops').upsert(newShops, { onConflict: 'slug' });
  if (error) {
    console.error('Error inserting whisky shops:', error);
  } else {
    console.log('Successfully registered 5 major OVERSEAS WHISKY shops to the database!');
  }
}
insertShops();
