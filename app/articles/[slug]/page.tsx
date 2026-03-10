import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default async function ArticleDetailPage({
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
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem' }}>記事が見つかりません。</p>
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/articles" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>← 記事一覧に戻る</Link>
                    </div>
                </div>
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
          
          /* Reading experience styles */
          .article-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #334155;
            font-family: -apple-system, BlinkMacSystemFont, "Noto Sans JP", "Segoe UI", sans-serif;
          }
          
          .article-content h2 {
            font-size: 1.875rem;
            font-weight: 800;
            color: #0f172a;
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid #e2e8f0;
            line-height: 1.4;
          }

          .article-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            line-height: 1.5;
          }

          .article-content p {
            margin-bottom: 1.5rem;
            letter-spacing: 0.02em;
          }

          .article-content ul, .article-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }

          .article-content li {
            margin-bottom: 0.5rem;
          }

          .article-content a {
            color: #6366f1;
            text-decoration: underline;
            text-underline-offset: 4px;
            text-decoration-color: rgba(99,102,241,0.4);
            transition: all 0.2s;
          }

          .article-content a:hover {
            text-decoration-color: rgba(99,102,241,1);
          }
          
          .article-content strong {
            font-weight: 700;
            color: #0f172a;
            background: linear-gradient(transparent 60%, rgba(253, 224, 71, 0.4) 60%);
          }
        `}</style>

                {/* Article Header (Hero) */}
                <section style={{
                    padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <Link href="/articles" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem' }}>← 記事一覧に戻る</Link>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            {post.category && (
                                <span style={{
                                    fontSize: '0.85rem', fontWeight: 600, color: '#4f46e5',
                                    background: 'rgba(79, 70, 229, 0.1)', padding: '0.4rem 1.2rem',
                                    borderRadius: '100px',
                                }}>{post.category}</span>
                            )}
                            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>
                                {post.created_at ? `🗓️ ${new Date(post.created_at).toLocaleDateString('ja-JP')}` : ''}
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
                            letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.3,
                            marginBottom: '2rem'
                        }}>{post.title}</h1>

                        {post.thumbnail_url && (
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                                backgroundColor: '#e2e8f0'
                            }}>
                                <img
                                    src={post.thumbnail_url}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* Article Content */}
                <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)' }}>
                    <div style={{ maxWidth: '720px', margin: '0 auto' }}>

                        {/* Rendering HTML content */}
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Article Footer Area (Share, tags etc. can go here later) */}
                        <div style={{
                            marginTop: '5rem',
                            paddingTop: '3rem',
                            borderTop: '1px solid #e2e8f0',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
                                お探しのショップはありましたか？
                            </p>
                            <Link href="/shops" style={{
                                display: 'inline-block', background: '#0f172a', color: 'white',
                                padding: '1rem 2.5rem', borderRadius: '999px', textDecoration: 'none',
                                fontWeight: 600, transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                            }}>
                                海外通販ショップ一覧を見る →
                            </Link>
                        </div>

                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
