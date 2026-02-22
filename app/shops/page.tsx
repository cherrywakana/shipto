import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

export const dynamic = 'force-dynamic'

export default async function ShopsPage(props: any) {
    // Next.js 15+ では searchParams は Promise になる場合がある
    // あらゆる環境に対応するため、await で解決してから使用する
    let searchParams = props.searchParams;
    if (searchParams instanceof Promise) {
        searchParams = await searchParams;
    }

    const category = searchParams?.category;

    // DBクエリの実行
    let query = supabase
        .from('shops')
        .select('id, name, slug, url, country, category, image_url, description')
        .order('name', { ascending: true })

    if (category) {
        // もし配列で渡ってきた場合でも対応できるようにする
        const categoryValue = Array.isArray(category) ? category[0] : category;
        query = query.eq('category', categoryValue)
    }

    const { data: shops, error } = await query

    if (error) {
        console.error('Supabase error in /shops:', error)
    }

    const categories = [
        { label: 'すべて', href: '/shops' },
        { label: 'ラグジュアリー・百貨店', icon: '💎', href: '/shops?category=' + encodeURIComponent('ラグジュアリー・百貨店') },
        { label: 'セレクト・トレンド', icon: '👗', href: '/shops?category=' + encodeURIComponent('セレクト・トレンド') },
        { label: 'ストリート・スニーカー', icon: '👟', href: '/shops?category=' + encodeURIComponent('ストリート・スニーカー') },
        { label: 'アウトドア', icon: '🏕️', href: '/shops?category=' + encodeURIComponent('アウトドア') },
        { label: 'アウトレット・リセール', icon: '🏷️', href: '/shops?category=' + encodeURIComponent('アウトレット・リセール') },
        { label: 'アジア・トレンド', icon: '🇰🇷', href: '/shops?category=' + encodeURIComponent('アジア・トレンド') },
    ]

    return (
        <>
            <Header />
            <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
                <style>{`
          .shop-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
            height: 100%;
          }
          .shop-card:hover {
            border-color: #6366f1;
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04);
          }
          .cat-tab {
            padding: 0.6rem 1.2rem;
            border-radius: 100px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s;
            white-space: nowrap;
            border: 1px solid transparent;
          }
          .cat-tab.active {
            background: #6366f1;
            color: white;
          }
          .cat-tab.inactive {
            background: white;
            color: #64748b;
            border-color: #e2e8f0;
          }
          .cat-tab.inactive:hover {
            border-color: #6366f1;
            color: #6366f1;
          }
        `}</style>

                <section style={{
                    padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 40%, #ede9fe 100%)',
                    textAlign: 'center',
                    borderBottom: '1px solid #e2e8f0',
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 850,
                        letterSpacing: '-0.04em', color: '#0f172a', lineHeight: 1.1, marginBottom: '1.5rem',
                    }}>
                        ショップ名鑑
                    </h1>

                    <div style={{
                        display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto'
                    }}>
                        {categories.map((cat) => {
                            const isActive = (!category && cat.label === 'すべて') || (category === cat.label);
                            return (
                                <Link
                                    key={cat.label}
                                    href={cat.href}
                                    className={`cat-tab ${isActive ? 'active' : 'inactive'}`}
                                >
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section style={{ padding: '4rem clamp(1.5rem, 5vw, 4rem)', maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
                        gap: '2rem',
                    }}>
                        {shops?.map((shop) => (
                            <div key={shop.id} className="shop-card">
                                <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f1f5f9', position: 'relative' }}>
                                    {shop.image_url ? (
                                        <img
                                            src={shop.image_url}
                                            alt={shop.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🛍️</div>
                                    )}
                                </div>

                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                            {shop.category}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>📍 {shop.country}</span>
                                    </div>

                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>{shop.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                                        {shop.description}
                                    </p>

                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <a
                                            href={shop.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                flex: 1,
                                                textAlign: 'center',
                                                background: '#0f172a',
                                                color: 'white',
                                                padding: '0.75rem',
                                                borderRadius: '12px',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            公式サイト
                                        </a>
                                        {shop.slug && (
                                            <Link
                                                href={`/articles/${shop.slug}-guide`}
                                                style={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    background: 'white',
                                                    color: '#0f172a',
                                                    padding: '0.75rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                    textDecoration: 'none',
                                                    border: '1px solid #e2e8f0'
                                                }}
                                            >
                                                解説ガイド
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!shops || shops.length === 0) && !error && (
                        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                            <p style={{ color: '#64748b' }}>該当するショップが見つかりませんでした。</p>
                        </div>
                    )}

                    {error && (
                        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#ef4444' }}>
                            <p>データの取得中にエラーが発生しました。</p>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}
