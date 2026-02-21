'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'ショップ', href: '/shops' },
  { label: '記事', href: '/articles' },
  { label: 'ガイド', href: '/guide' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 clamp(1.5rem, 5vw, 4rem)',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
        <span style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0f172a',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>ShipTo</span>
        <span style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>JP</span>
      </Link>

      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link" style={{
            fontSize: '0.875rem',
            color: '#64748b',
            textDecoration: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}>{link.label}</Link>
        ))}
        <Link href="/articles" className="header-cta" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'white',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          padding: '0.5rem 1.25rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          transition: 'opacity 0.2s, transform 0.2s',
          boxShadow: '0 1px 3px rgba(99,102,241,0.3)',
        }}>記事を読む</Link>
      </nav>

      <button
        aria-label="メニュー"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexDirection: 'column', gap: '5px' }}
        className="mobile-toggle"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: 'block', width: '20px', height: '1.5px', backgroundColor: '#0f172a',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 1 ? 'scaleX(0)' : 'translateY(-6.5px) rotate(-45deg)' : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0,
          backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: '1rem', color: '#334155', textDecoration: 'none', fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}>{link.label}</Link>
          ))}
          <Link href="/articles" onClick={() => setMenuOpen(false)} style={{
            fontSize: '0.9rem', fontWeight: 600, color: 'white',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            padding: '0.75rem 1.5rem', borderRadius: '8px', textAlign: 'center', textDecoration: 'none',
          }}>記事を読む</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        .nav-link:hover { color: #0f172a !important; }
        .header-cta:hover { opacity: 0.9 !important; transform: translateY(-1px) !important; }
      `}</style>
    </header>
  )
}
