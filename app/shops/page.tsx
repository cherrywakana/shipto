import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SHOP_CATEGORIES } from '@/lib/shopCategories'

// SEO: 検索キーワード「海外通販サイト一覧」をターゲットにしたメタデータ
export const metadata: Metadata = {
    title: '海外通販サイト一覧 | 日本から安心・安く買える人気ショップ140選【完全版】',
    description: '日本発送に対応した世界中の有力海外通販サイトを一覧でまとめて紹介。ファッション、自転車、コスメ、アウトドア等、カテゴリー別に送料や関税の扱いを専門家が徹底調査。日本語ガイド付きで初めての個人輸入も安心です。',
    openGraph: {
        title: '海外通販サイト一覧 | Original Price',
        description: '専門家が厳選した日本から買える海外ショップ140選。関税・送料の不安を解消する詳細ガイド付き。',
    }
}

export const revalidate = 60 // 60秒間キャッシュを利用

type ShopsPageProps = {
    searchParams?: Promise<{
        category?: string | string[]
        q?: string | string[]
    }>
}

function getSingleParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

function buildShopHref(categoryLabel: string, q: string | undefined) {
    const params = new URLSearchParams()
    if (categoryLabel !== 'すべて') {
        params.set('category', categoryLabel)
    }
    if (q) {
        params.set('q', q)
    }
    const queryString = params.toString()
    return queryString ? `/shops?${queryString}` : '/shops'
}

