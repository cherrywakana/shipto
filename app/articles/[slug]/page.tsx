import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Link from 'next/link'

export default async function PostPage({
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
      <main style={{ padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
          記事が見つかりません。
        </p>
        <Link href="/articles" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--black)', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          ← 一覧に戻る
        </Link>
      </main>
    </>
  )

  return (
    <>
      <Header />
      <main style={{ padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)' }}>
        <style>{`
          .back-link { color: var(--gray-500); text-decoration: none; transition: color 0.2s; }
          .back-link:hover { color: var(--black); }
          .article-body h2 {
            font-family: var(--font-display);
            font-size: clamp(1.1rem, 2vw, 1.4rem);
            letter-spacing: -0.02em;
            color: var(--black);
            margin: 2.5rem 0 1rem;
            line-height: 1.3;
          }
          .article-body h3 {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--black);
            margin: 2rem 0 0.75rem;
          }
          .article-body p { margin-bottom: 1.5rem; }
          .article-body a { color: var(--black); text-underline-offset: 3px; }
          .article-body ul, .article-body ol { padding-left: 1.5rem; margin-bottom: 1.5rem; }
          .article-body li { margin-bottom: 0.4rem; }
          .article-body strong { font-weight: 500; color: var(--black); }
        `}</style>

        <Link href="/articles" className="back-link" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '3rem',
        }}>
          ← 記事一覧
        </Link>

        <div style={{ maxWidth: '720px', marginBottom: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)', borderBottom: '1px solid var(--gray-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
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

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            letterSpacing: '-0.03em',
            color: 'var(--black)',
            lineHeight: 1.15,
          }}>
            {post.title}
          </h1>
        </div>

        {post.thumbnail_url && (
          <div style={{ maxWidth: '720px', marginBottom: 'clamp(2rem, 4vw, 3rem)', aspectRatio: '16 / 9', overflow: 'hidden', backgroundColor: 'var(--gray-100)' }}>
            <img src={post.thumbnail_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div
          className="article-body"
          style={{
            maxWidth: '680px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
            fontWeight: 300,
            color: 'var(--gray-700)',
            lineHeight: 1.9,
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div style={{ maxWidth: '680px', marginTop: 'clamp(3rem, 6vw, 5rem)', paddingTop: '2rem', borderTop: '1px solid var(--gray-100)' }}>
          <Link href="/blog" className="back-link" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            ← 記事一覧に戻る
          </Link>
        </div>
      </main>
    </>
  )
}