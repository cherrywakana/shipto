const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const KEY_FILE = path.join(__dirname, '../google-indexing-service-account.json');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function runBatchIndexing() {
    if (!fs.existsSync(KEY_FILE)) {
        console.error('❌ Service account key file not found.');
        return;
    }

    // 1. Get all URLs
    const { data: posts } = await supabase.from('posts').select('slug');
    const urls = posts.map(p => {
        // Simple logic to distinguish legacy paths vs new paths
        // New styles usually have -guide or are purely english slogans
        // Legacy styles usually have / and are hierarchical
        if (p.slug.includes('/') && !p.slug.includes('articles/')) {
            return `https://original-price.com/${p.slug}`;
        } else if (p.slug.startsWith('articles/')) {
             return `https://original-price.com/${p.slug}`;
        } else {
             return `https://original-price.com/articles/${p.slug}`;
        }
    });
    urls.push('https://original-price.com/');
    // Unique list
    const uniqueUrls = [...new Set(urls)];

    console.log(`🔍 Found ${uniqueUrls.length} URLs to index.`);

    // 2. Auth
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    // 3. Submit
    for (const url of uniqueUrls) {
        try {
            console.log(`🚀 Submitting: ${url}`);
            await indexing.urlNotifications.publish({
                requestBody: { url: url, type: 'URL_UPDATED' }
            });
            console.log('✅ Success');
            // Small delay to avoid rate limits
            await new Promise(r => setTimeout(r, 500));
        } catch (error) {
            console.error(`❌ Error for ${url}:`, error.message);
        }
    }

    console.log('📊 Batch indexing complete.');
}

runBatchIndexing();
