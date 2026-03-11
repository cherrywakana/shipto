const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Simplified CSV parser for this specific file format
function extractDomainsFromCSV(csvData) {
    const domains = new Set();
    const lines = csvData.split('\n');

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // The CSV uses quotes for fields with commas. 
        // Domains are usually at the 3rd column (index 2).
        // Example: 9,"Sephora","beauty.sephora.com, m.sephora.com, ..."

        let parts = [];
        let currentPart = '';
        let inQuotes = false;

        for (let char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                parts.push(currentPart.trim());
                currentPart = '';
            } else {
                currentPart += char;
            }
        }
        parts.push(currentPart.trim());

        if (parts.length > 2) {
            const domainField = parts[2]; // Index 2 is "Domains"
            // Split by comma in case of multiple domains
            const domainList = domainField.split(',').map(d => d.trim().toLowerCase().replace(/^www\./, ''));
            domainList.forEach(d => {
                if (d) domains.add(d);
            });
        }
    }
    return domains;
}

async function syncAffiliates() {
    console.log('--- Starting Precise Affiliate Sync ---');

    const csvPath = 'docs/assets/skimlinks_merchants.csv';
    if (!fs.existsSync(csvPath)) {
        console.error('CSV not found at:', csvPath);
        return;
    }

    const csvData = fs.readFileSync(csvPath, 'utf8');
    console.log('Parsing CSV domains...');
    const affiliateDomains = extractDomainsFromCSV(csvData);
    console.log(`Extracted ${affiliateDomains.size} unique domains from CSV.`);

    const { data: shops, error: fetchError } = await supabase
        .from('shops')
        .select('id, url, name');

    if (fetchError) {
        console.error('Error fetching shops:', fetchError);
        return;
    }

    for (const shop of shops) {
        let isMatch = false;
        try {
            const urlObj = new URL(shop.url);
            const shopHost = urlObj.hostname.toLowerCase().replace(/^www\./, '');
            const shopParts = shopHost.split('.');

            // Check for exact match or subdomain match
            // e.g., if affiliateDomains has 'jdsports.com', it should match 'global.jdsports.com'
            for (const affDomain of affiliateDomains) {
                if (shopHost === affDomain || shopHost.endsWith('.' + affDomain)) {
                    isMatch = true;
                    break;
                }
                // Reverse check: if shopHost is 'jdsports.com' and affDomain is 'global.jdsports.com'
                if (affDomain.endsWith('.' + shopHost)) {
                    isMatch = true;
                    break;
                }
            }

            // Fallback: name based matching for known big brands if domain fails
            if (!isMatch) {
                const normalizedShopName = shop.name.toLowerCase();
                const knownAffiliates = ['jd sports', 'jdsports', 'ssense', 'farfetch', 'mytheresa'];
                if (knownAffiliates.some(name => normalizedShopName.includes(name))) {
                    // Double check if any affiliate domain contains the brand name
                    for (const affDomain of affiliateDomains) {
                        if (affDomain.includes('jdsports') && normalizedShopName.includes('jd sports')) {
                            isMatch = true;
                            break;
                        }
                    }
                }
            }

        } catch (e) {
            console.warn(`Could not parse URL for shop: ${shop.name} (${shop.url})`);
        }

        if (isMatch) {
            await supabase.from('shops').update({ is_affiliate: true }).eq('id', shop.id);
            console.log(`✅ Affiliate Found: ${shop.name} (${shop.url})`);
        } else {
            await supabase.from('shops').update({ is_affiliate: false }).eq('id', shop.id);
            console.log(`⚪ Non-Affiliate: ${shop.name}`);
        }
    }

    console.log('--- Sync Completed ---');
}

syncAffiliates();
