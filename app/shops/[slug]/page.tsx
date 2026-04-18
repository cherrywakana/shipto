import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CORE_GUIDE_LINKS } from '@/lib/shopInsights'
import { formatJapaneseDate, getLastVerifiedAt } from '@/lib/utils'
import {
    getOfficialLinks,
    getReferenceNotes,
    getShopChecklist,
    getShopLead,
    getShopTakeaways,
} from '@/lib/shopDetail'

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

    const lead = getShopLead(shop)
    const takeaways = getShopTakeaways(shop)
    const referenceNotes = getReferenceNotes(shop)
    const checklist = getShopChecklist(shop)
    const officialLinks = getOfficialLinks(shop)
    const lastVerified = formatJapaneseDate(getLastVerifiedAt(shop)) || '未登録'

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

                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
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
                                <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: '#78716c', maxWidth: '720px' }}>
                                    このページは、日本に送れるショップを探すための参考ページです。最新の送料・関税・配送条件は、購入前に公式サイトをご確認ください。
                                </p>
                            </div>

                            <div style={{
                                flex: '0 1 280px',
                                minWidth: '260px',
                                background: '#ffffff',
                                border: '1px solid #e7e5e4',
                                borderRadius: '24px',
                                padding: '1.35rem 1.4rem',
                                boxShadow: '0 20px 45px -30px rgba(0, 0, 0, 0.18)',
                            }}>
                                <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.8rem' }}>
                                    Quick Note
                                </p>
                                <div style={{ display: 'grid', gap: '0.85rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#a8a29e', marginBottom: '0.2rem' }}>位置づけ</div>
                                        <div style={{ fontWeight: 700, lineHeight: 1.5 }}>日本から探しやすいショップの入口</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#a8a29e', marginBottom: '0.2rem' }}>最終確認</div>
                                        <div style={{ fontWeight: 700, lineHeight: 1.5 }}>{lastVerified}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#a8a29e', marginBottom: '0.2rem' }}>購入前に見る場所</div>
                                        <div style={{ fontWeight: 700, lineHeight: 1.5 }}>公式ヘルプとチェックアウト画面</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) 0' }}>
                    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                        {takeaways.map((item, index) => (
                            <div key={index} style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '20px', padding: '1.3rem 1.35rem' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.65rem' }}>
                                    Point {index + 1}
                                </p>
                                <p style={{ margin: 0, lineHeight: 1.75, color: '#292524' }}>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 6vw, 5rem)' }}>
                    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(280px, 0.95fr)' }}>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <section style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.6rem' }}>
                                <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>日本から使うときの参考メモ</h2>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {referenceNotes.map((note) => (
                                        <div key={note.label} style={{ paddingBottom: '1rem', borderBottom: '1px solid #f0eeeb' }}>
                                            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', marginBottom: '0.35rem' }}>
                                                {note.label}
                                            </p>
                                            <p style={{ margin: 0, lineHeight: 1.8, color: '#44403c' }}>{note.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section style={{ background: '#ffffff', border: '1px solid #eceae7', borderRadius: '24px', padding: '1.6rem' }}>
                                <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>購入前チェック</h2>
                                <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9, color: '#44403c' }}>
                                    {checklist.map((item) => (
                                        <li key={item} style={{ marginBottom: '0.55rem' }}>{item}</li>
                                    ))}
                                </ul>
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
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.7rem' }}>最新条件は公式サイトへ</h2>
                                <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '1rem' }}>
                                    当サイトはショップ探しの入口です。最終的な送料・関税・配送可否は、公式サイトとチェックアウト画面でご確認ください。
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
                                    公式サイトを開く →
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
