import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { CORE_GUIDE_LINKS } from '@/lib/shopInsights'
import { formatJapaneseDate, getLastVerifiedAt } from '@/lib/utils'
import {
    getOfficialLinks,
    getShopChecklist,
    getShopTakeaways,
    getReferenceNotes,
    getShopLead,
} from '@/lib/shopDetail'

type RelatedBrand = {
    brands: {
        name: string
        slug: string
    } | null
}

type SimilarShop = {
    name: string
    slug: string
    description?: string | null
    country?: string | null
    image_url?: string | null
}

export default async function ShopDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const { data: shop } = await supabase
        .from('shops')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!shop) {
        return (
            <>
                <Header />
                <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)', minHeight: '100vh', background: '#f8fafc' }}>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>ショップが見つかりません。</p>
                    <Link href="/shops" style={{ color: '#111110', textDecoration: 'none', fontWeight: 600 }}>← ショップ一覧に戻る</Link>
                </main>
                <Footer />
            </>
        )
    }

    const [brandResponse, similarResponse] = await Promise.all([
        supabase
            .from('shop_brands')
            .select(`
                brands:brand_id (
                    name,
                    slug
                )
            `)
            .eq('shop_id', shop.id)
            .eq('status', 'found')
            .limit(8),
        supabase
            .from('shops')
            .select('name, slug, description, country, image_url')
            .eq('category', shop.category)
            .neq('slug', shop.slug)
            .order('popularity_score', { ascending: false })
            .limit(4),
    ])

    const lead = getShopLead(shop)
    const referenceNotes = getReferenceNotes(shop)
    const officialLinks = getOfficialLinks(shop)
    const lastVerified = formatJapaneseDate(getLastVerifiedAt(shop)) || '未登録'
    const shippingLink = officialLinks.find((link) => link.label === '配送案内')
    const taxLink = officialLinks.find((link) => link.label === '税金・関税')
    const feeLink = officialLinks.find((link) => link.label === '送料案内')
    const relatedBrands = Array.from(
        new Map(
            (((brandResponse.data as RelatedBrand[] | null) || [])
                .flatMap((item) => item.brands ? [item.brands] : []))
                .map((brand) => [brand.slug, brand])
        ).values()
    ).slice(0, 8)
    const similarShops = (similarResponse.data as SimilarShop[] | null) || []
    const shopTakeaways = getShopTakeaways(shop)
    const shopChecklist = getShopChecklist(shop)

    return (
        <>
            <Header />
            <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#fcfcfb', color: '#111827' }}>
                <style>{`
                    .shop-hero-grid {
                        display: grid;
                        gap: 1.5rem;
                    }

                    .shop-summary-grid {
                        display: grid;
                        gap: 1.5rem;
                    }

                    .shop-guide-grid {
                        display: grid;
                        gap: 1rem;
                    }

                    .shop-cta-row {
                        display: flex;
                        gap: 0.9rem;
                        flex-wrap: wrap;
                    }

                    @media (min-width: 900px) {
                        .shop-hero-grid {
                            grid-template-columns: minmax(0, 1.15fr) minmax(320px, 420px);
                            align-items: start;
                        }
                    }

                    @media (max-width: 899px) {
                        .shop-cta-row > a {
                            width: 100%;
                            text-align: center;
                        }
                    }

                    @media (min-width: 760px) {
                        .shop-summary-grid {
                            grid-template-columns: repeat(3, minmax(0, 1fr));
                        }

                        .shop-guide-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }
                    }
                `}</style>
                <section style={{
                    padding: 'clamp(7.5rem, 12vw, 9.5rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4.5rem)',
                    borderBottom: '1px solid #e7e5e4',
                    background: 'linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)',
                }}>
                    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
                        <Link href="/shops" style={{ color: '#44403c', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'inline-block', marginBottom: '1.8rem' }}>
                            ← ショップ一覧に戻る
                        </Link>

                        <div className="shop-hero-grid">
                            <div>
                                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                    {shop.category && (
                                        <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', color: '#7c2d12', background: '#ffedd5', borderRadius: '999px', padding: '0.35rem 0.8rem' }}>
                                            {shop.category}
                                        </span>
                                    )}
                                    {shop.country && (
                                        <span style={{ fontSize: '0.84rem', color: '#57534e', background: '#f5f5f4', borderRadius: '999px', padding: '0.35rem 0.8rem' }}>
                                            {shop.country}
                                        </span>
                                    )}
                                    <span style={{ fontSize: '0.84rem', color: shop.ships_to_japan === false ? '#9a3412' : '#166534', background: shop.ships_to_japan === false ? '#fff7ed' : '#ecfdf5', borderRadius: '999px', padding: '0.35rem 0.8rem' }}>
                                        {shop.ships_to_japan === false ? '日本発送は要確認' : '日本から確認しやすい候補'}
                                    </span>
                                </div>

                                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.7rem)', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '1.2rem' }}>
                                    {shop.name}
                                </h1>
                            </div>

                            <div style={{
                                background: '#ffffff',
                                border: '1px solid #e7e5e4',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 45px -30px rgba(0, 0, 0, 0.18)',
                            }}>
                                <div style={{ aspectRatio: '16/10', background: '#f5f5f4', position: 'relative' }}>
                                    {shop.image_url ? (
                                        <Image
                                            src={shop.image_url}
                                            alt={shop.name}
                                            fill
                                            sizes="(max-width: 900px) 100vw, 420px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e' }}>
                                            画像は準備中です
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p style={{ fontSize: '1.06rem', lineHeight: 1.85, color: '#44403c', maxWidth: '720px', marginBottom: '1rem' }}>
                                    {lead}
                                </p>
                                {shopTakeaways.length > 0 && (
                                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                        {shopTakeaways.map((item) => (
                                            <span
                                                key={item}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.45rem',
                                                    borderRadius: '999px',
                                                    border: '1px solid #e7e5e4',
                                                    background: '#ffffff',
                                                    padding: '0.55rem 0.85rem',
                                                    fontSize: '0.82rem',
                                                    color: '#44403c',
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="shop-cta-row" style={{ marginTop: '1.5rem' }}>
                                    <a
                                        href={shop.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                            background: '#111827',
                                            color: '#ffffff',
                                            fontWeight: 700,
                                            padding: '0.95rem 1.35rem',
                                            borderRadius: '999px',
                                        }}
                                    >
                                        公式サイトを見る →
                                    </a>
                                    <Link
                                        href="#shop-memo"
                                        style={{
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                            background: '#ffffff',
                                            color: '#111827',
                                            fontWeight: 700,
                                            padding: '0.95rem 1.35rem',
                                            borderRadius: '999px',
                                            border: '1px solid #d6d3d1',
                                        }}
                                    >
                                        参考情報を見る
                                    </Link>
                                </div>
                                {officialLinks.length > 1 && (
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                        {officialLinks.filter((link) => link.label !== '公式サイト').map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    textDecoration: 'none',
                                                    fontWeight: 600,
                                                    color: '#57534e',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {link.label} ↗
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 6vw, 5rem)' }}>
                    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
                        <section className="shop-guide-grid">
                            <div style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.9rem' }}>このショップが向いている人</h2>
                                <div style={{ display: 'grid', gap: '0.8rem' }}>
                                    {shopTakeaways.map((item) => (
                                        <div key={item} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.7rem', alignItems: 'start' }}>
                                            <span style={{ color: '#166534', fontWeight: 700 }}>✓</span>
                                            <p style={{ margin: 0, lineHeight: 1.7, color: '#44403c' }}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.9rem' }}>公式サイトで先に見ること</h2>
                                <div style={{ display: 'grid', gap: '0.8rem' }}>
                                    {shopChecklist.map((item) => (
                                        <div key={item} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.7rem', alignItems: 'start' }}>
                                            <span style={{ color: '#111827', fontWeight: 700 }}>{'\u2022'}</span>
                                            <p style={{ margin: 0, lineHeight: 1.7, color: '#44403c' }}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href={shop.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        marginTop: '1.1rem',
                                        textDecoration: 'none',
                                        fontWeight: 700,
                                        color: '#111827',
                                    }}
                                >
                                    商品一覧を開く ↗
                                </a>
                            </div>
                        </section>

                        <section id="shop-memo" style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.6rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.35rem', margin: 0 }}>送料・関税・配送の参考情報</h2>
                                <span style={{ fontSize: '0.88rem', color: '#78716c' }}>最終確認 {lastVerified}</span>
                            </div>
                            <div className="shop-summary-grid">
                                {referenceNotes.map((note) => {
                                    const noteLink =
                                        note.label === '日本発送' ? shippingLink :
                                            note.label === '関税・消費税' ? taxLink :
                                                feeLink

                                    return (
                                        <div key={note.label} style={{ padding: '1rem 1.05rem', border: '1px solid #f0eeeb', borderRadius: '18px', background: '#fcfcfb' }}>
                                            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.35rem' }}>
                                                {note.label}
                                            </p>
                                            <p style={{ margin: 0, lineHeight: 1.8, color: '#44403c' }}>{note.body}</p>
                                            {noteLink && (
                                                <a
                                                    href={noteLink.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ display: 'inline-block', marginTop: '0.75rem', color: '#111827', fontWeight: 600, textDecoration: 'none' }}
                                                >
                                                    公式の案内を見る ↗
                                                </a>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        <section style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.6rem' }}>
                            <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>取扱ブランドの一例</h2>
                            {relatedBrands.length > 0 ? (
                                <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                                    {relatedBrands.map((brand) => (
                                        <Link
                                            key={brand.slug}
                                            href={`/brands/${brand.slug}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#111827',
                                                background: '#f5f5f4',
                                                border: '1px solid #e7e5e4',
                                                borderRadius: '999px',
                                                padding: '0.55rem 0.9rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {brand.name}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.8 }}>
                                    取扱ブランド例は準備中です。ブランド一覧や公式サイトの商品一覧から確認できます。
                                </p>
                            )}
                        </section>

                        <section style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.6rem' }}>
                            <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>似ているショップ</h2>
                            {similarShops.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                                    {similarShops.map((similar) => (
                                        <Link
                                            key={similar.slug}
                                            href={`/shops/${similar.slug}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#111827',
                                                border: '1px solid #eceae7',
                                                borderRadius: '20px',
                                                overflow: 'hidden',
                                                background: '#fcfcfb',
                                            }}
                                        >
                                            <div style={{ aspectRatio: '16/9', background: '#f5f5f4', position: 'relative' }}>
                                                {similar.image_url ? (
                                                    <Image
                                                        src={similar.image_url}
                                                        alt={similar.name}
                                                        fill
                                                        sizes="(max-width: 760px) 100vw, 320px"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                ) : null}
                                            </div>
                                            <div style={{ padding: '1rem 1.05rem' }}>
                                                <div style={{ fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.5 }}>{similar.name}</div>
                                                <div style={{ fontSize: '0.88rem', color: '#6b7280', marginBottom: '0.35rem' }}>{similar.country || shop.country}</div>
                                                <div style={{ fontSize: '0.9rem', color: '#57534e', lineHeight: 1.65 }}>
                                                    {similar.description || '同じカテゴリで比較しやすいショップです。'}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.8 }}>
                                    同カテゴリのショップは準備中です。ショップ一覧から他の候補も見られます。
                                </p>
                            )}
                        </section>

                        <section style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.5rem' }}>
                            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.75rem' }}>
                                あわせて読む
                            </p>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {CORE_GUIDE_LINKS.map((guide) => (
                                    <Link key={guide.href} href={guide.href} style={{ textDecoration: 'none', color: '#111827', fontWeight: 600 }}>
                                        {guide.title} →
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
