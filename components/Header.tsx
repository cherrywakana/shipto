'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'ショップ一覧', href: '/shops' },
  { label: '記事', href: '/articles' },
  { label: '使い方', href: '/guide' },
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
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: scrolled ? 'rgba(240, 248, 255, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0, 180, 216, 0.15)' : '1px solid transparent',
      transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
      }}>
        {/* Wave mark */}
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
          <path d="M 2 8 Q 7 2 12 8 Q 17 14 22 8 Q 25 4 26 6" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M 2 13 Q 7 7 12 13 Q 17 19 22 13 Q 25 9 26 11" stroke="#0096C7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
        </svg>
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.2rem',
          letterSpacing: '0.05em',
          color: '#0A2342',
          fontWeight: 'normal',
        }}>
          ShipTo
        </span>
      </Link>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link" style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.85rem',
            color: '#2C5F7A',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'color 0.2s',
          }}>
            {link.label}
          </Link>
        ))}
        <Link href="/articles" style={{
          fontFamily: 'Georgia, serif',
          fontSize: '0.82rem',
          color: '#ffffff',
          backgroundColor: '#0096C7',
          padding: '0.5rem 1.25rem',
          borderRadius: '2rem',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          transition: 'background-color 0.2s',
        }} className="cta-btn">
          記事を読む
        </Link>
      </nav>

      {/* Mobile toggle */}
      <button
        aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          flexDirection: 'column',
          gap: '5px',
        }}
        className="mobile-toggle"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            backgroundColor: '#0A2342',
            transition: 'transform 0.3s ease, opacity 0.3s',
            transform: menuOpen
              ? i === 0 ? 'translateY(6px) rotate(45deg)'
              : i === 1 ? 'scaleX(0)'
              : 'translateY(-6px) rotate(-45deg)'
              : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(240, 248, 255, 0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0, 180, 216, 0.15)',
          padding: '2rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              color: '#2C5F7A',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/articles" onClick={() => setMenuOpen(false)} style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.9rem',
            color: '#ffffff',
            backgroundColor: '#0096C7',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            textAlign: 'center',
            textDecoration: 'none',
            marginTop: '0.5rem',
          }}>
            記事を読む
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        .nav-link:hover { color: #00B4D8 !important; }
        .cta-btn:hover { background-color: #0A2342 !important; }
      `}</style>
    </header>
  )
}