import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Direct Found - 日本から買える海外通販ガイド',
  description: '日本発送対応の海外通販サイトを厳選してご紹介。ブランドから探せて、関税や送料の情報もわかります。',
  metadataBase: new URL('https://directfound.com'),
  openGraph: {
    title: 'Direct Found - 日本から買える海外通販ガイド',
    description: '日本発送対応の海外通販サイトを厳選してご紹介。ブランドから探せて、関税や送料の情報もわかります。',
    type: 'website',
    url: 'https://directfound.com',
    siteName: 'Direct Found',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
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
      </body>
    </html>
  )
}