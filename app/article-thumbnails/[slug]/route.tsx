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

function extractBrandName(title: string) {
    const plain = title.replace(/【.*?】/g, '').trim()
    const cleaned = plain
        .replace(/(が買える|が安い|を買うなら|海外通販サイトおすすめ\d+選|海外通販おすすめ\d+選|海外通販サイト|海外通販|おすすめ\d+選|おすすめ).*$/, '')
        .trim()
    return cleaned || plain
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

    if (/sneaker|スニーカー|street|ストリート|kith|nike|adidas|new balance|salomon|on /.test(text)) {
        return 'sneaker'
    }
    if (/bag|バッグ|財布|レザー|luxury|ラグジュアリー|high brand|ハイブランド/.test(text)) {
        return 'bag'
    }
    if (/beauty|香水|コスメ|skincare|美容/.test(text)) {
        return 'beauty'
    }
    if (/outdoor|アウトドア|camp|登山|patagonia|arc'teryx|arcteryx/.test(text)) {
        return 'outdoor'
    }

    return 'brand'
}

function renderMotif(motif: string, accentHue: number) {
    if (motif === 'sneaker') {
        return (
            <div
                style={{
                    position: 'relative',
                    width: '280px',
                    height: '180px',
                    display: 'flex',
                }}
            >
                <div style={{ position: 'absolute', left: '26px', top: '68px', width: '206px', height: '58px', borderRadius: '24px 32px 22px 18px', background: `hsl(${accentHue} 72% 55%)`, transform: 'skewX(-18deg)' }} />
                <div style={{ position: 'absolute', left: '166px', top: '56px', width: '74px', height: '62px', borderRadius: '18px', background: `hsl(${accentHue} 68% 35%)`, transform: 'rotate(12deg)' }} />
                <div style={{ position: 'absolute', left: '22px', top: '120px', width: '220px', height: '24px', borderRadius: '999px', background: '#111110' }} />
                <div style={{ position: 'absolute', left: '74px', top: '84px', width: '70px', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.82)' }} />
                <div style={{ position: 'absolute', left: '76px', top: '102px', width: '84px', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.82)' }} />
            </div>
        )
    }

    if (motif === 'bag') {
        return (
            <div style={{ position: 'relative', width: '250px', height: '210px', display: 'flex' }}>
                <div style={{ position: 'absolute', left: '34px', top: '44px', width: '182px', height: '126px', borderRadius: '28px', background: `hsl(${accentHue} 70% 50%)` }} />
                <div style={{ position: 'absolute', left: '78px', top: '14px', width: '94px', height: '60px', borderRadius: '999px', border: '14px solid #111110', borderBottom: '0 solid transparent' }} />
                <div style={{ position: 'absolute', left: '112px', top: '92px', width: '28px', height: '28px', borderRadius: '999px', background: '#111110' }} />
            </div>
        )
    }

    if (motif === 'beauty') {
        return (
            <div style={{ position: 'relative', width: '240px', height: '210px', display: 'flex' }}>
                <div style={{ position: 'absolute', left: '76px', top: '42px', width: '94px', height: '120px', borderRadius: '20px', background: `hsl(${accentHue} 72% 55%)` }} />
                <div style={{ position: 'absolute', left: '96px', top: '18px', width: '54px', height: '34px', borderRadius: '12px', background: '#111110' }} />
                <div style={{ position: 'absolute', left: '56px', top: '152px', width: '134px', height: '16px', borderRadius: '999px', background: 'rgba(17,17,16,0.18)' }} />
            </div>
        )
    }

    if (motif === 'outdoor') {
        return (
            <div style={{ position: 'relative', width: '280px', height: '210px', display: 'flex' }}>
                <div style={{ position: 'absolute', left: '18px', top: '84px', width: '132px', height: '92px', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', background: `hsl(${accentHue} 68% 48%)` }} />
                <div style={{ position: 'absolute', left: '114px', top: '56px', width: '148px', height: '120px', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', background: '#111110' }} />
                <div style={{ position: 'absolute', left: '28px', top: '174px', width: '222px', height: '14px', borderRadius: '999px', background: 'rgba(17,17,16,0.18)' }} />
            </div>
        )
    }

    return (
        <div style={{ position: 'relative', width: '250px', height: '210px', display: 'flex' }}>
            <div style={{ position: 'absolute', left: '24px', top: '26px', width: '180px', height: '180px', borderRadius: '40px', background: `hsl(${accentHue} 72% 54%)` }} />
            <div style={{ position: 'absolute', left: '84px', top: '86px', color: '#FAFAF9', fontSize: '72px', fontWeight: 800, lineHeight: 1 }}>
                OP
            </div>
        </div>
    )
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
    const hue = hashString(slug)
    const accent = (hue + 36) % 360
    const secondary = (hue + 214) % 360
    const monogram = brandName.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || brandName.slice(0, 1).toUpperCase()

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
                        justifyContent: 'space-between',
                        borderRadius: '34px',
                        padding: '52px 48px 42px',
                        background: 'rgba(255,255,255,0.82)',
                        border: '1px solid rgba(17,17,16,0.08)',
                    }}
                >
                    <div style={{ width: '640px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    <div style={{ width: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div
                            style={{
                                display: 'flex',
                                width: '220px',
                                height: '220px',
                                borderRadius: '36px',
                                background: 'rgba(255,255,255,0.55)',
                                border: '1px solid rgba(17,17,16,0.08)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                        >
                            {renderMotif(motif, accent)}
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '18px',
                                    bottom: '16px',
                                    display: 'flex',
                                    padding: '8px 12px',
                                    borderRadius: '999px',
                                    background: '#111110',
                                    color: '#FAFAF9',
                                    fontSize: '22px',
                                    fontWeight: 800,
                                    letterSpacing: '0.04em',
                                }}
                            >
                                {monogram}
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignSelf: 'stretch',
                                justifyContent: 'center',
                                padding: '14px 18px',
                                borderRadius: '18px',
                                background: `hsla(${accent} 70% 50% / 0.12)`,
                                color: '#111110',
                                fontSize: '28px',
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            {brandName}
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
