import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Original Price - 海外通販の現地価格をチェック',
  description: '日本発送対応の海外通販サイトを厳選してご紹介。関税や送料を含めた現地価格に近いお得な情報を届けます。',
  metadataBase: new URL('https://original-price.com'),
  openGraph: {
    title: 'Original Price - 海外通販の現地価格をチェック',
    description: '日本発送対応の海外通販サイトを厳選してご紹介。関税や送料を含めた現地価格に近いお得な情報を届けます。',
    type: 'website',
    url: 'https://original-price.com',
    siteName: 'Original Price',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: 'feed.xml', title: 'Direct Found - 最新記事' }],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Script 
          src="https://s.skimresources.com/js/156009X1622316.skimlinks.js" 
          strategy="lazyOnload"
        />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}