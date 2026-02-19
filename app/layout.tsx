import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forma — Minimal Product',
  description: 'A new kind of product. Designed for clarity.',
  openGraph: {
    title: 'Forma — Minimal Product',
    description: 'A new kind of product. Designed for clarity.',
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
