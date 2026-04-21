const { createClient } = require('@supabase/supabase-js');
const { chromium } = require('playwright');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function investigatePolicy(url) {
  if (!url) return { shipping: null, tax: null, fee: null };
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' });
  const page = await context.newPage();

  try {
    console.log(`  🔎 Investigating: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // ページ全体のテキストを取得して、キーワード周辺を抽出
    const text = await page.evaluate(() => document.body.innerText);
    const lowerText = text.toLowerCase();

    // 簡易的なマニュアル抽出（後でより高度にできるが、まずはこのロジックで具体性を出す）
    const getMatch = (keywords) => {
      for (const k of keywords) {
        const idx = lowerText.indexOf(k);
        if (idx !== -1) {
          return text.slice(Math.max(0, idx - 40), idx + 160).replace(/\n/g, ' ').trim();
        }
      }
      return null;
    };

    const rawShipping = getMatch(['ship to japan', 'shipping to japan', 'international delivery', 'shipping policy', 'delivery to japan']);
    const rawTax = getMatch(['customs', 'duties', 'tax', 'import duty', 'vat included']);
    const rawFee = getMatch(['shipping fee', 'delivery cost', 'shipping rates', 'free shipping over']);

    return {
      shipping: rawShipping ? `日本への配送に対応。${rawShipping.slice(0, 80)}...` : '公式サイトの配送案内を確認してください。',
      tax: rawTax ? `関税の扱い：${rawTax.slice(0, 80)}...` : '関税はチェックアウト時に加算、または受け取り時支払いの可能性があります。',
      fee: rawFee ? `送料の目安：${rawFee.slice(0, 80)}...` : '送料は注文金額や重量により変動します。カート内で確認してください。'
    };
  } catch (e) {
    console.error(`  ❌ Failed to investigate ${url}:`, e.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function runBatchUpdate() {
  console.log('🚀 Starting batch policy update...');
  
  // 変な定型文が入っている、もしくは未入力のショップを取得
  const { data: shops, error } = await supabase
    .from('shops')
    .select('id, name, url, slug')
    .limit(20); // まずは上位20件で試行

  if (error) {
    console.error('Error fetching shops:', error);
    return;
  }

  for (const shop of shops) {
    console.log(`📦 Processing [${shop.name}] (${shop.slug})...`);
    const policy = await investigatePolicy(shop.url);
    
    if (policy) {
      const { error: updateError } = await supabase
        .from('shops')
        .update({
          tax_guide: policy.tax,
          fee_guide: policy.fee,
          shipping_guide: policy.shipping,
          updated_at: new Date().toISOString()
        })
        .eq('id', shop.id);
        
      if (updateError) {
        console.error(`  ❌ Error updating ${shop.slug}:`, updateError.message);
      } else {
        console.log(`  ✅ Successfully updated ${shop.slug}`);
      }
    }
  }

  console.log('🏁 Batch update finished.');
}

runBatchUpdate();
