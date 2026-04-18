import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '運営者情報 - Original Price',
    description: 'Original Priceの運営方針、掲載基準、アフィリエイトプログラムについて。日本に送れる海外通販ショップを探しやすく整理し、詳細条件は公式サイト確認を前提に案内しています。',
}

export default function AboutPage() {
    const sections = [
        {
            icon: '🎯',
            title: 'サイトの目的',
            content: 'Original Priceは、日本に送れる海外通販ショップを見つけやすくするためのガイドサイトです。ショップ探しの入口として使いやすいことを大切にしつつ、細かい配送条件や料金は公式サイトで確認しやすいよう導線を整えることを目指しています。',
        },
        {
            icon: '✅',
            title: '掲載基準',
            items: [
                '日本への直送に対応している、または日本から注文導線を確認しやすいこと',
                '実在するショップであり、現在も正常に運営されていること',
                '一定の知名度や実績があり、参考先として紹介する価値があること',
                '掲載する補足情報は参考用とし、最新条件は公式サイト確認を前提に案内すること',
            ],
        },
        {
            icon: '📝',
            title: '情報の考え方',
            content: '送料・関税・配送日数などは変わりやすいため、当サイトでは「ショップ探しの参考になる簡単な情報」を掲載しています。購入前の最終判断には、必ず各ショップの公式ページをご確認ください。',
        },
        {
            icon: '🤝',
            title: 'アフィリエイトプログラムについて',
            content: '当サイトは、アフィリエイトプログラムに参加しています。当サイトのリンクを経由してお買い物をされた場合、当サイトがアフィリエイト報酬を受け取ることがあります。なお、これによりお客様の購入価格が変わることはありません。アフィリエイト報酬は、サイトの運営・改善費用に充てています。',
        },
        {
            icon: '📧',
            title: 'お問い合わせ',
            content: 'サイトに関するお問い合わせ、掲載情報の修正依頼、新しいショップの掲載リクエストなどがございましたら、お気軽にご連絡ください。',
            email: 'contact@original-price.com',
        },
    ]

    return (
        <>
            <Header />
            <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#f8fafc', minHeight: '100vh' }}>

                {/* Hero Section */}
                <section style={{
                    padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem',
                    background: '#fafaf9',
                    textAlign: 'center',
                    borderBottom: '1px solid #e2e8f0',
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 850,
                            letterSpacing: '-0.04em', color: '#0f172a', lineHeight: 1.1, marginBottom: '1.5rem',
                        }}>
                            運営者情報
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: 1.6 }}>
                            Original Priceについて
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section style={{ padding: '4rem clamp(1.5rem, 5vw, 4rem)', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {sections.map((section) => (
                            <div key={section.title} style={{
                                background: 'white', borderRadius: '20px', padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                                border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    <span style={{ fontSize: '1.75rem' }}>{section.icon}</span>
                                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{section.title}</h2>
                                </div>

                                {section.content && (
                                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.85 }}>
                                        {section.content}
                                    </p>
                                )}

                                {section.items && (
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
                                        {section.items.map((item) => (
                                            <li key={item} style={{
                                                fontSize: '0.95rem', color: '#475569', lineHeight: 1.75,
                                                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                                            }}>
                                                <span style={{ color: '#111110', fontWeight: 700, flexShrink: 0 }}>✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.email && (
                                    <p style={{ marginTop: '1rem' }}>
                                        <a href={`mailto:${section.email}`} style={{
                                            color: '#111110', fontWeight: 600, textDecoration: 'none',
                                            fontSize: '0.95rem',
                                        }}>
                                            {section.email}
                                        </a>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{
                        marginTop: '4rem', padding: '2.5rem', background: '#0f172a',
                        borderRadius: '20px', textAlign: 'center', color: 'white',
                    }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>ショップを探してみませんか？</h3>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
                            日本に送れる海外通販ショップを探しやすくまとめています。
                        </p>
                        <Link href="/shops" style={{
                            display: 'inline-block', background: 'white', color: '#0f172a',
                            padding: '0.85rem 2.25rem', borderRadius: '999px',
                            textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', transition: 'transform 0.2s',
                        }}>
                            ショップ一覧へ →
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
