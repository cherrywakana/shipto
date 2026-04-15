import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import { addExternalLinkAttributes } from '@/lib/utils'

// Catch-all route for legacy URLs and custom paths
// e.g. /fashionshop/lists/mens

export async function generateMetadata({
    params,
}: {
    params: Promise<{ legacyPath: string[] }>
}): Promise<Metadata> {
    const { legacyPath } = await params
    const slug = legacyPath.join('/')

    const { data: post } = await supabase
        .from('posts')
        .select('title, content, thumbnail_url')
        .eq('slug', slug)
        .single()

    if (!post) {
        return {
            title: 'ページが見つかりません | Original Price',
        }
    }

    const plainText = post.content
        ?.replace(/<[^>]*>/g, '')
        ?.replace(/\s+/g, ' ')
        ?.trim()
        ?.slice(0, 120) + '...'

    return {
        title: `${post.title} | Original Price`,
        description: plainText,
        openGraph: {
            title: post.title,
            description: plainText,
            type: 'article',
            url: `https://original-price.com/${slug}`,
            siteName: 'Original Price',
            ...(post.thumbnail_url && {
                images: [
                    {
                        url: post.thumbnail_url,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: plainText,
            ...(post.thumbnail_url && { images: [post.thumbnail_url] }),
        },
    }
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
    const headings: { id: string; text: string; level: number }[] = []
    const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi
    let match

    while ((match = regex.exec(html)) !== null) {
        const level = parseInt(match[1])
        const text = match[2].replace(/<[^>]*>/g, '').trim()
        const id = text
            .replace(/[^\w\u3000-\u9FFF\uFF00-\uFFEF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .toLowerCase()
        if (text) {
            headings.push({ id, text, level })
        }
    }

    return headings
}

function injectHeadingIds(html: string, headings: { id: string; text: string; level: number }[]): string {
    let headingIndex = 0
    return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (fullMatch, level, attrs, content) => {
        if (headingIndex < headings.length) {
            const heading = headings[headingIndex]
            headingIndex++
            return `<h${level} id="${heading.id}"${attrs}>${content}</h${level}>`
        }
        return fullMatch
    })
}

export default async function LegacyPathPage({
    params,
}: {
    params: Promise<{ legacyPath: string[] }>
}) {
    const { legacyPath } = await params
    const slug = legacyPath.join('/')

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
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem' }}>ページが見つかりません。</p>
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/" style={{ color: '#111110', textDecoration: 'none', fontWeight: 600 }}>← トップに戻る</Link>
                    </div>
                </div>
            </main>
        </>
    )

    const headings = extractHeadings(post.content || '')
    const contentWithLinks = addExternalLinkAttributes(post.content || '')
    const contentWithIds = injectHeadingIds(contentWithLinks, headings)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.content?.replace(/<[^>]*>/g, '')?.replace(/\s+/g, ' ')?.trim()?.slice(0, 200),
        image: post.thumbnail_url || undefined,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        author: {
            '@type': 'Organization',
            name: 'Original Price',
            url: 'https://original-price.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Original Price',
            url: 'https://original-price.com',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://original-price.com/${slug}`,
        },
    }

    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: 'white' }}>
                <style>{`
          .back-link { color: #6b6b69; text-decoration: none; font-weight: 500; font-size: 0.82rem; transition: color 0.2s; display: inline-flex; align-items: center; gap: 0.35rem; }
          .back-link:hover { color: #111110; }
          .toc-container { background: #fafaf9; border: 1px solid #e5e5e3; border-radius: 10px; padding: 1.5rem 1.75rem; margin-bottom: 2.5rem; }
          .toc-title { font-size: 0.7rem; font-weight: 700; color: #a1a19f; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
          .toc-list { list-style: none; padding: 0; margin: 0; }
          .toc-list li { margin-bottom: 0.45rem; }
          .toc-list li a { color: #555553; text-decoration: none; font-size: 0.9rem; line-height: 1.6; transition: color 0.15s; }
          .toc-list li a:hover { color: #111110; }
          .toc-list li.toc-h3 { padding-left: 1.25rem; }
          .toc-list li.toc-h3 a { font-size: 0.82rem; color: #a1a19f; }
          .article-content { font-size: 1.05rem; line-height: 1.85; color: #333332; font-family: var(--font-sans); }
          .article-content h2 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.5rem, 3.5vw, 2rem); font-weight: 700; color: #111110; margin-top: 3.5rem; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e5e5e3; line-height: 1.3; letter-spacing: -0.02em; scroll-margin-top: 5rem; }
          .article-content h3 { font-size: 1.15rem; font-weight: 700; color: #111110; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.4; letter-spacing: -0.02em; scroll-margin-top: 5rem; }
          .article-content p { margin-bottom: 1.5rem; letter-spacing: -0.005em; }
          .article-content ul, .article-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
          .article-content li { margin-bottom: 0.5rem; }
          .article-content a { color: #111110; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(17,17,16,0.3); transition: text-decoration-color 0.15s; }
          .article-content a:hover { text-decoration-color: rgba(17,17,16,0.9); }
          .article-content strong { font-weight: 700; color: #111110; }
          .article-content table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 1.5rem; }
          .article-content th { background: #f3f3f1; padding: 0.75rem 1rem; text-align: left; font-weight: 600; border-bottom: 1px solid #e5e5e3; color: #555553; font-size: 0.82rem; letter-spacing: 0.03em; }
          .article-content td { padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0ee; color: #333332; }
          .article-content tr:last-child td { border-bottom: none; }
        `}</style>

                <section style={{
                    padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            {post.category && (
                                <span style={{
                                    fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-brand)',
                                    background: 'var(--accent-brand-soft)', padding: '0.35rem 1.2rem',
                                    borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase',
                                    border: '1px solid var(--accent-brand-mid)',
                                }}>{post.category}</span>
                            )}
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
                            letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.3,
                            marginBottom: '2rem'
                        }}>{post.title}</h1>

                        {post.thumbnail_url && (
                            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backgroundColor: '#e2e8f0' }}>
                                <img src={post.thumbnail_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                </section>

                <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)' }}>
                    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                        {headings.length > 0 && (
                            <nav className="toc-container" aria-label="目次">
                                <p className="toc-title">📑 目次</p>
                                <ul className="toc-list">
                                    {headings.map((h, i) => (
                                        <li key={i} className={h.level === 3 ? 'toc-h3' : ''}>
                                            <a href={`#${h.id}`}>{h.level === 3 ? '└ ' : ''}{h.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                        <div className="article-content" dangerouslySetInnerHTML={{ __html: contentWithIds }} />
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}
