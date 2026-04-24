export const SHOP_CATEGORIES = [
    { label: 'すべて', href: '/shops' },
    { label: 'ファッション・スニーカー', href: '/shops?category=' + encodeURIComponent('ファッション・スニーカー') },
    { label: 'スポーツ・アウトドア', href: '/shops?category=' + encodeURIComponent('スポーツ・アウトドア') },
    { label: 'コスメ・ヘルスケア', href: '/shops?category=' + encodeURIComponent('コスメ・ヘルスケア') },
    { label: 'ホーム・ライフスタイル', href: '/shops?category=' + encodeURIComponent('ホーム・ライフスタイル') },
    { label: 'ガジェット・家電', href: '/shops?category=' + encodeURIComponent('ガジェット・家電') },
    { label: '総合・マーケットプレイス', href: '/shops?category=' + encodeURIComponent('総合・マーケットプレイス') },
] as const

export const HOME_CATEGORY_CARDS = [
    { label: 'ファッション・スニーカー', sub: 'ハイブランドから限定スニーカーまで', href: '/shops?category=' + encodeURIComponent('ファッション・スニーカー') },
    { label: 'スポーツ・アウトドア', sub: 'キャンプ・自転車・バイク用品を網羅', href: '/shops?category=' + encodeURIComponent('スポーツ・アウトドア') },
    { label: 'コスメ・ヘルスケア', sub: '美容液からサプリメントまで正規品を', href: '/shops?category=' + encodeURIComponent('コスメ・ヘルスケア') },
    { label: 'ホーム・ライフスタイル', sub: 'インテリア・キッズ・お酒で暮らしを彩る', href: '/shops?category=' + encodeURIComponent('ホーム・ライフスタイル') },
    { label: 'ガジェット・家電', sub: '最先端のデジタル機器を世界から直送', href: '/shops?category=' + encodeURIComponent('ガジェット・家電') },
    { label: '総合・マーケットプレイス', sub: 'Amazon・eBayなど世界最大の品揃え', href: '/shops?category=' + encodeURIComponent('総合・マーケットプレイス') },
] as const

