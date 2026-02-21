import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShipToJP - 日本から買える海外通販ガイド',
  description: '日本発送対応の海外通販サイトを厳選してご紹介。ブランドから探せて、関税や送料の情報もわかります。',
  openGraph: {
    title: 'ShipToJP - 日本から買える海外通販ガイド',
    description: '日本発送対応の海外通販サイトを厳選してご紹介。ブランドから探せて、関税や送料の情報もわかります。',
    type: 'website',
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