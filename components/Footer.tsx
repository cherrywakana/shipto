'use client'

import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
            background: '#0f172a',
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
            <p style={{ fontSize: '0.75rem', color: '#475569' }}>
                © {new Date().getFullYear()} Direct Found. All rights reserved.
            </p>
        </footer>
    )
}
