import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, thumbnail_url, category, created_at')
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main style={{ padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)' }}>
        <style>{`
          .post-card { background-color: var(--white); transition: background-color 0.2s; }
          .post-card:hover { background-color: #f5f5f5; }
        `}</style>

        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', borderBottom: '1px solid var(--gray-100)', paddingBottom: '2rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gray-500)',
            marginBottom: '1rem',
          }}>
            Journal
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--black)',
            lineHeight: 1.05,
          }}>
            海外通販ガイド
          </h1>
        </div>

        {posts && posts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1px',
            backgroundColor: 'var(--gray-100)',
            border: '1px solid var(--gray-100)',
          }}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="post-card"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  backgroundColor: 'var(--gray-100)',
                  overflow: 'hidden',
                }}>
                  {post.thumbnail_url ? (
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--gray-500)',
                      }}>
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    {post.category && (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--white)',
                        backgroundColor: 'var(--black)',
                        padding: '0.2rem 0.6rem',
                      }}>
                        {post.category}
                      </span>
                    )}
                    {post.created_at && (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--gray-500)',
                        letterSpacing: '0.05em',
                      }}>
                        {new Date(post.created_at).toLocaleDateString('ja-JP', {
                          year: 'numeric', month: '2-digit', day: '2-digit',
                        })}
                      </span>
                    )}
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--black)',
                    lineHeight: 1.4,
                    marginBottom: '1rem',
                  }}>
                    {post.title}
                  </h2>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--gray-500)',
                  }}>
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
            記事がまだありません。
          </p>
        )}
      </main>
    </>
  )
}