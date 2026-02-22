export const dynamic = 'force-dynamic'

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
      <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <style>{`
          .article-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: block;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          }
          .article-card:hover {
            border-color: #6366f1;
            box-shadow: 0 8px 30px rgba(99,102,241,0.12);
            transform: translateY(-3px);
          }
          .article-card:hover img {
            transform: scale(1.03);
          }
        `}</style>

        {/* Hero */}
        <section style={{
          padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 40%, #ede9fe 100%)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#6366f1', marginBottom: '0.75rem',
          }}>Articles</p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
            letterSpacing: '-0.03em', color: '#0f172a', lineHeight: 1.1, marginBottom: '1rem',
          }}>海外通販ガイド</h1>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.75 }}>
            初心者向けのガイドから、ブランド別のおすすめショップまで。
          </p>
        </section>

        {/* Articles Grid */}
        <section style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#f8fafc',
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
                  <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                    {post.thumbnail_url ? (
                      <img src={post.thumbnail_url} alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}/>
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2rem' }}>📦</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      {post.category && (
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em',
                          color: '#6366f1', background: 'rgba(99,102,241,0.08)',
                          padding: '0.2rem 0.65rem', borderRadius: '100px',
                          border: '1px solid rgba(99,102,241,0.15)',
                        }}>{post.category}</span>
                      )}
                      {post.created_at && (
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {new Date(post.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <h2 style={{
                      fontSize: '1rem', fontWeight: 700, color: '#0f172a',
                      lineHeight: 1.5, marginBottom: '1rem', letterSpacing: '-0.01em',
                    }}>{post.title}</h2>
                    <span style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 600 }}>続きを読む →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.95rem' }}>記事がまだありません。</p>
          )}
        </section>

        {/* Footer */}
        <footer style={{
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#0f172a',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>ShipTo</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>JP</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#475569' }}>© {new Date().getFullYear()} ShipToJP. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}