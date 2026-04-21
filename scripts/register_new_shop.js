/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const { execSync } = require('child_process');
const dotenv = require('dotenv');

chromium.use(stealth);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const SKIMLINKS_CSV = path.resolve(__dirname, '../docs/assets/skimlinks_merchants.csv');
const USER_AGENT = 'OriginalPriceBot/1.0 (+https://original-price.com)';

// Policy verification configuration
const FIELD_CONFIG = {
    shipping: {
        keywords: ['ship', 'shipping', 'delivery', 'international', 'worldwide', 'country', 'countries'],
        fallbackPaths: ['/shipping', '/shipping-policy', '/delivery', '/help/shipping'],
        sentenceKeywords: ['japan', 'international', 'shipping', 'delivery', 'ship', 'country'],
    },
    tax: {
        keywords: ['custom', 'duty', 'duties', 'tax', 'taxes', 'vat', 'import', 'ddp', 'ddu'],
        fallbackPaths: ['/customs', '/duties-and-taxes', '/taxes', '/help/customs'],
        sentenceKeywords: ['custom', 'duty', 'duties', 'tax', 'taxes', 'vat', 'ddp', 'ddu', 'import'],
    },
    fee: {
        keywords: ['shipping-cost', 'rate', 'rates', 'cost', 'free-shipping'],
        fallbackPaths: ['/shipping-costs', '/delivery-costs', '/shipping'],
        sentenceKeywords: ['shipping', 'delivery', 'cost', 'costs', 'rate', 'rates', 'free shipping', 'fee'],
    },
};

function parseArgs(argv) {
    const args = {
        url: null,
        name: null,
        category: 'Fashion',
        country: 'Global',
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--url' && argv[i + 1]) {
            args.url = argv[++i];
        } else if (arg === '--name' && argv[i + 1]) {
            args.name = argv[++i];
        } else if (arg === '--category' && argv[i + 1]) {
            args.category = argv[++i];
        } else if (arg === '--country' && argv[i + 1]) {
            args.country = argv[++i];
        }
    }

    return args;
}

function getSlugFromUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return domain.replace('www.', '').split('.')[0];
    } catch {
        return null;
    }
}

async function checkAffiliateStatus(domain) {
    if (!fs.existsSync(SKIMLINKS_CSV)) return false;
    const content = fs.readFileSync(SKIMLINKS_CSV, 'utf8');
    const cleanDomain = domain.replace('www.', '').toLowerCase();
    return content.toLowerCase().includes(cleanDomain);
}

async function fetchPage(url) {
    try {
        const response = await axios.get(url, {
            timeout: 10000,
            headers: { 'User-Agent': USER_AGENT },
            validateStatus: (status) => status >= 200 && status < 400,
        });
        const $ = cheerio.load(response.data);
        $('script, style, noscript').remove();
        return {
            html: response.data,
            text: $('body').text().replace(/\s+/g, ' ').trim(),
            url,
        };
    } catch {
        return null;
    }
}

async function investigatePolicy(baseUrl, field) {
    const config = FIELD_CONFIG[field];
    const candidateUrls = config.fallbackPaths.map(p => new URL(p, baseUrl).toString());
    
    for (const url of candidateUrls) {
        const page = await fetchPage(url);
        if (!page) continue;

        const sentences = page.text.split(/[.!?。]\s+/);
        for (const s of sentences) {
            const lower = s.toLowerCase();
            if (config.sentenceKeywords.some(kw => lower.includes(kw))) {
                return { summary: s.slice(0, 300), url };
            }
        }
    }
    return { summary: null, url: null };
}

async function captureAndUploadScreenshot(slug, url) {
    console.log(`📸 Capturing screenshot for ${slug}...`);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const tmpPng = path.join(__dirname, `../tmp/${slug}.png`);
        const tmpWebp = path.join(__dirname, `../tmp/${slug}.webp`);
        
        await page.screenshot({ path: tmpPng });
        await browser.close();

        // Convert to WebP using npx sharp-cli (reliable way without permanent dependency)
        console.log(`  🔄 Converting to WebP...`);
        execSync(`npx -y sharp-cli -i ${tmpPng} -o ${tmpWebp}`);

        const fileContent = fs.readFileSync(tmpWebp);
        console.log(`  🚀 Uploading to Supabase Storage (shop-thumbnails)...`);
        const { error } = await supabase.storage
            .from('shop-thumbnails')
            .upload(`${slug}.webp`, fileContent, { contentType: 'image/webp', upsert: true });

        if (error) throw error;

        const timestamp = Date.now();
        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop-thumbnails/${slug}.webp?t=${timestamp}`;
        
        // Clean up
        if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng);
        if (fs.existsSync(tmpWebp)) fs.unlinkSync(tmpWebp);

        return imageUrl;
    } catch (e) {
        console.warn(`  ⚠️ Screenshot failed: ${e.message}`);
        await browser.close();
        return null;
    }
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    if (!args.url) {
        console.error('Usage: node scripts/register_new_shop.js --url <url> [--name <name>] [--category <cat>]');
        process.exit(1);
    }

    const slug = getSlugFromUrl(args.url);
    const domain = new URL(args.url).hostname;
    const name = args.name || slug.charAt(0).toUpperCase() + slug.slice(1);
    
    console.log(`\n=== Onboarding New Shop: ${name} ===`);

    const [isAffiliate, shipPolicy, taxPolicy, feePolicy, imageUrl] = await Promise.all([
        checkAffiliateStatus(domain),
        investigatePolicy(args.url, 'shipping'),
        investigatePolicy(args.url, 'tax'),
        investigatePolicy(args.url, 'fee'),
        captureAndUploadScreenshot(slug, args.url)
    ]);

    const payload = {
        slug,
        name,
        url: args.url,
        category: args.category,
        country: args.country,
        image_url: imageUrl,
        is_affiliate: isAffiliate,
        shipping_guide: shipPolicy.summary,
        shipping_url: shipPolicy.url,
        tax_guide: taxPolicy.summary,
        tax_url: taxPolicy.url,
        fee_guide: feePolicy.summary,
        fee_url: feePolicy.url,
        ships_to_japan: shipPolicy.summary ? true : null,
        popularity_score: 5,
        created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('shops').upsert(payload, { onConflict: 'slug' });

    if (error) {
        console.error(`❌ Failed to register: ${error.message}`);
        process.exit(1);
    }

    console.log('\n✅ Successfully Registered!');
    console.log(`   Slug: ${slug}`);
    console.log(`   Affiliate: ${isAffiliate}`);
    console.log(`   Image: ${imageUrl || 'None'}`);
    console.log(`   Policy: ${shipPolicy.summary ? 'Scraped' : 'Not found'}`);
}

main();
