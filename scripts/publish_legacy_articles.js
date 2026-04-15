const { createClient } = require('@supabase/supabase-js');
const ARTICLES = require('./legacy_articles_data');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function publishAll() {
    // Fetch all shops in one go
    const { data: allShops } = await supabase.from('shops').select('name, slug, description, image_url, url');
    const shopMap = {};
    allShops.forEach(s => { shopMap[s.slug] = s; });

    let published = 0;
    let skipped = 0;

    for (const article of ARTICLES) {
        // Check if already exists
        const { data: existing } = await supabase.from('posts').select('id').eq('slug', article.slug).single();
        if (existing) {
            console.log(`⏭️  Skipping (exists): ${article.slug}`);
            skipped++;
            continue;
        }

        let content = `<p>${article.intro}</p>`;

        for (let i = 0; i < article.shops.length; i++) {
            const item = article.shops[i];
            const shop = shopMap[item.slug];
            if (!shop) {
                console.warn(`⚠️  Shop not found: ${item.slug}`);
                continue;
            }
            content += `
<h3>${i + 1}. ${shop.name}</h3>
<div style="margin-bottom: 20px; overflow: hidden; border-radius: 12px; border: 1px solid #eee;">
  <a href="${shop.url}" target="_blank" rel="noopener noreferrer">
    <img src="${shop.image_url}" alt="${shop.name}" style="width: 100%; height: auto; display: block;">
  </a>
</div>
<p>${item.note}</p>
<div style="text-align: center; margin: 30px 0;">
  <a href="${shop.url}" target="_blank" rel="noopener noreferrer" style="background: #111; color: #fff; padding: 14px 36px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">${shop.name} 公式サイトはこちら</a>
</div>`;
        }

        content += `
<hr>
<h2>まとめ</h2>
<p>今回紹介したショップはいずれも信頼性が高く、日本への発送実績が豊富なショップばかりです。初めての場合は日本語対応のショップから始めてみるのがおすすめです。</p>
<ul>
  <li>関税込み（DDP）かどうかを必ず確認しましょう</li>
  <li>PayPal払いで買い手保護制度を活用しましょう</li>
  <li>セール時期（ブラックフライデー等）を狙うとさらにお得になります</li>
</ul>`;

        const { error } = await supabase.from('posts').insert({
            slug: article.slug,
            title: article.title,
            content,
            category: 'ガイド',
            created_at: new Date().toISOString()
        });

        if (error) {
            console.error(`❌ Error: ${article.slug} - ${error.message}`);
        } else {
            console.log(`✅ Published: /${article.slug}`);
            published++;
        }
    }

    console.log(`\n📊 Done! Published: ${published}, Skipped: ${skipped}`);
}

publishAll();
