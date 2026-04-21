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

function getTaxFallback(shop: ShopDetailRecord): string {
    if (isMarketplace(shop)) {
        return '出品者や発送元で扱いが変わりやすいタイプです。購入直前の総額を見ておくと安心です。'
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

function getFeeFallback(shop: ShopDetailRecord): string {
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

export function getShopLead(shop: ShopDetailRecord): string {
    return shop.description || ''
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
        ? '× 未対応・制限あり'
        : shop.ships_to_japan === true
            ? '○ 対応'
            : '△ 要確認'

    return [
        { label: '日本発送', body: shippingFallback },
        { label: '関税・消費税', body: excerpt(shop.tax_guide, 92) || getTaxFallback(shop) },
        { label: '送料・配送', body: excerpt(shop.fee_guide, 92) || getFeeFallback(shop) },
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
