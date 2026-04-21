import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { marked } from 'marked'
import { CORE_GUIDE_LINKS } from '@/lib/shopInsights'
import { addExternalLinkAttributes, formatJapaneseDate, getArticleExcerpt, getLastVerifiedAt, sanitizeArticleHtml } from '@/lib/utils'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params

    const { data: post } = await supabase
        .from('posts')
        .select('title, content, thumbnail_url')
        .eq('slug', slug)
        .single()

    if (!post) {
        return {
            title: '記事が見つかりません | Original Price',
        }
    }

    const plainText = getArticleExcerpt(post.content, 120)

    const postUrl = slug.includes('/') && !slug.startsWith('articles/')
        ? `https://original-price.com/${slug}`
        : `https://original-price.com/articles/${slug}`

    return {
        title: `${post.title} | Original Price`,
        description: plainText,
        openGraph: {
            title: post.title,
            description: plainText,
            type: 'article',
            url: postUrl,
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

function extractLinkedSlugs(html: string, entity: 'shops' | 'brands'): string[] {
    const matches = Array.from(html.matchAll(new RegExp(`href="/${entity}/([^"#?]+)"`, 'g')))
        .map((match) => match[1])
        .filter(Boolean)

    return matches.filter((slug, index) => matches.indexOf(slug) === index)
}

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const isLegacyPath = slug.includes('/') && !slug.startsWith('articles/')
    
    if (isLegacyPath) {
        redirect(`/${slug}`);
    }

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!post) return (
        <>
            <Header />
            <main style={{ fontFamily: 'var(--font-sans)', padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)', minHeight: '100vh', background: 'var(--bg)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem' }}>記事が見つかりません。</p>
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/articles" style={{ color: '#111110', textDecoration: 'none', fontWeight: 600 }}>← 記事一覧に戻る</Link>
                    </div>
                </div>
            </main>
        </>
    )

    // Parse Markdown to HTML and process
    const rawHtml = marked.parse(post.content || '') as string
    const sanitizedContent = sanitizeArticleHtml(rawHtml)
    const linkedShopSlugs = extractLinkedSlugs(sanitizedContent, 'shops')
    const linkedBrandSlugs = extractLinkedSlugs(sanitizedContent, 'brands')
    const headings = extractHeadings(sanitizedContent)
    const contentWithLinks = addExternalLinkAttributes(sanitizedContent)
    const contentWithIds = injectHeadingIds(contentWithLinks, headings)

    const [{ data: linkedShops }, { data: linkedBrands }, { data: featuredShops }] = await Promise.all([
        linkedShopSlugs.length > 0
            ? supabase
                .from('shops')
                .select('name, slug, category, ships_to_japan, is_affiliate, popularity_score')
                .in('slug', linkedShopSlugs.slice(0, 10))
            : Promise.resolve({ data: [] }),
        linkedBrandSlugs.length > 0
            ? supabase
                .from('brands')
                .select('name, slug')
                .in('slug', linkedBrandSlugs.slice(0, 2))
            : Promise.resolve({ data: [] }),
        supabase
            .from('shops')
            .select('name, slug, category, ships_to_japan, is_affiliate, popularity_score')
            .order('is_affiliate', { ascending: false })
            .order('popularity_score', { ascending: false })
            .limit(3),
    ])

    const orderedLinkedShops = linkedShopSlugs
        .map((slug) => linkedShops?.find((shop) => shop.slug === slug))
        .filter(Boolean)

    const primaryBrand = linkedBrandSlugs
        .map((brandSlug) => linkedBrands?.find((brand) => brand.slug === brandSlug))
        .find(Boolean)

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
            '@id': `https://original-price.com/articles/${slug}`,
        },
    }

    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main style={{ fontFamily: 'var(--font-sans)', background: 'white' }}>
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
          .article-content { font-size: 1.05rem; line-height: 1.85; color: #333332; }
          .article-content h2 { font-family: var(--font-serif); font-size: clamp(1.5rem, 3.5vw, 2.2rem); font-weight: 700; color: #111110; margin-top: 3.5rem; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e5e5e3; line-height: 1.3; scroll-margin-top: 5rem; }
          .article-content h3 { font-size: 1.2rem; font-weight: 800; color: #111110; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.4; scroll-margin-top: 5rem; }
          .article-content p { margin-bottom: 1.5rem; }
          .article-content ul, .article-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
          .article-content li { margin-bottom: 0.5rem; }
          .article-content a { color: #111110; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(17,17,16,0.2); transition: text-decoration-color 0.15s; }
          .article-content a:hover { text-decoration-color: rgba(17,17,16,0.8); }
          .article-content strong { font-weight: 800; color: #111110; }
          .article-content table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 2rem; border: 1px solid #e5e5e3; }
          .article-content th { background: #f3f3f1; padding: 0.85rem; text-align: left; font-weight: 700; border-bottom: 1px solid #e5e5e3; color: #111110; }
          .article-content td { padding: 0.85rem; border-bottom: 1px solid #f0f0ee; color: #333332; }
        `}</style>

                <section style={{ padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <Link href="/articles" className="back-link" style={{ marginBottom: '2rem' }}>← 記事一覧に戻る</Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            {post.category && (
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', background: '#111110', padding: '0.3rem 1rem', borderRadius: '4px', letterSpacing: '0.05em' }}>{post.category}</span>
                            )}
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{new Date(post.created_at).toLocaleDateString('ja-JP')} 公開</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 5.5vw, 3.4rem)', fontWeight: 850, letterSpacing: '-0.03em', color: '#111110', lineHeight: 1.2, marginBottom: '2.5rem' }}>{post.title}</h1>
                        {post.thumbnail_url && (
                            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}>
                                <img src={post.thumbnail_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                </section>

                <section style={{ padding: '5rem clamp(1.5rem, 5vw, 4rem)' }}>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        {headings.length > 0 && (
                            <nav className="toc-container">
                                <p className="toc-title">Index</p>
                                <ul className="toc-list">
                                    {headings.map((h, i) => (
                                        <li key={i} className={h.level === 3 ? 'toc-h3' : ''}>
                                            <a href={`#${h.id}`}>{h.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                        <div className="article-content" dangerouslySetInnerHTML={{ __html: contentWithIds }} />

                        <div style={{ marginTop: '6rem', padding: '3rem', background: 'var(--bg)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Next Steps</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <Link href="/shops" style={{ textDecoration: 'none', background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                    <p style={{ fontWeight: 800, color: '#111110', marginBottom: '0.5rem' }}>ショップ一覧 →</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>海外通販140サイトを比較</p>
                                </Link>
                                <Link href="/guide" style={{ textDecoration: 'none', background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                    <p style={{ fontWeight: 800, color: '#111110', marginBottom: '0.5rem' }}>初心者ガイド →</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>関税・配送の基本を学ぶ</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}
