type ShopDetailRecord = {
    slug?: string | null
    name?: string | null
    category?: string | null
    country?: string | null
    url?: string | null
    description?: string | null
    is_affiliate?: boolean | null
    ships_to_japan?: boolean | null
    shipping_guide?: string | null
    tax_guide?: string | null
    fee_guide?: string | null
    shipping_url?: string | null
    tax_url?: string | null
    fee_url?: string | null
}

type OfficialLink = {
    label: string
    href: string
    description: string
}

type ReferenceNote = {
    label: string
    body: string
}

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

function cleanText(text: string | null | undefined): string {
    return text?.replace(/\s+/g, ' ').trim() || ''
}

function excerpt(text: string | null | undefined, maxLength = 88): string {
    const normalized = cleanText(text)
    if (!normalized) return ''
    if (normalized.length <= maxLength) return normalized
    return `${normalized.slice(0, maxLength - 1).trim()}…`
}

function isMarketplace(shop: ShopDetailRecord): boolean {
    return MARKETPLACE_SLUGS.has(shop.slug || '')
}

function getCategoryLabel(shop: ShopDetailRecord): string {
    return shop.category || '海外通販'
}

export function getShopLead(shop: ShopDetailRecord): string {
    if (shop.description) return shop.description

    const country = shop.country ? `${shop.country}発の` : ''
    return `${country}${getCategoryLabel(shop)}ショップとして掲載しています。日本から探しやすい候補をまとめた参考ページです。`
}

export function getShopTakeaways(shop: ShopDetailRecord): string[] {
    const bullets = [
        `${shop.country || '海外'}発の${getCategoryLabel(shop)}ショップです。`,
    ]

    if (shop.ships_to_japan === false) {
        bullets.push('日本発送は制限の可能性があるため、配送対象国と対象ブランドの確認が必要です。')
    } else {
        bullets.push('日本から注文先候補としてチェックしやすいショップです。')
    }

    if (isMarketplace(shop)) {
        bullets.push('出品者や取扱店舗ごとに条件が変わる場合があるため、商品ページごとの確認が大切です。')
    } else if (shop.is_affiliate) {
        bullets.push('当サイトから公式サイトへ移動して、そのまま詳細を確認できます。')
    } else {
        bullets.push('最新条件は公式サイトのヘルプやチェックアウト画面で確認する前提でご利用ください。')
    }

    return bullets
}

export function getReferenceNotes(shop: ShopDetailRecord): ReferenceNote[] {
    const shippingFallback = shop.ships_to_japan === false
        ? '日本発送は制限の可能性があります。購入前に公式サイトで配送対象国をご確認ください。'
        : '日本向け注文の導線があるショップ候補として掲載しています。最新の配送条件は公式サイトでご確認ください。'

    const taxFallback = isMarketplace(shop)
        ? '関税や消費税の扱いは出品者や発送元で変わることがあります。最終金額はチェックアウト画面をご確認ください。'
        : '関税や消費税の扱いは注文内容や発送元で変わることがあります。最新条件は公式サイトをご確認ください。'

    const feeFallback = isMarketplace(shop)
        ? '送料は出品者や倉庫の場所で変わることがあります。商品ページとチェックアウト画面をご確認ください。'
        : '送料や配送日数は注文金額や配送方法で変わります。最新の料金は公式サイトをご確認ください。'

    return [
        { label: '日本発送', body: excerpt(shop.shipping_guide, 92) || shippingFallback },
        { label: '関税・消費税', body: excerpt(shop.tax_guide, 92) || taxFallback },
        { label: '送料・配送', body: excerpt(shop.fee_guide, 92) || feeFallback },
    ]
}

export function getShopChecklist(shop: ShopDetailRecord): string[] {
    const bullets = [
        '配送先を Japan に設定した状態で、欲しいブランドや商品が注文対象かを確認する。',
        '関税・送料・配送日数はチェックアウト画面で最終確認する。',
        '返品条件やキャンセル可否は購入前に公式ヘルプを見る。',
    ]

    if (isMarketplace(shop)) {
        bullets[0] = '商品ページごとに発送可否や販売元を確認する。'
    }

    if (shop.ships_to_japan === false) {
        bullets[0] = '配送対象国と発送制限の有無を最優先で確認する。'
    }

    return bullets
}

export function getOfficialLinks(shop: ShopDetailRecord): OfficialLink[] {
    const entries: OfficialLink[] = []
    const seen = new Set<string>()

    const pushLink = (label: string, href: string | null | undefined, description: string) => {
        if (!href || seen.has(href)) return
        seen.add(href)
        entries.push({ label, href, description })
    }

    pushLink('公式サイト', shop.url, '商品一覧や最新の販売条件を確認する入口です。')
    pushLink('配送案内', shop.shipping_url, '日本発送の可否や配送対象国を確認したいときに。')
    pushLink('税金・関税', shop.tax_url, '関税や消費税の扱いを確認したいときに。')
    pushLink('送料案内', shop.fee_url, '送料や配送方法の案内がある場合に。')

    return entries
}
