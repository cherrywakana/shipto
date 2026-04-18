/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const USER_AGENT = 'OriginalPriceBot/1.0 (+https://original-price.com)';
const OUTPUT_DIR = path.resolve(__dirname, '../tmp/shop-policy-verifier');

const FIELD_CONFIG = {
    shipping: {
        keywords: ['ship', 'shipping', 'delivery', 'international', 'worldwide', 'country', 'countries'],
        fallbackPaths: [
            '/shipping',
            '/shipping-policy',
            '/delivery',
            '/delivery-information',
            '/help/shipping',
            '/pages/shipping',
            '/pages/shipping-policy',
            '/policies/shipping-policy',
            '/customer-care/delivery',
            '/support/shipping',
            '/help/international-shipping',
        ],
        sentenceKeywords: ['japan', 'international', 'shipping', 'delivery', 'ship', 'country'],
    },
    tax: {
        keywords: ['custom', 'duty', 'duties', 'tax', 'taxes', 'vat', 'import', 'ddp', 'ddu'],
        fallbackPaths: [
            '/customs',
            '/duties-and-taxes',
            '/customs-duties',
            '/taxes',
            '/help/customs',
            '/pages/duties-and-taxes',
            '/support/duties',
            '/international-ordering',
            '/customer-care/delivery/will-i-have-to-pay-customs-charges-on-my-order/',
        ],
        sentenceKeywords: ['custom', 'duty', 'duties', 'tax', 'taxes', 'vat', 'ddp', 'ddu', 'import'],
    },
    fee: {
        keywords: ['shipping-cost', 'shipping-costs', 'delivery-cost', 'delivery-costs', 'postage', 'rate', 'rates', 'cost', 'free-shipping', 'free shipping'],
        fallbackPaths: [
            '/shipping-costs',
            '/delivery-costs',
            '/shipping',
            '/delivery',
            '/help/shipping-costs',
            '/pages/shipping-rates',
            '/support/shipping',
            '/customer-care/delivery/delivery-times-costs-for-my-country/',
        ],
        sentenceKeywords: ['shipping', 'delivery', 'cost', 'costs', 'rate', 'rates', 'free shipping', 'fee'],
    },
};

function parseArgs(argv) {
    const args = {
        slug: null,
        limit: 10,
        dryRun: false,
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--slug' && argv[i + 1]) {
            args.slug = argv[++i];
        } else if (arg === '--limit' && argv[i + 1]) {
            args.limit = Number(argv[++i]) || args.limit;
        } else if (arg === '--dry-run') {
            args.dryRun = true;
        }
    }

    return args;
}

function ensureOutputDir() {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function simplifyText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function normalizeUrl(baseUrl, rawHref) {
    if (!rawHref) return null;
    if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return null;

    try {
        const base = new URL(baseUrl);
        const resolved = new URL(rawHref, base);
        if (resolved.hostname !== base.hostname) return null;
        resolved.hash = '';
        return resolved.toString();
    } catch {
        return null;
    }
}

function splitIntoSentences(text) {
    return text
        .split(/(?<=[.!?。])\s+/)
        .map((sentence) => simplifyText(sentence))
        .filter(Boolean);
}

function extractPageText(html) {
    const $ = cheerio.load(html);
    $('script, style, noscript').remove();

    const title = simplifyText($('title').first().text());
    const headings = $('h1, h2, h3').map((_, el) => simplifyText($(el).text())).get().filter(Boolean).slice(0, 12);
    const bodyText = simplifyText($('body').text()).slice(0, 12000);

    return [title, ...headings, bodyText].filter(Boolean).join('\n');
}

async function fetchPage(url) {
    const response = await axios.get(url, {
        timeout: 20000,
        maxRedirects: 5,
        headers: {
            'User-Agent': USER_AGENT,
            'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
        },
        validateStatus: (status) => status >= 200 && status < 400,
    });

    return {
        url,
        finalUrl: response.request?.res?.responseUrl || url,
        html: response.data,
        text: extractPageText(response.data),
    };
}

function discoverCandidates(baseUrl, homepageHtml) {
    const $ = cheerio.load(homepageHtml);
    const map = new Map();

    $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        const normalized = normalizeUrl(baseUrl, href);
        if (!normalized) return;

        const text = simplifyText($(el).text());
        if (!map.has(normalized)) map.set(normalized, text);
    });

    return Array.from(map.entries()).map(([url, text]) => ({ url, text }));
}

