import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Link from 'next/link'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) return (
    <>
      <Header />
      <main style={{
        padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f4fc 100%)',
        minHeight: '100vh',
      }}>
        <p style={{ fontFamily: 'Georgia, serif', color: '#5A8FA8', marginBottom: '1.5rem' }}>
          記事が見つかりません。
        </p>
        <Link href="/articles" style={{
          fontFamily: 'Georgia, serif',
          fontSize: '0.88rem',
          color: '#0096C7',
          textDecoration: 'none',
        }}>
          ← 記事一覧に戻る
        </Link>
      </main>
    </>
  )

  return (
    <>
      <Header />
      <main style={{ background: 'white' }}>
        <style>{`
          .back-link { color: #0096C7; text-decoration: none; transition: color 0.2s; }
          .back-link:hover { color: #0A2342; }
          .article-body h2 {
            font-family: Georgia, serif;
            font-size: clamp(1.2rem, 2.5vw, 1.5rem);
            letter-spacing: -0.02em;
            color: #0A2342;
            margin: 2.5rem 0 1rem;
            line-height: 1.3;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(0, 180, 216, 0.2);
          }
          .article-body h3 {
            font-family: Georgia, serif;
            font-size: 1.05rem;
            color: #0A2342;
            margin: 2rem 0 0.75rem;
          }
          .article-body p {
            margin-bottom: 1.5rem;
            font-family: Georgia, serif;
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            color: #2C5F7A;
            line-height: 1.9;
          }
          .article-body a {
            color: #0096C7;
            text-underline-offset: 3px;
          }
          .article-body ul, .article-body ol {
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .article-body li {
            font-family: Georgia, serif;
            font-size: 0.95rem;
            color: #2C5F7A;
            line-height: 1.8;
            margin-bottom: 0.4rem;
          }
          .article-body strong { font-weight: bold; color: #0A2342; }
        `}</style>

        {/* Hero */}
        <section style={{
          padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f4fc 60%, #caf0f8 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06 }}>
            <svg viewBox="0 0 1200 300" style={{ width: '100%', position: 'absolute', bottom: 0 }}>
              <path d="M 0 200 Q 200 140 400 200 Q 600 260 800 200 Q 1000 140 1200 200 L 1200 300 L 0 300 Z" fill="#0096C7"/>
            </svg>
          </div>

          <div style={{ position: 'relative', maxWidth: '760px' }}>
            <Link href="/articles" className="back-link" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '2rem',
            }}>
              ← 記事一覧
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {post.category && (
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#0096C7',
                  backgroundColor: 'rgba(0, 180, 216, 0.1)',
                  padding: '0.2rem 0.75rem',
                  borderRadius: '2rem',
                  border: '1px solid rgba(0, 180, 216, 0.25)',
                }}>
                  {post.category}
                </span>
              )}
              {post.created_at && (
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.75rem',
                  color: '#5A8FA8',
                }}>
                  {new Date(post.created_at).toLocaleDateString('ja-JP', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
              color: '#0A2342',
              lineHeight: 1.2,
            }}>
              {post.title}
            </h1>
          </div>
        </section>

        {/* Wave */}
        <div style={{ overflow: 'hidden', lineHeight: 0, background: 'linear-gradient(160deg, #f0f8ff 0%, #caf0f8 100%)' }}>
          <svg viewBox="0 0 1200 60" style={{ display: 'block', width: '100%' }}>
            <path d="M 0 30 Q 150 5 300 30 Q 450 55 600 30 Q 750 5 900 30 Q 1050 55 1200 30 L 1200 60 L 0 60 Z" fill="white"/>
          </svg>
        </div>

        {/* Article content */}
        <section style={{
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {/* Thumbnail */}
            {post.thumbnail_url && (
              <div style={{
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                boxShadow: '0 8px 32px rgba(0, 150, 199, 0.12)',
              }}>
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Body */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer nav */}
            <div style={{
              marginTop: 'clamp(3rem, 6vw, 5rem)',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(0, 180, 216, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <Link href="/articles" className="back-link" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                ← 記事一覧に戻る
              </Link>
              <Link href="/shops" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.85rem',
                color: 'white',
                backgroundColor: '#0096C7',
                padding: '0.6rem 1.5rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }} className="shops-link">
                ショップを探す →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#061829',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: 'white', letterSpacing: '0.05em' }}>
            ShipTo
          </span>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} ShipTo. All rights reserved.
          </p>
        </footer>

        <style>{`.shops-link:hover { background: #0A2342 !important; }`}</style>
      </main>
    </>
  )
}