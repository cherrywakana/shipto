import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CORE_GUIDE_LINKS } from '@/lib/shopInsights'
import { formatJapaneseDate, getLastVerifiedAt } from '@/lib/utils'
import {
    getOfficialLinks,
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
    const relatedBrands = Array.from(
        new Map(
            (((brandResponse.data as RelatedBrand[] | null) || [])
                .flatMap((item) => item.brands ? [item.brands] : []))
                .map((brand) => [brand.slug, brand])
        ).values()
    ).slice(0, 8)
    const similarShops = (similarResponse.data as SimilarShop[] | null) || []

    return (
        <>
            <Header />
            <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#fcfcfb', color: '#111827' }}>
                <section style={{
                    padding: 'clamp(7.5rem, 12vw, 9.5rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4.5rem)',
                    borderBottom: '1px solid #e7e5e4',
                    background: 'linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)',
                }}>
                    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
                        <Link href="/shops" style={{ color: '#44403c', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'inline-block', marginBottom: '1.8rem' }}>
                            ← ショップ一覧に戻る
                        </Link>

                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 560px', minWidth: 0 }}>
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

                                <p style={{ fontSize: '1.06rem', lineHeight: 1.85, color: '#44403c', maxWidth: '720px', marginBottom: '1rem' }}>
                                    {lead}
                                </p>
                                <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
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
                            </div>

                            <div style={{ flex: '0 1 360px', minWidth: '300px', display: 'grid', gap: '1rem' }}>
                                <div style={{
                                    background: '#ffffff',
                                    border: '1px solid #e7e5e4',
                                    borderRadius: '28px',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 45px -30px rgba(0, 0, 0, 0.18)',
                                }}>
                                    <div style={{ aspectRatio: '16/10', background: '#f5f5f4' }}>
                                        {shop.image_url ? (
                                            <img
                                                src={shop.image_url}
                                                alt={`${shop.name} のショップイメージ`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e' }}>
                                                画像は準備中です
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '1.2rem 1.3rem' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#a8a29e', marginBottom: '0.25rem' }}>ショップイメージ</div>
                                        <div style={{ fontWeight: 700, lineHeight: 1.6 }}>{shop.name} のトップ画面イメージ</div>
                                    </div>
                                </div>

                                <div style={{
                                    background: '#ffffff',
                                    border: '1px solid #e7e5e4',
                                    borderRadius: '24px',
                                    padding: '1.2rem 1.3rem',
                                }}>
                                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#a8a29e', marginBottom: '0.15rem' }}>最終確認</div>
                                            <div style={{ fontWeight: 700 }}>{lastVerified}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#a8a29e', marginBottom: '0.15rem' }}>購入前に見る場所</div>
                                            <div style={{ fontWeight: 700, lineHeight: 1.5 }}>公式ヘルプとチェックアウト画面</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 6vw, 5rem)' }}>
                    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(280px, 0.95fr)' }}>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <section id="shop-memo" style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.6rem' }}>
                                <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>送料・関税・配送の参考情報</h2>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
                                    {referenceNotes.map((note) => (
                                        <div key={note.label} style={{ padding: '1rem 1.05rem', border: '1px solid #f0eeeb', borderRadius: '18px', background: '#fcfcfb' }}>
                                            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.35rem' }}>
                                                {note.label}
                                            </p>
                                            <p style={{ margin: 0, lineHeight: 1.8, color: '#44403c' }}>{note.body}</p>
                                        </div>
                                    ))}
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
                                                <div style={{ aspectRatio: '16/9', background: '#f5f5f4' }}>
                                                    {similar.image_url ? (
                                                        <img
                                                            src={similar.image_url}
                                                            alt={similar.name}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
                            <section style={{ background: '#fffaf5', border: '1px solid #f3e8d8', borderRadius: '24px', padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>公式で確認するページ</h2>
                                <p style={{ color: '#6b7280', lineHeight: 1.75, marginBottom: '1rem' }}>
                                    条件が変わりやすい情報は、下のリンク先で最終確認する前提にしています。
                                </p>
                                <div style={{ display: 'grid', gap: '0.85rem' }}>
                                    {officialLinks.map((link) => (
                                        <a
                                            key={`${link.label}-${link.href}`}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'block',
                                                background: '#ffffff',
                                                border: '1px solid #eadfce',
                                                borderRadius: '18px',
                                                padding: '1rem 1.05rem',
                                                color: '#111827',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{link.label} ↗</div>
                                            <div style={{ color: '#6b7280', lineHeight: 1.65, fontSize: '0.92rem' }}>{link.description}</div>
                                        </a>
                                    ))}
                                </div>
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

                            <section style={{ background: '#111827', color: '#ffffff', borderRadius: '24px', padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.7rem' }}>公式サイトを見る</h2>
                                <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '1rem' }}>
                                    商品一覧、対象ブランド、最終的な送料や関税は、公式サイトでそのまま確認できます。
                                </p>
                                <a
                                    href={shop.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        textDecoration: 'none',
                                        background: '#ffffff',
                                        color: '#111827',
                                        fontWeight: 700,
                                        padding: '0.82rem 1.2rem',
                                        borderRadius: '999px',
                                    }}
                                >
                                    {shop.name} を見る →
                                </a>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
