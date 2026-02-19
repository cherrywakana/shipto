'use client'

import Header from '@/components/Header'
import Link from 'next/link'

const categories = [
  { label: 'ファッション', icon: '👗', count: '120+ショップ' },
  { label: 'コスメ・美容', icon: '💄', count: '80+ショップ' },
  { label: '電化製品', icon: '📱', count: '60+ショップ' },
  { label: 'インテリア', icon: '🏠', count: '50+ショップ' },
  { label: 'スポーツ', icon: '🏃', count: '40+ショップ' },
  { label: '食品・お酒', icon: '🍷', count: '30+ショップ' },
]

const features = [
  {
    title: '日本発送対応',
    body: '日本への発送に対応しているショップだけを厳選。安心して購入できます。',
    icon: '🚢',
  },
  {
    title: '関税・送料を解説',
    body: '初めての方でも安心。関税や送料の仕組みをわかりやすく解説しています。',
    icon: '📦',
  },
  {
    title: 'ブランドから探せる',
    body: '欲しいブランドがどのショップで買えるかを一発で検索できます。',
    icon: '🔍',
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <style>{`
          :root {
            --ocean-deep: #0A2342;
            --ocean-mid: #0096C7;
            --ocean-light: #00B4D8;
            --ocean-pale: #90E0EF;
            --ocean-foam: #CAF0F8;
            --sky: #F0F8FF;
            --text-dark: #0A2342;
            --text-mid: #2C5F7A;
            --text-light: #5A8FA8;
          }

          @keyframes waveFloat {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-8px) translateX(4px); }
            66% { transform: translateY(4px) translateX(-4px); }
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes drawWave {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
          }

          .hero-wave { animation: waveFloat 8s ease-in-out infinite; }
          .fade-up-1 { animation: fadeUp 0.8s ease both 0.1s; }
          .fade-up-2 { animation: fadeUp 0.8s ease both 0.3s; }
          .fade-up-3 { animation: fadeUp 0.8s ease both 0.5s; }
          .fade-up-4 { animation: fadeUp 0.8s ease both 0.7s; }

          .category-card {
            background: rgba(255,255,255,0.7);
            border: 1px solid rgba(0, 180, 216, 0.2);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            text-decoration: none;
            color: var(--text-dark);
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            backdrop-filter: blur(8px);
          }
          .category-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 150, 199, 0.15);
            background: rgba(255,255,255,0.95);
          }

          .feature-card {
            background: rgba(255,255,255,0.6);
            border: 1px solid rgba(0, 180, 216, 0.15);
            border-radius: 20px;
            padding: clamp(1.5rem, 3vw, 2.5rem);
            backdrop-filter: blur(8px);
          }

          .cta-primary {
            background: var(--ocean-mid);
            color: white;
            padding: 0.9rem 2.5rem;
            border-radius: 3rem;
            text-decoration: none;
            font-family: Georgia, serif;
            font-size: 0.95rem;
            letter-spacing: 0.03em;
            transition: background 0.2s, transform 0.2s;
            display: inline-block;
          }
          .cta-primary:hover {
            background: var(--ocean-deep);
            transform: translateY(-2px);
          }

          .cta-secondary {
            color: var(--ocean-mid);
            padding: 0.9rem 2rem;
            border-radius: 3rem;
            border: 1.5px solid var(--ocean-pale);
            text-decoration: none;
            font-family: Georgia, serif;
            font-size: 0.95rem;
            letter-spacing: 0.03em;
            transition: border-color 0.2s, color 0.2s;
            display: inline-block;
          }
          .cta-secondary:hover {
            border-color: var(--ocean-mid);
            color: var(--ocean-deep);
          }
        `}</style>

        {/* ---- Hero ---- */}
        <section style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(8rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f4fc 40%, #caf0f8 100%)',
        }}>
          {/* Decorative waves in background */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <svg
              viewBox="0 0 1200 600"
              style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '110%',
                opacity: 0.12,
              }}
              className="hero-wave"
            >
              <path d="M 0 300 Q 150 200 300 300 Q 450 400 600 300 Q 750 200 900 300 Q 1050 400 1200 300 L 1200 600 L 0 600 Z" fill="#0096C7"/>
              <path d="M 0 350 Q 200 250 400 350 Q 600 450 800 350 Q 1000 250 1200 350 L 1200 600 L 0 600 Z" fill="#00B4D8"/>
              <path d="M 0 400 Q 250 320 500 400 Q 750 480 1000 400 Q 1100 360 1200 380 L 1200 600 L 0 600 Z" fill="#48CAE4"/>
            </svg>

            {/* Floating circles */}
            <div style={{
              position: 'absolute',
              top: '15%',
              right: '8%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)',
            }}/>
            <div style={{
              position: 'absolute',
              top: '40%',
              right: '20%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '1px solid rgba(0,180,216,0.15)',
            }}/>
            <div style={{
              position: 'absolute',
              top: '25%',
              right: '15%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '1px solid rgba(0,180,216,0.2)',
            }}/>
          </div>

          <div style={{ position: 'relative', maxWidth: '700px' }}>
            <p className="fade-up-1" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ocean-mid)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
                <path d="M 2 5 Q 8 1 14 5 Q 20 9 26 5 Q 29 3 30 4" stroke="#0096C7" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
              海外通販ガイド
            </p>

            <h1 className="fade-up-2" style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ocean-deep)',
              marginBottom: '1.75rem',
            }}>
              世界中の
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--ocean-mid)' }}>ショッピング</em>を、
              <br />
              日本から。
            </h1>

            <p className="fade-up-3" style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'var(--text-mid)',
              lineHeight: 1.85,
              marginBottom: '2.5rem',
              maxWidth: '42ch',
            }}>
              日本発送対応の海外通販サイトをまとめてご紹介。
              ブランドから探せて、関税や送料の情報もわかります。
            </p>

            <div className="fade-up-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/shops" className="cta-primary">
                ショップを探す
              </Link>
              <Link href="/articles" className="cta-secondary">
                ガイドを読む
              </Link>
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <div style={{ overflow: 'hidden', lineHeight: 0, background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f4fc 100%)' }}>
          <svg viewBox="0 0 1200 80" style={{ display: 'block', width: '100%' }}>
            <path d="M 0 40 Q 150 10 300 40 Q 450 70 600 40 Q 750 10 900 40 Q 1050 70 1200 40 L 1200 80 L 0 80 Z" fill="white"/>
          </svg>
        </div>

        {/* ---- Categories ---- */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'white',
        }}>
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ocean-light)',
              marginBottom: '0.75rem',
            }}>
              カテゴリから探す
            </p>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              letterSpacing: '-0.02em',
              color: 'var(--ocean-deep)',
              lineHeight: 1.2,
            }}>
              何をお探しですか？
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
            gap: '1rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {categories.map((cat) => (
              <Link key={cat.label} href={`/shops?category=${cat.label}`} className="category-card">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.9rem',
                  color: 'var(--ocean-deep)',
                  marginBottom: '0.25rem',
                }}>
                  {cat.label}
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.7rem',
                  color: 'var(--text-light)',
                  letterSpacing: '0.05em',
                }}>
                  {cat.count}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Wave divider */}
        <div style={{ overflow: 'hidden', lineHeight: 0, background: 'white' }}>
          <svg viewBox="0 0 1200 80" style={{ display: 'block', width: '100%' }}>
            <path d="M 0 40 Q 200 70 400 40 Q 600 10 800 40 Q 1000 70 1200 40 L 1200 80 L 0 80 Z" fill="#f0f8ff"/>
          </svg>
        </div>

        {/* ---- Features ---- */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'linear-gradient(180deg, #f0f8ff 0%, #e8f4fb 100%)',
        }}>
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ocean-light)',
              marginBottom: '0.75rem',
            }}>
              ShipToの特徴
            </p>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              letterSpacing: '-0.02em',
              color: 'var(--ocean-deep)',
            }}>
              安心して海外通販を。
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.1rem',
                  color: 'var(--ocean-deep)',
                  marginBottom: '0.6rem',
                  letterSpacing: '-0.01em',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.88rem',
                  color: 'var(--text-mid)',
                  lineHeight: 1.8,
                }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Articles CTA ---- */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'var(--ocean-deep)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Background waves */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}>
            <svg viewBox="0 0 1200 300" style={{ width: '100%', height: '100%' }}>
              <path d="M 0 150 Q 200 80 400 150 Q 600 220 800 150 Q 1000 80 1200 150 L 1200 300 L 0 300 Z" fill="#00B4D8"/>
              <path d="M 0 180 Q 250 110 500 180 Q 750 250 1000 180 Q 1100 155 1200 165 L 1200 300 L 0 300 Z" fill="#48CAE4"/>
            </svg>
          </div>

          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ocean-pale)',
              marginBottom: '1rem',
            }}>
              ガイド記事
            </p>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'white',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}>
              海外通販、はじめてみませんか。
            </h2>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              color: 'var(--ocean-pale)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '42ch',
              margin: '0 auto 2.5rem',
            }}>
              関税のこと、送料のこと、おすすめショップまで。
              初心者向けのガイド記事を揃えています。
            </p>
            <Link href="/articles" style={{
              background: 'white',
              color: 'var(--ocean-deep)',
              padding: '0.9rem 2.5rem',
              borderRadius: '3rem',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              display: 'inline-block',
              transition: 'background 0.2s, transform 0.2s',
            }} className="articles-cta">
              記事を読む →
            </Link>
          </div>
        </section>

        {/* ---- Footer ---- */}
        <footer style={{
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#061829',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="24" height="16" viewBox="0 0 28 20" fill="none">
              <path d="M 2 8 Q 7 2 12 8 Q 17 14 22 8 Q 25 4 26 6" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M 2 13 Q 7 7 12 13 Q 17 19 22 13 Q 25 9 26 11" stroke="#0096C7" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            </svg>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              color: 'white',
              letterSpacing: '0.05em',
            }}>
              ShipTo
            </span>
          </div>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.35)',
          }}>
            © {new Date().getFullYear()} ShipTo. All rights reserved.
          </p>
        </footer>

        <style>{`
          .articles-cta:hover {
            background: var(--ocean-foam) !important;
            transform: translateY(-2px) !important;
          }
        `}</style>
      </main>
    </>
  )
}