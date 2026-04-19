import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

function hashString(value: string) {
    return Array.from(value).reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) % 360, 17)
}

function stripTags(value: string) {
    return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function splitTitle(title: string) {
    const plain = title.replace(/【.*?】/g, '').trim()
    const match = plain.match(/^(.*?)(海外通販サイトおすすめ\d+選|海外通販おすすめ\d+選|海外通販サイト|海外通販|おすすめ\d+選|おすすめ)$/)

    if (match) {
        return {
            eyebrow: match[1].trim(),
            headline: match[2].trim(),
        }
    }

    const midpoint = Math.ceil(plain.length / 2)
    return {
        eyebrow: plain.slice(0, midpoint).trim(),
        headline: plain.slice(midpoint).trim() || plain,
    }
}

function extractShopNames(content: string) {
    const headingMatches = Array.from(content.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi))
        .map((match) => stripTags(match[1]))
        .filter(Boolean)
        .slice(0, 3)

    if (headingMatches.length > 0) return headingMatches

    const tableMatches = Array.from(content.matchAll(/<td[^>]*>(.*?)<\/td>/gi))
        .map((match) => stripTags(match[1]))
        .filter(Boolean)
        .slice(0, 3)

    return tableMatches
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const { data: post } = await supabase
        .from('posts')
        .select('title, category, content')
        .eq('slug', slug)
        .single()

    const title = post?.title || '海外通販ガイド'
    const category = post?.category || 'Original Price'
    const { eyebrow, headline } = splitTitle(title)
    const shops = extractShopNames(post?.content || '')
    const hue = hashString(slug)
    const accent = (hue + 36) % 360
    const secondary = (hue + 214) % 360

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    position: 'relative',
                    background: `linear-gradient(135deg, hsl(${hue} 60% 96%) 0%, hsl(${accent} 50% 91%) 52%, hsl(${secondary} 46% 88%) 100%)`,
                    fontFamily: 'Arial',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '-30px',
                        width: '260px',
                        height: '260px',
                        borderRadius: '999px',
                        background: `hsla(${accent} 70% 55% / 0.16)`,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-50px',
                        left: '-20px',
                        width: '280px',
                        height: '280px',
                        borderRadius: '999px',
                        background: `hsla(${secondary} 70% 52% / 0.16)`,
                    }}
                />
                <div
                    style={{
                        margin: '72px 84px',
                        width: '1032px',
                        height: '486px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '34px',
                        padding: '52px 48px 42px',
                        background: 'rgba(255,255,255,0.82)',
                        border: '1px solid rgba(17,17,16,0.08)',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignSelf: 'flex-start',
                                padding: '10px 18px',
                                borderRadius: '999px',
                                background: '#111110',
                                color: '#FAFAF9',
                                fontSize: '18px',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                            }}
                        >
                            ORIGINAL PRICE
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ color: '#555553', fontSize: '30px', fontWeight: 700 }}>
                                {eyebrow}
                            </div>
                            <div style={{ color: '#111110', fontSize: '62px', fontWeight: 800, lineHeight: 1.12 }}>
                                {headline}
                            </div>
                            <div style={{ color: '#6B6B69', fontSize: '26px', fontWeight: 500 }}>
                                {category}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignSelf: 'flex-start',
                                padding: '16px 20px',
                                borderRadius: '18px',
                                background: 'rgba(17,17,16,0.06)',
                                color: '#111110',
                                fontSize: '24px',
                                fontWeight: 700,
                            }}
                        >
                            {(shops.length > 0 ? shops : ['おすすめショップ比較']).join('  •  ')}
                        </div>
                        <div style={{ color: '#555553', fontSize: '22px', fontWeight: 500 }}>
                            海外通販で探しやすいショップを比較
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
