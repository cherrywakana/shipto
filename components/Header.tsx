'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'ショップ', href: '/shops' },
  { label: 'ブランド', href: '/brands' },
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
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '0 clamp(1.25rem, 5vw, 3rem)',
      height: '62px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
      backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '28px', height: '28px', borderRadius: '7px',
          background: 'var(--accent-brand)', color: '#fafaf9',
          fontSize: '0.75rem', fontWeight: 800, letterSpacing: '-0.03em',
          fontFamily: 'var(--font-sans)',
        }}>OP</span>
        <span style={{
          fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.03em',
          color: '#111110', fontFamily: 'var(--font-sans)',
        }}>Original Price</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Search Icon (Always Visible) */}
        <Link href="/search" aria-label="検索" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '40px', height: '40px', borderRadius: '50%',
          color: '#111110', transition: 'background 0.2s',
          backgroundColor: 'transparent', textDecoration: 'none'
        }} className="search-trigger">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" style={{
              fontSize: '0.875rem', color: '#5a5a58', textDecoration: 'none',
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              padding: '0.4rem 0.75rem', borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
            }}>{link.label}</Link>
          ))}
          <Link href="/articles" className="header-cta" style={{
            marginLeft: '0.5rem',
            fontSize: '0.8rem', fontWeight: 700,
            color: '#fafaf9',
            background: '#111110',
            padding: '0.45rem 1.1rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.01em',
            transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
          }}>記事を読む</Link>
        </nav>

        {/* Hamburger */}
        <button
          aria-label="メニュー"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px' }}
          className="mobile-toggle"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.8px', backgroundColor: '#111110',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? i === 0 ? 'translateY(6.8px) rotate(45deg)' : i === 1 ? 'scaleX(0)' : 'translateY(-6.8px) rotate(-45deg)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '62px', left: 0, right: 0,
          backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem clamp(1.25rem, 5vw, 3rem)',
          display: 'flex', flexDirection: 'column', gap: '0.25rem',
          boxShadow: '0 4px 30px rgba(0,0,0,0.05)'
        }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: '1rem', color: '#111110', textDecoration: 'none', fontWeight: 600,
              fontFamily: 'var(--font-sans)', padding: '0.8rem 0.5rem',
              borderBottom: '1px solid var(--border-soft)',
            }}>{link.label}</Link>
          ))}
          <Link href="/articles" onClick={() => setMenuOpen(false)} style={{
            marginTop: '1rem',
            fontSize: '0.9rem', fontWeight: 700, color: '#fafaf9',
            background: '#111110',
            padding: '1rem 1.5rem', borderRadius: '12px', textAlign: 'center', textDecoration: 'none',
          }}>記事を読む</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        .nav-link:hover { color: #111110 !important; background: rgba(0,0,0,0.04) !important; }
        .search-trigger:hover { background: rgba(0,0,0,0.04) !important; color: #000 !important; }
        .header-cta:hover { background: #2a2a28 !important; transform: translateY(-1px) !important; box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important; }
      `}</style>
    </header>
  )
}
