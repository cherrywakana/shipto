import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

const PHOTO_BACKGROUNDS = {
    sneaker: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    bag: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    outdoor: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80',
    brand: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
} as const

function stripTags(value: string) {
    return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractBrandName(title: string) {
    const plain = title.replace(/【.*?】/g, '').trim()
    const cleaned = plain
        .replace(/(が買える|が安い|を買うなら|海外通販サイトおすすめ\d+選|海外通販おすすめ\d+選|海外通販サイト|海外通販|おすすめ\d+選|おすすめ).*$/, '')
        .trim()

    return cleaned || plain
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

function inferMotif(title: string, content: string) {
    const text = `${title} ${content}`.toLowerCase()

    if (/sneaker|スニーカー|street|ストリート|kith|nike|adidas|new balance|salomon|on |supreme|stussy/.test(text)) {
        return 'sneaker'
    }
    if (/bag|バッグ|財布|leather|レザー|luxury|ラグジュアリー|high brand|ハイブランド|celine|valentino|saint laurent|burberry|jacquemus/.test(text)) {
        return 'bag'
    }
    if (/beauty|香水|コスメ|skincare|美容|aesop/.test(text)) {
        return 'beauty'
    }
    if (/outdoor|アウトドア|camp|登山|patagonia|arc'teryx|arcteryx/.test(text)) {
        return 'outdoor'
    }

    return 'brand'
}

async function toDataUrl(imageUrl: string) {
    const response = await fetch(imageUrl)
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await response.arrayBuffer())
    return `data:${contentType};base64,${buffer.toString('base64')}`
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
    const brandName = extractBrandName(title)
    const { eyebrow, headline } = splitTitle(title)
    const shops = extractShopNames(post?.content || '')
    const motif = inferMotif(title, post?.content || '')
    const backgroundSrc = await toDataUrl(PHOTO_BACKGROUNDS[motif])
    const monogram = brandName
        .replace(/[^A-Za-z0-9]/g, '')
        .slice(0, 4)
        .toUpperCase() || brandName.slice(0, 2).toUpperCase()

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'Arial',
                    color: 'white',
                    background: '#111110',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={backgroundSrc}
                    alt=""
                    width={1200}
                    height={630}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '1200px',
                        height: '630px',
                        objectFit: 'cover',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(17,17,16,0.82) 0%, rgba(17,17,16,0.64) 44%, rgba(17,17,16,0.22) 100%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(17,17,16,0.16) 0%, rgba(17,17,16,0.3) 100%)',
                    }}
                />

                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        padding: '64px 72px',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ width: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignSelf: 'flex-start',
                                    padding: '10px 16px',
                                    borderRadius: '999px',
                                    background: 'rgba(255,255,255,0.14)',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                }}
                            >
                                ORIGINAL PRICE
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ fontSize: '28px', fontWeight: 700, color: 'rgba(255,255,255,0.84)' }}>
                                    {eyebrow}
                                </div>
                                <div style={{ fontSize: '60px', fontWeight: 800, lineHeight: 1.08 }}>
                                    {headline}
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                                    {category}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                }}
                            >
                                {(shops.length > 0 ? shops : ['おすすめショップ比較']).map((shop) => (
                                    <div
                                        key={shop}
                                        style={{
                                            display: 'flex',
                                            padding: '11px 16px',
                                            borderRadius: '999px',
                                            background: 'rgba(255,255,255,0.14)',
                                            border: '1px solid rgba(255,255,255,0.16)',
                                            fontSize: '22px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {shop}
                                    </div>
                                ))}
                            </div>
                            <div style={{ fontSize: '22px', fontWeight: 500, color: 'rgba(255,255,255,0.84)' }}>
                                海外通販で探しやすいショップを比較
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '280px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '14px',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '100px',
                                    fontWeight: 900,
                                    letterSpacing: '-0.06em',
                                    lineHeight: 1,
                                    textShadow: '0 12px 36px rgba(0,0,0,0.28)',
                                }}
                            >
                                {monogram}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '12px 18px',
                                    borderRadius: '18px',
                                    background: 'rgba(17,17,16,0.64)',
                                    border: '1px solid rgba(255,255,255,0.14)',
                                    fontSize: '30px',
                                    fontWeight: 800,
                                    textAlign: 'right',
                                }}
                            >
                                {brandName}
                            </div>
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