function scoreCandidate(url, anchorText, field) {
    const config = FIELD_CONFIG[field];
    const haystack = `${url} ${anchorText}`.toLowerCase();
    let score = 0;

    for (const keyword of config.keywords) {
        if (haystack.includes(keyword)) score += 2;
    }

    if (haystack.includes('japan')) score += 2;
    if (haystack.includes('international')) score += 1;
    if (haystack.includes('policy')) score += 1;
    if (haystack.includes('help')) score += 1;

    return score;
}

function buildHeuristicUrls(baseUrl, field) {
    const root = new URL(baseUrl);
    return FIELD_CONFIG[field].fallbackPaths.map((pathName) => new URL(pathName, root).toString());
}

async function collectDocsForField(baseUrl, homepageLinks, field) {
    const ranked = homepageLinks
        .map((item) => ({
            url: item.url,
            text: item.text,
            score: scoreCandidate(item.url, item.text, field),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

    const candidateUrls = [
        ...ranked.slice(0, 5).map((item) => item.url),
        ...buildHeuristicUrls(baseUrl, field),
    ].filter((url, index, array) => array.indexOf(url) === index);

    const docs = [];
    for (const url of candidateUrls.slice(0, 6)) {
        try {
            const page = await fetchPage(url);
            if (page.text.length < 120) continue;
            docs.push({
                url: page.finalUrl,
                text: page.text,
                sentences: splitIntoSentences(page.text),
            });
        } catch {
            // Ignore failed candidate pages and continue.
        }
        await sleep(250);
    }

    return docs;
}

function scoreSentence(sentence, keywords, boosts = []) {
    const lower = sentence.toLowerCase();
    let score = 0;

    for (const keyword of keywords) {
        if (lower.includes(keyword)) score += 2;
    }

    for (const boost of boosts) {
        if (lower.includes(boost)) score += 3;
    }

    return score;
}

function selectBestSentence(docs, field, extraBoosts = []) {
    const keywords = FIELD_CONFIG[field].sentenceKeywords;
    const candidates = [];

    for (const doc of docs) {
        for (const sentence of doc.sentences) {
            const score = scoreSentence(sentence, keywords, extraBoosts);
            if (score > 0) {
                candidates.push({ sentence, score, url: doc.url });
            }
        }
    }

    candidates.sort((a, b) => b.score - a.score || a.sentence.length - b.sentence.length);
    return candidates[0] || null;
}

function getConfidence(score) {
    if (score >= 8) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
}

function verifyShipping(docs) {
    const candidate = selectBestSentence(docs, 'shipping', ['japan', 'international']);
    if (!candidate) {
        return { status: 'unknown', summary: '', source_url: '', confidence: 'low' };
    }

    const lower = candidate.sentence.toLowerCase();
    let status = 'unknown';

    if (/(not ship|cannot ship|unable to ship|do not ship|excluded from shipping|not available for shipping|does not ship)/.test(lower)) {
        status = 'not_supported';
    } else if (/(restriction|restricted|certain brands|some items|some products|except|excludes)/.test(lower)) {
        status = 'restricted';
    } else if (/(japan|international|worldwide|ships to|delivery to)/.test(lower)) {
        status = 'supported';
    }

    return {
        status,
        summary: candidate.sentence,
        source_url: candidate.url,
        confidence: getConfidence(candidate.score),
    };
}

function verifyTax(docs) {
    const candidate = selectBestSentence(docs, 'tax', ['ddp', 'ddu', 'duty', 'tax']);
    if (!candidate) {
        return { status: 'unknown', summary: '', source_url: '', confidence: 'low' };
    }

    const lower = candidate.sentence.toLowerCase();
    let status = 'unknown';

    if (/(ddp|duties paid|taxes included|all import fees included|prepaid duties|pre-paid duties|included at checkout)/.test(lower)) {
        status = 'ddp';
    } else if (/(ddu|duties unpaid|pay on delivery|upon delivery|not included|separately charged|charged by carrier|import charges may apply)/.test(lower)) {
        status = 'ddu';
    } else if (/(ddp).*(ddu)|(ddu).*(ddp)|option/.test(lower)) {
        status = 'mixed';
    }

    return {
        status,
        summary: candidate.sentence,
        source_url: candidate.url,
        confidence: getConfidence(candidate.score),
    };
}

function verifyFee(docs) {
    const candidate = selectBestSentence(docs, 'fee', ['free shipping', 'cost', 'fee', 'rate']);
    if (!candidate) {
        return { status: 'unknown', summary: '', source_url: '', confidence: 'low' };
    }

    const lower = candidate.sentence.toLowerCase();
    let status = 'unknown';

    if (/(free shipping|free delivery|complimentary shipping).*(over|above|orders over|threshold)/.test(lower)) {
        status = 'free_over_threshold';
    } else if (/(flat rate|fixed rate|¥|￥|\$|usd|eur|gbp|jpy|€|£)/.test(lower)) {
        status = 'fixed';
    } else if (/(calculated at checkout|based on weight|based on size|varies by|depending on)/.test(lower)) {
        status = 'variable';
    }

    return {
        status,
        summary: candidate.sentence,
        source_url: candidate.url,
        confidence: getConfidence(candidate.score),
    };
}

function verifyDocs(docsByField) {
    return {
        shipping: verifyShipping(docsByField.shipping),
        tax: verifyTax(docsByField.tax),
        fee: verifyFee(docsByField.fee),
        overall_note: 'Local rule-based extraction from official policy pages.',
    };
}

function cleanSummary(text) {
    return simplifyText(text || '').slice(0, 300);
}

function mapPayload(result) {
    return {
        shipping_guide: cleanSummary(result.shipping.summary) || null,
        tax_guide: cleanSummary(result.tax.summary) || null,
        fee_guide: cleanSummary(result.fee.summary) || null,
        shipping_url: result.shipping.source_url || null,
        tax_url: result.tax.source_url || null,
        fee_url: result.fee.source_url || null,
    };
}

async function updateShop(shop, result, dryRun) {
    const payload = mapPayload(result);

    if (dryRun) return { payload, error: null };

    let update = await supabase.from('shops').update(payload).eq('id', shop.id);
    if (!update.error) return { payload, error: null };

    const fallbackPayload = {
        shipping_guide: payload.shipping_guide,
        tax_guide: payload.tax_guide,
        fee_guide: payload.fee_guide,
    };
    update = await supabase.from('shops').update(fallbackPayload).eq('id', shop.id);

    return { payload: fallbackPayload, error: update.error };
}

function writeReport(shop, docsByField, result, payload, error) {
    ensureOutputDir();
    const report = {
        shop: {
            id: shop.id,
            slug: shop.slug,
            name: shop.name,
            url: shop.url,
        },
        checked_at: new Date().toISOString(),
        extraction_method: 'local_rule_based',
        docs_by_field: Object.fromEntries(
            Object.entries(docsByField).map(([key, docs]) => [
                key,
                docs.map((doc) => ({ url: doc.url, preview: doc.text.slice(0, 800) })),
            ])
        ),
        result,
        update_payload: payload,
        update_error: error ? error.message || String(error) : null,
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, `${shop.slug}.json`),
        JSON.stringify(report, null, 2),
        'utf8'
    );
}

async function loadTargetShops(args) {
    let query = supabase
        .from('shops')
        .select('id, name, slug, url, shipping_url, tax_url, fee_url, shipping_guide, tax_guide, fee_guide')
        .order('popularity_score', { ascending: false })
        .limit(args.limit);

    if (args.slug) query = query.eq('slug', args.slug);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

async function verifyShop(shop, args) {
    console.log(`\n=== Verifying ${shop.name} (${shop.slug}) ===`);

    const homepage = await fetchPage(shop.url);
    const homepageLinks = discoverCandidates(shop.url, homepage.html);

    const docsByField = {
        shipping: await collectDocsForField(shop.url, homepageLinks, 'shipping'),
        tax: await collectDocsForField(shop.url, homepageLinks, 'tax'),
        fee: await collectDocsForField(shop.url, homepageLinks, 'fee'),
    };

    const result = verifyDocs(docsByField);
    const { payload, error } = await updateShop(shop, result, args.dryRun);

    writeReport(shop, docsByField, result, payload, error);

    if (error) {
        console.error(`❌ Failed to update ${shop.slug}: ${error.message || error}`);
        return;
    }

    console.log(`✅ ${shop.slug}`);
    console.log(`   shipping: ${result.shipping.status} (${result.shipping.confidence})`);
    console.log(`   tax: ${result.tax.status} (${result.tax.confidence})`);
    console.log(`   fee: ${result.fee.status} (${result.fee.confidence})`);
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const shops = await loadTargetShops(args);

    if (shops.length === 0) {
        console.log('No shops found to verify.');
        return;
    }

    for (const shop of shops) {
        try {
            await verifyShop(shop, args);
        } catch (error) {
            console.error(`❌ ${shop.slug}: ${error.message || error}`);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
