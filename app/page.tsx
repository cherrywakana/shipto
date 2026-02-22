'use client'

import Header from '@/components/Header'
import Link from 'next/link'

const categories = [
  { label: 'ラグジュアリー・百貨店', icon: '💎', href: '/shops?category=ラグジュアリー・百貨店' },
  { label: 'セレクト・トレンド', icon: '👗', href: '/shops?category=セレクト・トレンド' },
  { label: 'ストリート・スニーカー', icon: '👟', href: '/shops?category=ストリート・スニーカー' },
  { label: 'アウトドア', icon: '🏕️', href: '/shops?category=アウトドア' },
  { label: 'アウトレット・リセール', icon: '🏷️', href: '/shops?category=アウトレット・リセール' },
  { label: 'アジア・トレンド', icon: '🇰🇷', href: '/shops?category=アジア・トレンド' },
]

const stats = [
  { value: '300+', label: 'ショップ掲載数' },
  { value: '1,000+', label: 'ブランド対応' },
  { value: '50+', label: 'ガイド記事' },
]

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .fade-1 { animation: fadeUp 0.7s ease both 0.1s; }
          .fade-2 { animation: fadeUp 0.7s ease both 0.25s; }
          .fade-3 { animation: fadeUp 0.7s ease both 0.4s; }
          .fade-4 { animation: fadeUp 0.7s ease both 0.55s; }

          .cat-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.25rem;
            text-align: center;
            text-decoration: none;
            color: #0f172a;
            display: block;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          }
          .cat-card:hover {
            border-color: #6366f1;
            box-shadow: 0 4px 20px rgba(99,102,241,0.12);
            transform: translateY(-2px);
          }

          .cta-primary {
            display: inline-block;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 0.85rem 2rem;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.2s;
            box-shadow: 0 4px 15px rgba(99,102,241,0.35);
          }
          .cta-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99,102,241,0.4);
          }

          .cta-secondary {
            display: inline-block;
            background: white;
            color: #334155;
            padding: 0.85rem 2rem;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
          }
          .cta-secondary:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            transform: translateY(-1px);
          }

          .articles-cta-btn {
            display: inline-block;
            background: white;
            color: #6366f1;
            padding: 0.85rem 2rem;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.2s;
          }
          .articles-cta-btn:hover {
            background: rgba(255,255,255,0.9);
            transform: translateY(-1px);
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
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 40%, #ede9fe 100%)',
        }}>
          {/* Background blobs */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', top: '10%', right: '-5%',
              width: '600px', height: '600px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', bottom: '0%', left: '-10%',
              width: '500px', height: '500px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
              animation: 'float 10s ease-in-out infinite 2s',
            }}/>
            <div style={{
              position: 'absolute', top: '30%', right: '15%',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
              animation: 'float 6s ease-in-out infinite 1s',
            }}/>
          </div>

          <div style={{ position: 'relative', maxWidth: '760px' }}>
            {/* Badge */}
            <div className="fade-1" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '100px', padding: '0.35rem 1rem',
              marginBottom: '1.75rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'block' }}/>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6366f1', letterSpacing: '0.02em' }}>
                日本から買える海外通販ガイド
              </span>
            </div>

            <h1 className="fade-2" style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              color: '#0f172a',
              marginBottom: '1.5rem',
            }}>
              世界中のショッピングを、<br />
              <span style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                日本から。
              </span>
            </h1>

            <p className="fade-3" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: '#64748b',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: '48ch',
              fontWeight: 400,
            }}>
              日本発送対応の海外通販サイトを厳選してご紹介。
              ブランドから探せて、関税や送料の情報もわかります。
            </p>

            <div className="fade-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/shops" className="cta-primary">ショップを探す →</Link>
              <Link href="/articles" className="cta-secondary">ガイドを読む</Link>
            </div>

            {/* Stats */}
            <div className="fade-4" style={{
              display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap',
            }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem', fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Categories ---- */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#f8fafc',
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={{
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#6366f1', marginBottom: '0.75rem',
              }}>カテゴリ</p>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800,
                letterSpacing: '-0.03em', color: '#0f172a',
              }}>何をお探しですか？</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
              gap: '1rem',
            }}>
              {categories.map((cat) => (
                <Link key={cat.label} href={cat.href} className="cat-card">
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{cat.icon}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{cat.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Features ---- */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'white',
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={{
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#6366f1', marginBottom: '0.75rem',
              }}>特徴</p>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800,
                letterSpacing: '-0.03em', color: '#0f172a',
              }}>安心して海外通販を。</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
            }}>
              {[
                { icon: '🚢', title: '日本発送対応ショップのみ', body: '日本への発送に対応しているショップだけを厳選。安心して購入できます。' },
                { icon: '📦', title: '関税・送料も丸わかり', body: '初めての方でも安心。関税や送料の仕組みをわかりやすく解説しています。' },
                { icon: '🔍', title: 'ブランドから探せる', body: '欲しいブランドがどのショップで買えるかを一発で検索できます。' },
              ].map((f) => (
                <div key={f.title} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 700, color: '#0f172a',
                    marginBottom: '0.6rem', letterSpacing: '-0.01em',
                  }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.75 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Articles CTA ---- */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', top: '-30%', right: '-10%',
              width: '500px', height: '500px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-20%', left: '-5%',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
            }}/>
          </div>

          <div style={{ position: 'relative' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem',
            }}>ガイド記事</p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800,
              color: 'white', letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.2,
            }}>海外通販、はじめてみませんか。</h2>
            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.8, marginBottom: '2.5rem',
              maxWidth: '42ch', margin: '0 auto 2.5rem',
            }}>
              関税・送料・おすすめショップまで。初心者向けのガイドを揃えています。
            </p>
            <Link href="/articles" className="articles-cta-btn">記事を読む →</Link>
          </div>
        </section>

        {/* ---- Footer ---- */}
        <footer style={{
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#0f172a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>ShipTo</span>
            <span style={{
              fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>JP</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#475569' }}>
            © {new Date().getFullYear()} ShipToJP. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  )
}
