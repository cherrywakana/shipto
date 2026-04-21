import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: '検索結果 | Original Price',
    description: 'サイト内すべてのショップ、ブランド、記事から検索できます。',
    robots: { index: false, follow: true }, // 検索結果ページはインデックスさせない
}

export const revalidate = 0 // 検索結果は常に最新

type SearchPageProps = {
    searchParams?: Promise<{
        q?: string | string[]
    }>
}

function getSingleParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

export default async function SearchPage(props: SearchPageProps) {
    const searchParams = await props.searchParams;
    const q = getSingleParam(searchParams?.q)?.trim() || '';

    return (
        <>
            <Header />
            <main style={{ fontFamily: 'var(--font-sans)', minHeight: '100vh', background: 'var(--bg)' }}>
                <style>{`
          .search-hero {
            padding: clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem;
            text-align: center;
          }
          .search-box-large {
            max-width: 700px;
            margin: 0 auto;
            position: relative;
          }
          .search-input-large {
            width: 100%;
            height: 64px;
            border: 2px solid var(--border);
            border-radius: 18px;
            padding: 0 1.5rem 0 3.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            background: #ffffff;
            color: #111110;
            outline: none;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          }
          .search-input-large:focus {
            border-color: #111110;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          }
          .search-icon-inside {
            position: absolute;
            left: 1.25rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
          }
          .result-section {
            margin-bottom: 5rem;
          }
          .section-tag {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #111110;
            background: #e9e9e5;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
          }
          .grid-compact {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
            gap: 1.5rem;
          }
          .search-card-mini {
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 1.5rem;
            text-decoration: none;
            color: inherit;
            display: block;
            transition: all 0.25s var(--ease-out);
            box-shadow: 0 4px 12px rgba(0,0,0,0.02);
            position: relative;
          }
          .search-card-mini:hover {
            border-color: #111110;
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.06);
          }
        `}</style>

                <section className="search-hero">
                    <div className="search-box-large">
                        <form action="/search" method="GET">
                            <span className="search-icon-inside">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                name="q" 
                                defaultValue={q} 
                                className="search-input-large" 
                                placeholder="サイト内を検索（ショップ、ブランド、記事...）"
                                autoFocus
                            />
                        </form>
                    </div>
                </section>

                <section style={{ padding: '0 clamp(1.5rem, 5vw, 4rem) 10rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {q ? (
                        <Suspense fallback={<div>検索中...</div>}>
                            <SearchResults q={q} />
                        </Suspense>
                    ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '4rem' }}>
                            <p>キーワードを入力して検索を開始してください。</p>
                        </div>
                    )}
                </section>
                <Footer />
            </main>
        </>
    )
}

async function SearchResults({ q }: { q: string }) {
    // 1. ショップ検索
    const { data: shops } = await supabase
        .from('shops')
        .select('id, name, slug, description, category, country')
        .or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%,country.ilike.%${q}%,tax_guide.ilike.%${q}%`)
        .limit(10);

    // 2. 記事検索
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title, slug, category, created_at')
        .or(`title.ilike.%${q}%,content.ilike.%${q}%`)
        .limit(10);

    // 3. ブランド検索
    const { data: brands } = await supabase
        .from('brands')
        .select('id, name, slug, description')
        .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
        .limit(10);

    const totalResults = (shops?.length || 0) + (posts?.length || 0) + (brands?.length || 0);

    if (totalResults === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>「{q}」に一致する結果が見つかりませんでした。</h3>
                <p style={{ color: 'var(--text-secondary)' }}>キーワードを変えて再度お試しください。</p>
            </div>
        );
    }

    return (
        <div>
            <p style={{ marginBottom: '3rem', fontWeight: 600, color: 'var(--text-secondary)' }}>「{q}」の検索結果: {totalResults}件</p>

            {/* ショップセクション */}
            {shops && shops.length > 0 && (
                <div className="result-section">
                    <span className="section-tag">SHOPS ({shops.length})</span>
                    <div className="grid-compact">
                        {shops.map((shop) => (
                            <Link key={shop.id} href={`/shops/${shop.slug}`} className="search-card-mini">
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>{shop.category} / {shop.country}</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '0.5rem' }}>{shop.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{shop.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 記事セクション */}
            {posts && posts.length > 0 && (
                <div className="result-section">
                    <span className="section-tag">ARTICLES ({posts.length})</span>
                    <div className="grid-compact">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/articles/${post.slug}`} className="search-card-mini" style={{ background: '#111110', color: 'white', borderColor: '#111110' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.4rem' }}>{post.category}</span>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.3 }}>{post.title}</h3>
                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{new Date(post.created_at).toLocaleDateString('ja-JP')}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* ブランドセクション */}
            {brands && brands.length > 0 && (
                <div className="result-section">
                    <span className="section-tag">BRANDS ({brands.length})</span>
                    <div className="grid-compact">
                        {brands.map((brand) => (
                            <Link key={brand.id} href={`/brands/${brand.slug}`} className="search-card-mini">
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '0.5rem' }}>{brand.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{brand.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
