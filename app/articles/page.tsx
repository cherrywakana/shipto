import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

export default async function ArticlesPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, thumbnail_url, category, created_at')
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main>
        <style>{`
          .article-card {
            background: rgba(255,255,255,0.85);
            border: 1px solid rgba(0, 180, 216, 0.15);
            border-radius: 16px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: block;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            backdrop-filter: blur(8px);
          }
          .article-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 48px rgba(0, 150, 199, 0.15);
          }
        `}</style>

        {/* Hero */}
        <section style={{
          padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f4fc 60%, #caf0f8 100%)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08 }}>
            <svg viewBox="0 0 1200 300" style={{ width: '100%', position: 'absolute', bottom: 0 }}>
              <path d="M 0 200 Q 200 140 400 200 Q 600 260 800 200 Q 1000 140 1200 200 L 1200 300 L 0 300 Z" fill="#0096C7"/>
            </svg>
          </div>

          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0096C7',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <svg width="28" height="8" viewBox="0 0 28 8" fill="none">
                <path d="M 2 4 Q 7 1 12 4 Q 17 7 22 4 Q 25 2 26 3" stroke="#0096C7" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Articles
            </p>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: '#0A2342',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              海外通販ガイド
            </h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              color: '#2C5F7A',
              lineHeight: 1.8,
            }}>
              初心者向けのガイドから、ブランド別のおすすめショップまで。
            </p>
          </div>
        </section>

        {/* Wave */}
        <div style={{ overflow: 'hidden', lineHeight: 0, background: 'linear-gradient(160deg, #f0f8ff 0%, #caf0f8 100%)' }}>
          <svg viewBox="0 0 1200 60" style={{ display: 'block', width: '100%' }}>
            <path d="M 0 30 Q 150 5 300 30 Q 450 55 600 30 Q 750 5 900 30 Q 1050 55 1200 30 L 1200 60 L 0 60 Z" fill="white"/>
          </svg>
        </div>

        {/* Articles Grid */}
        <section style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'white',
        }}>
          {posts && posts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem',
              maxWidth: '1100px',
              margin: '0 auto',
            }}>
              {posts.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="article-card">
                  {/* Thumbnail */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    backgroundColor: '#e0f4fc',
                    overflow: 'hidden',
                  }}>
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" opacity="0.3">
                          <path d="M 2 10 Q 10 2 18 10 Q 26 18 34 10 Q 37 6 38 8" stroke="#0096C7" strokeWidth="2.5" strokeLinecap="round"/>
                          <path d="M 2 16 Q 10 8 18 16 Q 26 24 34 16 Q 37 12 38 14" stroke="#0096C7" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      {post.category && (
                        <span style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '0.65rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#0096C7',
                          backgroundColor: 'rgba(0, 180, 216, 0.08)',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '2rem',
                          border: '1px solid rgba(0, 180, 216, 0.2)',
                        }}>
                          {post.category}
                        </span>
                      )}
                      {post.created_at && (
                        <span style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '0.7rem',
                          color: '#5A8FA8',
                          letterSpacing: '0.03em',
                        }}>
                          {new Date(post.created_at).toLocaleDateString('ja-JP', {
                            year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    <h2 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                      letterSpacing: '-0.01em',
                      color: '#0A2342',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                    }}>
                      {post.title}
                    </h2>

                    <span style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.78rem',
                      color: '#0096C7',
                      letterSpacing: '0.03em',
                    }}>
                      続きを読む →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              color: '#5A8FA8',
              textAlign: 'center',
            }}>
              記事がまだありません。
            </p>
          )}
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
      </main>
    </>
  )
}