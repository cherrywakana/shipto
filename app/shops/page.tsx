import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SHOP_CATEGORIES } from '@/lib/shopCategories'

export const metadata: Metadata = {
    title: '海外通販サイト一覧 | 日本から安心・安く買える人気ショップ200選以上【完全版】',
    description: '日本発送に対応した世界中の有力海外通販サイトを一覧でまとめて紹介。ファッション、自転車、コスメ、アウトドア等、カテゴリー別に送料や関税の扱いを専門家が徹底調査。日本語ガイド付きで初めての個人輸入も安心です。',
    openGraph: {
        title: '海外通販サイト一覧 | Original Price',
        description: '専門家が厳選した日本から買える海外ショップ200選以上。関税・送料の不安を解消する詳細ガイド付き。',
    }
}

export const revalidate = 60 
export const dynamic = 'force-dynamic'

type ShopsPageProps = {
    searchParams?: Promise<{
        category?: string | string[]
    }>
}

function getSingleParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

function buildShopHref(categoryLabel: string) {
    const params = new URLSearchParams()
    if (categoryLabel !== 'すべて') {
        params.set('category', categoryLabel)
    }
    return params.toString() ? `/shops?${params.toString()}` : '/shops'
}

export default async function ShopsPage(props: ShopsPageProps) {
    const searchParams = await props.searchParams;
    const category = getSingleParam(searchParams?.category);

    return (
        <>
            <Header />
            <main style={{ fontFamily: 'var(--font-sans)', minHeight: '100vh', background: 'var(--bg)' }}>
                <style>{`
          .cat-tab {
            padding: 0.6rem 2rem;
            border-radius: 9999px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 700;
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
            box-shadow: 0 4px 12px rgba(17, 17, 16, 0.2);
          }
          .cat-tab.inactive {
            background: #ffffff;
            color: var(--text-secondary);
            border: 1px solid var(--border);
          }
          .cat-tab.inactive:hover {
            border-color: #111110;
            background: #ffffff;
            color: #111110;
            transform: translateY(-2px);
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
        `}</style>

                <section style={{
                    padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem',
                    background: 'transparent',
                    textAlign: 'center',
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 850,
                            letterSpacing: '-0.04em', color: '#111110', lineHeight: 1.1, marginBottom: '1.2rem',
                        }}>
                            海外通販サイト一覧
                        </h1>
                        <p style={{ 
                            fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', 
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-serif)',
                            fontStyle: 'italic',
                            marginBottom: '4rem',
                            letterSpacing: '0.02em'
                        }}>
                            200+ premium merchants curated for your high-end shopping experience.
                        </p>
                    </div>

                    <div style={{
                        display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto'
                    }}>
                        {SHOP_CATEGORIES.map((cat) => {
                            const isActive = (!category && cat.label === 'すべて') || (category === cat.label);
                            return (
                                <Link
                                    key={cat.label}
                                    href={buildShopHref(cat.label)}
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
                                <div key={i} style={{ height: '400px', background: '#ffffff', border: '1px solid var(--border)', borderRadius: '20px' }} />
                            ))}
                        </div>
                    }>
                        <ShopList category={category} />
                    </Suspense>

                    <article style={{
                        marginTop: '10rem',
                        padding: '5rem clamp(2rem, 5vw, 6rem)',
                        background: '#ffffff',
                        borderRadius: '32px',
                        border: '1px solid var(--border)',
                        color: '#111110',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
                                日本から安心して買える海外通販サイトの総覧
                            </h2>
                            <p style={{ fontSize: '1.rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem' }}>
                                本ページは、日本への直送（Direct International Shipping）に対応した、世界の有力通販サイトを網羅した完全な一覧です。
                                当サイトの専門スタッフが、各ショップの<b>リアルな送料・関税計算方法（DDP/DDU）・配送スピード</b>を、実際に日本から注文して実機検証しています。
                                初めての個人輸入でも、各ショップの個別詳細ガイドを確認することで、為替や通関の不安を解消し、安心・確実な「現地価格」での買い物を楽しむことができます。
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', lineHeight: 1.8 }}>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem', color: '#111110' }}>① 送料と配送品質の検証</h3>
                                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                        海外通販サイト一覧の中でも、日本へのデリバリー品質が担保されているかを重視しています。一定額以上の購入で送料無料となるしきい値や、DHL/FedEx等のエクスプレス便の早さをショップごとに公開しています。
                                    </p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem', color: '#111110' }}>② 関税の不透明さをゼロに</h3>
                                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                        「結局いくらかかるのか」という不安を解消するため、関税込み（DDP）のショップか、受け取り時支払い（DDU）かを明確に区分。16,666円の免税ルールを最大限に活かす方法も各ガイドで解説しています。
                                    </p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem', color: '#111110' }}>③ 信頼できる正規店のみ掲載</h3>
                                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                        世界的に評価の高い老舗百貨店、大手セレクトショップ、公式ストアのみを厳選。偽造品リスクのない、確かな品質のアイテムを海外から直接取り寄せることが可能です。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
                <Footer />
            </main>
        </>
    )
}

async function ShopList({ category }: { category: string | undefined }) {
    let query = supabase
        .from('shops')
        .select('id, name, slug, url, country, category, image_url, description, is_affiliate, ships_to_japan, popularity_score')
        .order('is_affiliate', { ascending: false })
        .order('ships_to_japan', { ascending: false, nullsFirst: false })
        .order('popularity_score', { ascending: false })
        .order('name', { ascending: true })

    if (category) {
        query = query.eq('category', category)
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
                                    unoptimized
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
