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
      <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)', minHeight: '100vh', background: '#f8fafc' }}>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>記事が見つかりません。</p>
        <Link href="/articles" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>← 記事一覧に戻る</Link>
      </main>
    </>
  )

  return (
    <>
      <Header />
      <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: 'white' }}>
        <style>{`
          .back-link { color: #6366f1; text-decoration: none; font-weight: 500; font-size: 0.875rem; transition: opacity 0.2s; }
          .back-link:hover { opacity: 0.7; }
          .shops-btn { display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 0.6rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.875rem; transition: all 0.2s; box-shadow: 0 2px 8px rgba(99,102,241,0.3); }
          .shops-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(99,102,241,0.4); }

          .article-body h2 {
            font-size: clamp(1.2rem, 2.5vw, 1.5rem);
            font-weight: 700;
            color: #0f172a;
            margin: 2.5rem 0 1rem;
            line-height: 1.3;
            letter-spacing: -0.02em;
          }
          .article-body h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: #1e293b;
            margin: 2rem 0 0.75rem;
          }
          .article-body p {
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            color: #334155;
            line-height: 1.9;
            margin-bottom: 1.5rem;
          }
          .article-body a { color: #6366f1; text-underline-offset: 3px; }
          .article-body ul, .article-body ol { padding-left: 1.5rem; margin-bottom: 1.5rem; }
          .article-body li { font-size: 0.95rem; color: #334155; line-height: 1.8; margin-bottom: 0.4rem; }
          .article-body strong { font-weight: 700; color: #0f172a; }

          /* CTAボックス - ここを変えると全記事に反映される */
          .article-cta {
            margin: 2.5rem 0;
            padding: 2rem;
            background: #f8f7ff;
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(99,102,241,0.15);
          }
          .article-cta p {
            font-size: 1rem !important;
            color: #334155 !important;
            margin-bottom: 1.25rem !important;
            font-weight: 500;
          }
          .article-cta-btn {
            display: inline-block;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white !important;
            padding: 0.85rem 2.5rem;
            border-radius: 8px;
            text-decoration: none !important;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.2s;
            box-shadow: 0 4px 15px rgba(99,102,241,0.3);
          }
          .article-cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99,102,241,0.4);
          }
        `}</style>

        {/* Hero */}
        <section style={{
          padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 40%, #ede9fe 100%)',
        }}>
          <div style={{ maxWidth: '760px' }}>
            <Link href="/articles" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem' }}>← 記事一覧</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {post.category && (
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, color: '#6366f1',
                  background: 'rgba(99,102,241,0.08)', padding: '0.2rem 0.75rem',
                  borderRadius: '100px', border: '1px solid rgba(99,102,241,0.15)',
                }}>{post.category}</span>
              )}
              {post.created_at && (
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {new Date(post.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </div>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.03em', color: '#0f172a', lineHeight: 1.2,
            }}>{post.title}</h1>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {post.thumbnail_url && (
              <div style={{
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
                borderRadius: '16px', overflow: 'hidden',
                aspectRatio: '16/9',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              }}>
                <img src={post.thumbnail_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
            )}

            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }}/>

            <div style={{
              marginTop: 'clamp(3rem, 6vw, 5rem)', paddingTop: '2rem',
              borderTop: '1px solid #e2e8f0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
            }}>
              <Link href="/articles" className="back-link">← 記事一覧に戻る</Link>
              <Link href="/shops" className="shops-btn">ショップを探す →</Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
          background: '#0f172a',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>ShipTo</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>JP</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#475569' }}>© {new Date().getFullYear()} ShipToJP. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}