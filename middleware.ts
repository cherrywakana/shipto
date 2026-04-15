import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// CSVから抽出したインデックス済みURLのパス一覧
const INDEXED_PATHS = new Set([
  '/',
  '/articles',
  '/articles/patagonia-overseas-shopping-guide',
  '/articles/adidas-overseas-shopping-guide',
  '/articles/loewe-overseas-shopping-guide',
  '/articles/nike-overseas-shopping-guide',
  '/articles/new-balance-overseas-shopping-guide',
  '/articles/arcteryx-overseas-shopping-guide',
  '/articles/the-north-face-overseas-shopping-guide',
  '/articles/overseas-shopping-ddp-ddu',
  '/shops/hififnk',
  '/shops/playful',
  '/shops/patta',
  '/shops/triads',
  '/shops/daniello',
  '/shops/saks-fifth-avenue',
  '/shops/the-outnet',
  '/shops/ssense',
  '/shops/naked-cph',
  '/shops/farfetch',
  '/brands/golden-goose',
  '/brands/stussy',
])

// 旧サイトの特定パスを新サイトの正規記事パスへリダイレクトするマップ
const REDIRECT_MAP: Record<string, string> = {
  '/outdoorbrand/patagonia/shoplist': '/articles/patagonia-overseas-shopping-guide',
  '/fashionbrand/adidas/adidas-list': '/articles/adidas-overseas-shopping-guide',
  '/fashionbrand/nike/nikelist': '/articles/nike-overseas-shopping-guide',
  '/fashionbrand/newbalance/shoplist-2': '/articles/new-balance-overseas-shopping-guide',
  '/outdoorbrand/arcteryx/bestshop-6': '/articles/arcteryx-overseas-shopping-guide',
  '/outdoorbrand/thenorthface/bestshop-7': '/articles/the-north-face-overseas-shopping-guide',
  '/overseasshop/tax': '/articles/overseas-shopping-customs-tax',
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').toLowerCase()
  const { pathname } = request.nextUrl

  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname

  // デバッグ用レスポンスヘッダーの設定
  const logInfo = `Host: ${host}, Path: ${normalizedPath}`;

  // 特定パスのリダイレクト判定 (新旧ドメイン共通)
  if (REDIRECT_MAP[normalizedPath]) {
    const url = request.nextUrl.clone()
    url.host = 'original-price.com'
    url.pathname = REDIRECT_MAP[normalizedPath]
    url.protocol = 'https:'
    url.port = ''
    
    const res = NextResponse.redirect(url, 301)
    res.headers.set('x-middleware-debug', `REDIRECT_MAP: ${logInfo} -> ${REDIRECT_MAP[normalizedPath]}`)
    return res
  }
  
  // 旧ドメイン判定
  if (host.includes('directfound.com')) {
    if (INDEXED_PATHS.has(normalizedPath)) {
      const url = request.nextUrl.clone()
      url.host = 'original-price.com'
      url.protocol = 'https:'
      url.port = ''
      
      const res = NextResponse.redirect(url, 301)
      res.headers.set('x-middleware-debug', `REDIRECT: ${logInfo}`)
      return res
    }

    const res = new NextResponse('Not Found on directfound.com', { status: 404 })
    res.headers.set('x-middleware-debug', `404: ${logInfo}`)
    return res
  }

  // 通常処理（新ドメイン等）にデバッグヘッダーを付けて返す
  const response = NextResponse.next()
  response.headers.set('x-middleware-debug', `PASSTHROUGH: ${logInfo}`)
  return response
}

export const config = {
  matcher: [
    // すべてのパス（静的ファイル以外）を対象にするシンプルな設定
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
