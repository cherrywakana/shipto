/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_POLICY_MODEL || 'gpt-4o-mini';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.');
}

if (!OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY in environment.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const USER_AGENT = 'OriginalPriceBot/1.0 (+https://original-price.com)';
const OUTPUT_DIR = path.resolve(__dirname, '../tmp/shop-policy-verifier');

const FIELD_CONFIG = {
    shipping: {
        label: '日本発送',
        keywords: ['ship', 'shipping', 'delivery', 'international', 'worldwide', 'country', 'countries', 'returns', 'help/shipping'],
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
    },
    tax: {
        label: '関税',
        keywords: ['custom', 'duty', 'duties', 'tax', 'taxes', 'vat', 'import', 'ddp', 'ddu', 'international-order'],
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
    },
    fee: {
        label: '送料',
        keywords: ['shipping-cost', 'shipping-costs', 'delivery-cost', 'delivery-costs', 'postage', 'rate', 'rates', 'cost', 'free-shipping'],
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
    },
};

const RESPONSE_SCHEMA = {
    name: 'shop_policy_verification',
    strict: true,
    schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
            shipping: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    status: { type: 'string', enum: ['supported', 'not_supported', 'restricted', 'unknown'] },
                    summary: { type: 'string' },
                    source_url: { type: 'string' },
                    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
                },
                required: ['status', 'summary', 'source_url', 'confidence'],
            },
            tax: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    status: { type: 'string', enum: ['ddp', 'ddu', 'mixed', 'unknown'] },
                    summary: { type: 'string' },
                    source_url: { type: 'string' },
                    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
                },
                required: ['status', 'summary', 'source_url', 'confidence'],
            },
            fee: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    status: { type: 'string', enum: ['fixed', 'variable', 'free_over_threshold', 'unknown'] },
                    summary: { type: 'string' },
                    source_url: { type: 'string' },
                    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
                },
                required: ['status', 'summary', 'source_url', 'confidence'],
            },
            overall_note: { type: 'string' },
        },
        required: ['shipping', 'tax', 'fee', 'overall_note'],
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

function simplifyText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function extractPageText(html) {
    const $ = cheerio.load(html);
    $('script, style, noscript').remove();

    const title = simplifyText($('title').first().text());
    const headings = $('h1, h2, h3').map((_, el) => simplifyText($(el).text())).get().filter(Boolean).slice(0, 12);
    const bodyText = simplifyText($('body').text()).slice(0, 8000);

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

function scoreCandidate(url, anchorText, field) {
    const config = FIELD_CONFIG[field];
    const haystack = `${url} ${anchorText}`.toLowerCase();
    let score = 0;

    for (const keyword of config.keywords) {
        if (haystack.includes(keyword)) score += 2;
    }

    if (haystack.includes('japan')) score += 1;
    if (haystack.includes('international')) score += 1;
    if (haystack.includes('help')) score += 1;
    if (haystack.includes('policy')) score += 1;

    return score;
}

function discoverCandidates(baseUrl, homepageHtml) {
    const $ = cheerio.load(homepageHtml);
    const map = new Map();

    $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        const normalized = normalizeUrl(baseUrl, href);
        if (!normalized) return;

        const text = simplifyText($(el).text());
        if (!map.has(normalized)) {
            map.set(normalized, text);
        }
    });

    return Array.from(map.entries()).map(([url, text]) => ({ url, text }));
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
            docs.push({ url: page.finalUrl, text: page.text.slice(0, 6000) });
        } catch {
            // Ignore failed candidate pages and continue.
        }
        await sleep(250);
    }

    return docs;
}

async function askOpenAI(shop, docsByField) {
    const input = [
        {
            role: 'system',
            content: [
                {
                    type: 'input_text',
                    text: [
                        'You verify ecommerce policy information for a Japanese shopping guide.',
                        'Use only the provided official-page excerpts.',
                        'Never infer unsupported facts.',
                        'If the evidence is weak or the page does not clearly mention Japan, return unknown.',
                        'Write concise Japanese summaries for end users.',
                        'source_url must exactly match one of the provided URLs, or be an empty string when unknown.',
                    ].join(' '),
                },
            ],
        },
        {
            role: 'user',
            content: [
                {
                    type: 'input_text',
                    text: JSON.stringify({
                        shop: {
                            name: shop.name,
                            slug: shop.slug,
                            url: shop.url,
                        },
                        official_docs: docsByField,
                    }),
                },
            ],
        },
    ];

    const response = await axios.post(
        'https://api.openai.com/v1/responses',
        {
            model: OPENAI_MODEL,
            input,
            text: {
                format: {
                    type: 'json_schema',
                    ...RESPONSE_SCHEMA,
                },
            },
        },
        {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            timeout: 60000,
        }
    );

    const outputText =
        response.data.output_text ||
        response.data.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;

    if (!outputText) {
        throw new Error('OpenAI response did not include structured output text.');
    }

    return JSON.parse(outputText);
}

function mapShippingGuide(result) {
    if (result.shipping.status === 'supported') return result.shipping.summary;
    if (result.shipping.status === 'not_supported') return result.shipping.summary;
    if (result.shipping.status === 'restricted') return result.shipping.summary;
    return '';
}

function mapTaxGuide(result) {
    if (result.tax.status === 'unknown') return '';
    return result.tax.summary;
}

function mapFeeGuide(result) {
    if (result.fee.status === 'unknown') return '';
    return result.fee.summary;
}

async function updateShop(shop, result, dryRun) {
    const payload = {
        shipping_guide: mapShippingGuide(result),
        tax_guide: mapTaxGuide(result),
        fee_guide: mapFeeGuide(result),
        shipping_url: result.shipping.source_url || null,
        tax_url: result.tax.source_url || null,
        fee_url: result.fee.source_url || null,
    };

    if (dryRun) {
        return { payload, error: null };
    }

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
        docs_by_field: docsByField,
        ai_result: result,
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

    if (args.slug) {
        query = query.eq('slug', args.slug);
    }

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

    const result = await askOpenAI(shop, docsByField);
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
