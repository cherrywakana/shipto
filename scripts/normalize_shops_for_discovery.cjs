require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const MARKETPLACE_SLUGS = new Set([
    'aliexpress',
    'dhgate',
    'garmentory',
    'goat',
    'pinkoi',
    'stockx',
    'temu',
    'vestiaire-collective',
])

const POLICY_PATH_RE = /(shipping|delivery|returns?|help|support|faq|customer|service|dut(y|ies)|tax|customs|policy|policies|international|global)/i
const NON_POLICY_PATH_RE = /(product|products|collections|search|cart|checkout|item|sku|private|lookbook|blog|privacy|cookie|terms)/i
const HARD_REJECT_PATH_RE = /(privacy|cookie|terms)/i

function isMarketplace(shop) {
    return MARKETPLACE_SLUGS.has(shop.slug)
}

function cleanText(text) {
    return (text || '').replace(/\s+/g, ' ').trim()
}

function getCategory(shop) {
    return cleanText(shop.category) || '海外通販'
}

function normalizePolicyUrl(url) {
    if (!url) return null

    try {
        const parsed = new URL(url)
        const full = `${parsed.hostname}${parsed.pathname}${parsed.search}`.toLowerCase()
        const path = parsed.pathname.toLowerCase()

        if (!/^https?:$/.test(parsed.protocol)) return null
        if (parsed.search.includes('aff_') || parsed.search.includes('utm_')) return null
        if (HARD_REJECT_PATH_RE.test(path)) return null
        if (NON_POLICY_PATH_RE.test(path) && !POLICY_PATH_RE.test(path)) return null
        if (!POLICY_PATH_RE.test(full)) return null

        return parsed.toString()
    } catch {
        return null
    }
}

function buildShippingGuide(shop) {
    const name = shop.name || shop.slug

    if (shop.ships_to_japan === false) {
        return `${name} は日本発送に制限がある可能性があるショップとして掲載しています。配送対象国や対象ブランドは変わることがあるため、購入前に公式サイトをご確認ください。`
    }

    if (isMarketplace(shop)) {
        return `${name} は日本から注文できる候補として掲載しています。マーケットプレイス型のため、発送可否や配送条件は商品や販売元ごとに変わることがあります。`
    }

    return `${name} は日本からチェックしやすい${getCategory(shop)}ショップ候補として掲載しています。最新の配送条件や対象ブランドは公式サイトをご確認ください。`
}

function buildTaxGuide(shop) {
    if (isMarketplace(shop)) {
        return '関税・消費税の扱いは出品者や発送元によって変わることがあります。最終金額はチェックアウト画面と公式ヘルプをご確認ください。'
    }

    return '関税・消費税の扱いは注文金額、発送元、時期によって変わることがあります。最新条件は公式サイトまたはチェックアウト画面でご確認ください。'
}

function buildFeeGuide(shop) {
    if (isMarketplace(shop)) {
        return '送料や配送日数は出品者、倉庫、配送方法によって変わることがあります。商品ページとチェックアウト画面をご確認ください。'
    }

    return '送料や配送日数は注文金額や配送方法で変わります。最新の料金や到着目安は公式サイトをご確認ください。'
}

function buildDescription(shop) {
    const existing = cleanText(shop.description)
    if (existing) return existing

    const country = cleanText(shop.country)
    const prefix = country ? `${country}発の` : ''
    return `${prefix}${getCategory(shop)}ショップとして掲載しています。日本から探しやすい候補をまとめた参考情報です。`
}

async function run() {
    const { data: shops, error } = await supabase
        .from('shops')
        .select('id, slug, name, category, country, ships_to_japan, description, shipping_url, tax_url, fee_url')
        .order('slug')

    if (error) {
        console.error(error.message)
        process.exit(1)
    }

    let updated = 0

    for (const shop of shops) {
        const payload = {
            description: buildDescription(shop),
            shipping_guide: buildShippingGuide(shop),
            tax_guide: buildTaxGuide(shop),
            fee_guide: buildFeeGuide(shop),
            shipping_url: normalizePolicyUrl(shop.shipping_url),
            tax_url: normalizePolicyUrl(shop.tax_url),
            fee_url: normalizePolicyUrl(shop.fee_url),
            updated_at: new Date().toISOString(),
        }

        const { error: updateError } = await supabase
            .from('shops')
            .update(payload)
            .eq('id', shop.id)

        if (updateError) {
            console.error(`Failed: ${shop.slug} - ${updateError.message}`)
            continue
        }

        updated += 1
        console.log(`Updated ${shop.slug}`)
    }

    console.log(`Done. Updated ${updated} shops.`)
}

run().catch((error) => {
    console.error(error)
    process.exit(1)
})
