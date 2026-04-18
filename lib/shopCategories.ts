export const SHOP_CATEGORIES = [
    { label: 'すべて', href: '/shops' },
    { label: 'ラグジュアリー・ハイブランド', href: '/shops?category=' + encodeURIComponent('ラグジュアリー・ハイブランド') },
    { label: 'ストリート・スニーカー', href: '/shops?category=' + encodeURIComponent('ストリート・スニーカー') },
    { label: 'スポーツ・アウトドア', href: '/shops?category=' + encodeURIComponent('スポーツ・アウトドア') },
    { label: '自転車・パーツ', href: '/shops?category=' + encodeURIComponent('自転車・パーツ') },
    { label: '韓国・アジアトレンド', href: '/shops?category=' + encodeURIComponent('韓国・アジアトレンド') },
    { label: 'コスメ・ビューティー', href: '/shops?category=' + encodeURIComponent('コスメ・ビューティー') },
] as const

export const HOME_CATEGORY_CARDS = [
    { label: 'ストリート・スニーカー', sub: '国内未発売も即購入', href: '/shops?category=' + encodeURIComponent('ストリート・スニーカー') },
    { label: 'ラグジュアリー・ハイブランド', sub: '公式より安く、正規品で', href: '/shops?category=' + encodeURIComponent('ラグジュアリー・ハイブランド') },
    { label: '韓国・アジアトレンド', sub: '世界のセレクトを一気に', href: '/shops?category=' + encodeURIComponent('韓国・アジアトレンド') },
    { label: 'スポーツ・アウトドア', sub: '希少モデルを国内定価以下で', href: '/shops?category=' + encodeURIComponent('スポーツ・アウトドア') },
    { label: 'コスメ・ビューティー', sub: '正規品を最安値で', href: '/shops?category=' + encodeURIComponent('コスメ・ビューティー') },
    { label: '自転車・パーツ', sub: '海外限定パーツも比較しやすく', href: '/shops?category=' + encodeURIComponent('自転車・パーツ') },
] as const
