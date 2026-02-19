'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
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
    <header
      style={{
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
        backgroundColor: scrolled ? 'rgba(245,245,240,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--gray-100)' : '1px solid transparent',
        transition: 'background-color 0.4s var(--ease-out), border-color 0.4s var(--ease-out), backdrop-filter 0.4s',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          letterSpacing: '-0.03em',
          color: 'var(--black)',
        }}
      >
        Forma
      </a>

      {/* Desktop nav */}
      <nav
        aria-label="Primary"
        style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gray-700)',
              position: 'relative',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = 'var(--black)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = 'var(--gray-700)'
            }}
          >
            {link.label}
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: 'var(--black)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s var(--ease-out)',
              }}
              className="nav-underline"
            />
          </a>
        ))}

        <a
          href="#pricing"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--white)',
            backgroundColor: 'var(--black)',
            padding: '0.55rem 1.25rem',
            border: '1px solid var(--black)',
            transition: 'background-color 0.25s, color 0.25s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.backgroundColor = 'var(--white)'
            el.style.color = 'var(--black)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.backgroundColor = 'var(--black)'
            el.style.color = 'var(--white)'
          }}
        >
          Get Started
        </a>
      </nav>

      {/* Mobile menu toggle */}
      <button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
          <span
            key={i}
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              backgroundColor: 'var(--black)',
              transition: 'transform 0.3s var(--ease-out), opacity 0.3s',
              transform:
                menuOpen
                  ? i === 0
                    ? 'translateY(6px) rotate(45deg)'
                    : i === 1
                    ? 'scaleX(0)'
                    : 'translateY(-6px) rotate(-45deg)'
                  : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--white)',
            borderBottom: '1px solid var(--gray-100)',
            padding: '2rem clamp(1.5rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--gray-700)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              backgroundColor: 'var(--black)',
              padding: '0.75rem 1.5rem',
              textAlign: 'center',
              marginTop: '0.5rem',
            }}
          >
            Get Started
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        a:hover .nav-underline {
          transform: scaleX(1) !important;
        }
      `}</style>
    </header>
  )
}
