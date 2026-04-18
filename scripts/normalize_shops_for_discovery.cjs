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

function getTaxGuide(shop) {
    if (isMarketplace(shop)) {
        return '出品者や発送元で関税・消費税の扱いが変わりやすいタイプです。購入直前の総額を見ておくと安心です。'
    }

    switch (shop.category) {
        case 'ラグジュアリー・ハイブランド':
            return '高額帯の商品も多いため、受け取り時の追加費用が出るかを見ておきたいショップです。'
        case 'ストリート・スニーカー':
            return '抽選品や限定品では発送元が変わることもあるため、会計時の表示確認が大切です。'
        case '韓国・アジアトレンド':
            return '比較的買いやすい価格帯が多い一方で、注文額しだいで税金の扱いが変わることがあります。'
        case 'コスメ・ビューティー':
            return '化粧品は内容物や配送方法で扱いが変わることがあるため、会計時の表示を確認しておきたいです。'
        case 'スポーツ・アウトドア':
            return '大型商品やブランド制限があると、税金や手数料の見え方が変わることがあります。'
        case '自転車・パーツ':
            return 'パーツや完成車は金額差が大きいため、購入前に総額の見え方を確認しておくと安心です。'
        default:
            return '注文内容や発送元で税金の扱いが変わることがあるため、会計時の表示を見ておくと安心です。'
    }
}

function getFeeGuide(shop) {
    if (isMarketplace(shop)) {
        return '送料は出品者や倉庫の場所で差が出やすいタイプです。商品ごとに確認する前提が合っています。'
    }

    switch (shop.category) {
        case 'ラグジュアリー・ハイブランド':
            return 'エクスプレス配送中心のことが多く、送料は無料条件や注文金額で変わりやすいです。'
        case 'ストリート・スニーカー':
            return '通常配送よりも、抽選商品や限定商品で送料条件が変わりやすいショップです。'
        case '韓国・アジアトレンド':
            return '比較的使いやすい送料設定のことが多いですが、まとめ買いか単品買いかで差が出ます。'
        case 'コスメ・ビューティー':
            return '軽い商品が多い一方で、配送方法や内容物で送料や配送日数がぶれやすいです。'
        case 'スポーツ・アウトドア':
            return 'ギアのサイズや重量で送料差が出やすく、配送日数も商品によってぶれやすいです。'
        case '自転車・パーツ':
            return '小物と大型パーツで送料差が大きく、配送会社によって到着日数も変わりやすいです。'
        default:
            return '送料や配送日数は注文金額や配送方法で差が出やすいショップです。'
    }
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
    if (shop.ships_to_japan === false) {
        return '× 未対応・制限あり'
    }

    if (shop.ships_to_japan === true) {
        return '○ 対応'
    }

    return '△ 要確認'
}

function buildTaxGuide(shop) {
    return getTaxGuide(shop)
}

function buildFeeGuide(shop) {
    return getFeeGuide(shop)
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
