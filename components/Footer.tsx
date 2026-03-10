'use client'

import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
            background: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Direct</span>
                    <span style={{
                        fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Found</span>
                </Link>
                <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <Link href="/about" style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>運営者情報</Link>
                    <Link href="/privacy" style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>プライバシーポリシー</Link>
                </nav>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#475569' }}>
                    © {new Date().getFullYear()} Direct Found. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
