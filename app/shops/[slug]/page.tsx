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
                <main className="container" style={{ paddingTop: '10rem', minHeight: '100vh' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>ショップが見つかりません。</p>
                    <Link href="/shops" className="btn btn-secondary">← ショップ一覧に戻る</Link>
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
            .limit(12),
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
    const lastVerified = formatJapaneseDate(getLastVerifiedAt(shop)) || '未確認'
    
    const relatedBrands = Array.from(
        new Map(
            (((brandResponse.data as RelatedBrand[] | null) || [])
                .flatMap((item) => item.brands ? [item.brands] : []))
                .map((brand) => [brand.slug, brand])
        ).values()
    )
    const similarShops = (similarResponse.data as SimilarShop[] | null) || []
    const shopTakeaways = getShopTakeaways(shop)
    const shopChecklist = getShopChecklist(shop)

    return (
        <>
            <Header />
            <main style={{ background: 'var(--bg)', color: 'var(--text-primary)', overflow: 'hidden' }}>
                <style>{`
                    .hero-section {
                        padding-top: clamp(8rem, 15vw, 12rem);
                        padding-bottom: clamp(4rem, 8vw, 6rem);
                        background: radial-gradient(circle at top right, rgba(0,0,0,0.03) 0%, transparent 70%);
                        border-bottom: 1px solid var(--border-soft);
                    }
                    .shop-header {
                        display: grid;
                        gap: 3rem;
                        grid-template-columns: 1fr;
                    }
                    @media (min-width: 1024px) {
                        .shop-header {
                            grid-template-columns: 1.2fr 0.8fr;
                            align-items: center;
                        }
                    }
                    .visual-card {
                        position: relative;
                        background: var(--surface);
                        border: 1px solid var(--border);
                        border-radius: var(--radius-lg);
                        overflow: hidden;
                        box-shadow: 0 30px 60px -20px rgba(0,0,0,0.12);
                    }
                    .policy-grid {
                        display: grid;
                        gap: 1rem;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    }
                    .policy-card {
                        background: var(--surface);
                        border: 1px solid var(--border);
                        border-radius: var(--radius-md);
                        padding: 1.75rem;
                        display: grid;
                        gap: 0.75rem;
                    }
                    .brand-tag {
                        background: var(--surface);
                        border: 1px solid var(--border);
                        padding: 0.5rem 1.25rem;
                        border-radius: var(--radius-pill);
                        font-size: 0.85rem;
                        font-weight: 600;
                        transition: all 0.2s var(--ease-out);
                    }
                    .brand-tag:hover {
                        border-color: var(--text-primary);
                        transform: translateY(-1px);
                    }
                    .verified-badge {
                        font-size: 0.7rem;
                        font-weight: 700;
                        color: #166534;
                        background: #f0fdf4;
                        border: 1px solid #bbf7d0;
                        padding: 0.25rem 0.65rem;
                        border-radius: var(--radius-pill);
                        display: inline-flex;
                        align-items: center;
                        gap: 0.3rem;
                    }
                `}</style>

                {/* Hero Section */}
                <section className="hero-section">
                    <div className="container">
                        <div className="shop-header">
                            <div className="fade-up">
                                <Link href="/shops" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontWeight: 500 }}>
                                    ← ショップ一覧
                                </Link>
                                
                                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                    <span className="tag">{shop.category || 'Shop Profile'}</span>
                                    {shop.country && <span className="tag" style={{ background: 'transparent' }}>{shop.country}</span>}
                                    <div className="verified-badge">
                                        ✨ VERIFIED: {lastVerified}
                                    </div>
                                </div>

                                <h1 style={{ 
                                    fontFamily: 'var(--font-serif)', 
                                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                                    lineHeight: 1.1, 
                                    letterSpacing: '-0.04em',
                                    marginBottom: '2rem'
                                }}>
                                    {shop.name}
                                </h1>

                                <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem' }}>
                                    {lead}
                                </p>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <a href={shop.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                                        公式サイトで探す →
                                    </a>
                                </div>
                            </div>

                            <div className="fade-up delay-2">
                                <div className="visual-card">
                                    <div style={{ aspectRatio: '16/10', position: 'relative', background: 'var(--accent-brand-soft)' }}>
                                        {shop.image_url ? (
                                            <Image 
                                                src={shop.image_url} 
                                                alt={shop.name} 
                                                fill 
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 1024px) 100vw, 500px"
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Preview Loading...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Policies & Guides */}
                <section style={{ padding: '6rem 0', background: 'white' }}>
                    <div className="container">
                        <div style={{ marginBottom: '4rem' }}>
                            <p className="section-label">Shopping Policy</p>
                            <h2 className="section-title">配送・関税の基礎情報</h2>
                        </div>

                        <div className="policy-grid">
                            {referenceNotes.map((note, idx) => (
                                <div key={note.label} className={`policy-card fade-up delay-${idx + 1}`}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                                            {note.label === '日本発送' ? '📦 ' + note.label : note.label === '関税・消費税' ? '🏛️ ' + note.label : '✈️ ' + note.label}
                                        </h3>
                                    </div>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.7, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
                                        {note.body}
                                    </p>
                                    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                                        {idx === 0 && shop.shipping_url && <a href={shop.shipping_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>公式配送ルールを確認 ↗</a>}
                                        {idx === 1 && shop.tax_url && <a href={shop.tax_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>公式の税金案内 ↗</a>}
                                        {idx === 2 && shop.fee_url && <a href={shop.fee_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>公式の送料ガイド ↗</a>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checklist */}
                        <div style={{ marginTop: '5rem', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '3rem' }} className="fade-up delay-3">
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>利用のヒント</h3>
                            <div style={{ display: 'grid', gap: '1.25rem' }}>
                                {shopChecklist.map((tip) => (
                                    <div key={tip} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                        <span style={{ flexShrink: 0, marginTop: '0.2rem' }}>✦</span>
                                        <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.6 }}>{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Brands Area */}
                <section style={{ padding: '6rem 0' }}>
                    <div className="container">
                        <div style={{ marginBottom: '3rem' }}>
                            <p className="section-label">Available Brands</p>
                            <h2 className="section-title">取扱ブランドの一例</h2>
                        </div>
                        
                        {relatedBrands.length > 0 ? (
                            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                                {relatedBrands.map((brand) => (
                                    <Link key={brand.slug} href={`/brands/${brand.slug}`} className="brand-tag">
                                        {brand.name}
                                    </Link>
                                ))}
                                <span className="brand-tag" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                                    & more available on site
                                </span>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-muted)' }}>ブランド情報は準備中です。公式サイトで全ラインナップを確認できます。</p>
                        )}
                    </div>
                </section>

                {/* Similar Shops */}
                {similarShops.length > 0 && (
                    <section style={{ padding: '6rem 0', background: 'var(--surface)', borderTop: '1px solid var(--border-soft)' }}>
                        <div className="container">
                            <div style={{ marginBottom: '3rem' }}>
                                <p className="section-label">Comparison</p>
                                <h2 className="section-title">似ているショップを比較</h2>
                            </div>
                            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                                {similarShops.map((item) => (
                                    <Link key={item.slug} href={`/shops/${item.slug}`} className="card" style={{ overflow: 'hidden' }}>
                                        <div style={{ aspectRatio: '16/9', position: 'relative', background: 'var(--bg)' }}>
                                            {item.image_url ? (
                                                <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                            ) : null}
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {item.description || `${item.country || '海外'}拠点の有力${shop.category}ショップ。`}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer Guide Links */}
                <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-soft)' }}>
                    <div className="container" style={{ maxWidth: '600px' }}>
                        <p className="section-label">Shopping Guides</p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '2rem' }}>
                            初めての個人輸入でも安心なガイド
                        </h2>
                        <style>{`
                            .footer-guide-link {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 1.25rem;
                                border: 1px solid var(--border);
                                border-radius: var(--radius-md);
                                font-weight: 600;
                                background: white;
                                transition: all 0.2s;
                            }
                            .footer-guide-link:hover {
                                border-color: var(--text-primary);
                            }
                        `}</style>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {CORE_GUIDE_LINKS.map(link => (
                                <Link key={link.href} href={link.href} className="footer-guide-link">
                                    {link.title} <span>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