export default async function ShopsPage(props: ShopsPageProps) {
    const searchParams = await props.searchParams;
    const category = getSingleParam(searchParams?.category);
    const q = getSingleParam(searchParams?.q)?.trim();

    return (
        <>
            <Header />
            <main style={{ fontFamily: 'var(--font-sans)', minHeight: '100vh', background: 'var(--bg)' }}>
                <style>{`
          .search-form-inline {
            display: grid;
            grid-template-columns: minmax(0, 1.4fr) minmax(180px, 0.8fr) auto;
            gap: 0.75rem;
            max-width: 980px;
            margin: 0 auto 1.5rem;
          }
          .search-input,
          .search-select {
            width: 100%;
            min-height: 52px;
            border: 1px solid var(--border);
            border-radius: 14px;
            background: #ffffff;
            color: #111110;
            font-size: 0.95rem;
            padding: 0 1rem;
          }
          .search-submit {
            min-height: 52px;
            border: none;
            border-radius: 14px;
            background: #111110;
            color: #fafaf9;
            padding: 0 1.2rem;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
          }
          .shop-card {
            background: white;
            border: 1px solid var(--border);
            border-radius: 20px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            height: 100%;
          }
          .shop-card:hover {
            border-color: #111110;
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12);
          }
          .cat-tab {
            padding: 0.6rem 1.6rem;
            border-radius: 9999px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 600;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: nowrap;
            letter-spacing: -0.01em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .cat-tab.active {
            background: #111110;
            color: #fafaf9;
            box-shadow: 0 4px 12px rgba(17, 17, 16, 0.15);
          }
          .cat-tab.inactive {
            background: var(--accent-brand-soft);
            color: var(--text-secondary);
          }
          .cat-tab.inactive:hover {
            background: var(--accent-brand-mid);
            color: #111110;
            transform: translateY(-2px) scale(1.02);
          }
          @media (max-width: 820px) {
            .search-form-inline {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

                <section style={{
                    padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem',
                    background: 'transparent',
                    textAlign: 'center',
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 850,
                            letterSpacing: '-0.04em', color: '#111110', lineHeight: 1.1, marginBottom: '2rem',
                        }}>
                            海外通販サイト一覧
                        </h1>
                        <p style={{ 
                            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', 
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: '3rem',
                            textAlign: 'left',
                            background: '#ffffff',
                            padding: '2rem',
                            borderRadius: '24px',
                            border: '1px solid var(--border)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                        }}>
                            日本へ直送可能な世界の有力通販サイトを網羅した完全インデックスです。
                            当サイトの専門スタッフが、各ショップの<b>リアルな送料・関税計算方法・配送スピード</b>を実機検証し、
                            初めての方でも安心して「現地価格」で買い物ができるよう詳細ガイドを完備しています。
                            カテゴリー別・キーワード別で最適なショップを見つけてください。
                        </p>
                    </div>

                    <form action="/shops" className="search-form-inline">
                        <input
                            type="text"
                            name="q"
                            defaultValue={q || ''}
                            className="search-input"
                            placeholder="ショップ名・ブランド名・カテゴリで検索"
                        />
                        <select name="category" defaultValue={category || ''} className="search-select">
                            <option value="">すべて</option>
                            {SHOP_CATEGORIES.filter((cat) => cat.label !== 'すべて').map((cat) => (
                                <option key={cat.label} value={cat.label}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="search-submit">検索する</button>
                    </form>

                    <div style={{
                        display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto'
                    }}>
                        {SHOP_CATEGORIES.map((cat) => {
                            const isActive = (!category && cat.label === 'すべて') || (category === cat.label);
                            return (
                                <Link
                                    key={cat.label}
                                    href={buildShopHref(cat.label, q)}
                                    className={`cat-tab ${isActive ? 'active' : 'inactive'}`}
                                >
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section style={{ padding: '0 clamp(1.5rem, 5vw, 4rem) 8rem', maxWidth: '1280px', margin: '0 auto' }}>
                    <Suspense fallback={
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: '2rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ height: '400px', background: '#f1f5f9', borderRadius: '20px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                            ))}
                        </div>
                    }>
                        <ShopList category={category} q={q} />
                    </Suspense>

                    {/* SEO Footer Content Section */}
                    <article style={{
                        marginTop: '8rem',
                        padding: '4rem',
                        background: '#ffffff',
                        borderRadius: '32px',
                        border: '1px solid var(--border)',
                        color: '#111110'
                    }}>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>失敗しないための海外通販サイト選び</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', lineHeight: 1.8 }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>① 日本発送の有無と送料を確認</h3>
                                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                    海外通販サイト一覧の中でも、日本への直送（Direct International Shipping）に対応しているかは重要です。当サイトでは直送可能なショップを優先表示しており、一定額以上の購入で送料無料（Free Shipping）になるラインも各ショップガイドで公開しています。
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>② 関税・消費税の支払い方式（DDP/DDU）</h3>
                                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                    関税込み（DDP）か、受け取り時支払い（DDU）かで最終的な支払い総額が変わります。特に16,666円を超える注文の際は、当リスト内の各ショップ詳細ページにて「関税の精算方法」を事前にチェックすることをおすすめします。
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>③ 信頼性と真贋鑑定のプロセス</h3>
                                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                    当一覧に掲載されているショップは、世界的に評価の高い老舗百貨店や正規代理店、信頼できるマーケットプレイスのみを厳選しています。偽造品リスクのない、本物のアイテムを現地価格で手に入れましょう。
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
                <Footer />
            </main>
        </>
    )
}

async function ShopList({ category, q }: { category: string | undefined, q: string | undefined }) {
    let query = supabase
        .from('shops')
        .select('id, name, slug, url, country, category, image_url, description, is_affiliate, ships_to_japan, popularity_score')
        .order('is_affiliate', { ascending: false })
        .order('ships_to_japan', { ascending: false })
        .order('popularity_score', { ascending: false })
        .order('name', { ascending: true })

    if (category) {
        query = query.eq('category', category)
    }

    if (q) {
        query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`)
    }

    const { data: shops, error } = await query

    if (error) {
        return <div style={{ textAlign: 'center', padding: '5rem 0', color: '#ef4444' }}><p>読み込みエラーが発生しました</p></div>
    }

    if (!shops || shops.length === 0) {
        return <div style={{ textAlign: 'center', padding: '5rem 0' }}><p style={{ color: '#64748b' }}>該当するショップが見つかりませんでした。</p></div>
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            gap: '2.5rem',
        }}>
            {shops.map((shop) => (
                <div key={shop.id} className="shop-card" style={{ position: 'relative' }}>
                    <a 
                        href={shop.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
                        aria-label={`${shop.name}の公式サイトへ移動`}
                    />
                    <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                        {shop.ships_to_japan === false && (
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'rgba(239, 68, 68, 0.9)', color: 'white',
                                padding: '0.2rem 0.6rem', borderRadius: '6px',
                                fontSize: '0.7rem', fontWeight: 700, zIndex: 2,
                                backdropFilter: 'blur(4px)',
                            }}>直送不可</div>
                        )}
                        {shop.image_url ? (
                            <Image
                                src={shop.image_url}
                                alt={shop.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🛍️</div>
                        )}
                    </div>

                    <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#111110', background: 'rgba(17,17,16,0.06)', padding: '0.25rem 0.75rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {shop.category}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>📍 {shop.country}</span>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: shop.ships_to_japan === false ? '#ef4444' : '#10b981',
                                background: shop.ships_to_japan === false ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                {shop.ships_to_japan === false ? '❌ 直送不可' : '✈️ 日本直送OK'}
                            </span>
                        </div>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: 850, color: '#111110', marginBottom: '1rem', position: 'relative', zIndex: 2, letterSpacing: '-0.025em', lineHeight: 1.2 }}>{shop.name}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1, position: 'relative', zIndex: 2 }}>
                            {shop.description}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                            <div
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    background: '#111110',
                                    color: 'white',
                                    padding: '0.9rem',
                                    borderRadius: '14px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                公式サイト ↗
                            </div>
                            {shop.slug && (
                                <Link
                                    href={`/shops/${shop.slug}`}
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        background: 'white',
                                        color: '#111110',
                                        padding: '0.9rem',
                                        borderRadius: '14px',
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        border: '1px solid var(--border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    解説ガイド →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
