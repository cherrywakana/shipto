const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function syncAffiliates() {
    console.log('--- Starting Affiliate Sync ---');

    // 1. Load CSV
    const csvPath = 'docs/assets/skimlinks_merchants.csv';
    const csvData = fs.readFileSync(csvPath, 'utf8');

    // 2. Fetch all shops from DB
    const { data: shops, error: fetchError } = await supabase
        .from('shops')
        .select('id, url, name');

    if (fetchError) {
        console.error('Error fetching shops:', fetchError);
        return;
    }

    console.log(`Found ${shops.length} shops in database.`);

    // 3. Match and Update
    for (const shop of shops) {
        let isMatch = false;
        try {
            const urlObj = new URL(shop.url);
            const host = urlObj.hostname.toLowerCase().replace('www.', '');

            // CSV contains domains like 'net-a-porter.com'
            // Simple string inclusion check for now as it's a large CSV
            if (csvData.toLowerCase().includes(host)) {
                isMatch = true;
            }
        } catch (e) {
            console.warn(`Could not parse URL for shop: ${shop.name} (${shop.url})`);
        }

        if (isMatch) {
            const { error: updateError } = await supabase
                .from('shops')
                .update({ is_affiliate: true })
                .eq('id', shop.id);

            if (updateError) {
                console.error(`Failed to update ${shop.name}:`, updateError.message);
            } else {
                console.log(`✅ Marked as affiliate: ${shop.name}`);
            }
        } else {
            // Ensure others are false if not matched
            await supabase.from('shops').update({ is_affiliate: false }).eq('id', shop.id);
            console.log(`⚪ Not an affiliate: ${shop.name}`);
        }
    }

    console.log('--- Sync Completed ---');
}

syncAffiliates();
