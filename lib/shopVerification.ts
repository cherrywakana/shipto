import { formatJapaneseDate, getLastVerifiedAt } from '@/lib/utils'

type VerificationStatus = 'confirmed' | 'review' | 'missing'

type VerificationTone = 'positive' | 'warning' | 'neutral'

type ShopVerificationInput = {
    ships_to_japan?: boolean | null
    shipping_guide?: string | null
    tax_guide?: string | null
    fee_guide?: string | null
    shipping_url?: string | null
    tax_url?: string | null
    fee_url?: string | null
    updated_at?: string | null
    created_at?: string | null
}

export type VerificationField = {
    key: 'shipping' | 'tax' | 'fee'
    label: string
    status: VerificationStatus
    statusLabel: string
    tone: VerificationTone
    summary: string
    detail: string
    sourceUrl?: string
    sourceLabel?: string
    verifiedAt?: string
}

function hasValue(value: string | null | undefined): boolean {
    return Boolean(value && value.trim())
}

function buildField(args: {
    key: 'shipping' | 'tax' | 'fee'
    label: string
    guide?: string | null
    sourceUrl?: string | null
    confirmedSummary: string
    reviewSummary: string
    missingSummary: string
    record: ShopVerificationInput
}): VerificationField {
    const hasGuide = hasValue(args.guide)
    const hasSource = hasValue(args.sourceUrl)
    const verifiedAt = formatJapaneseDate(getLastVerifiedAt(args.record))

    if (hasGuide && hasSource) {
        return {
            key: args.key,
            label: args.label,
            status: 'confirmed',
            statusLabel: '確認済み',
            tone: 'positive',
            summary: args.confirmedSummary,
            detail: args.guide!.trim(),
            sourceUrl: args.sourceUrl || undefined,
            sourceLabel: '根拠ページを見る',
            verifiedAt,
        }
    }

    if (hasGuide) {
        return {
            key: args.key,
            label: args.label,
            status: 'review',
            statusLabel: '要再確認',
            tone: 'warning',
            summary: args.reviewSummary,
            detail: args.guide!.trim(),
            verifiedAt,
        }
    }

    return {
        key: args.key,
        label: args.label,
        status: 'missing',
        statusLabel: '未確認',
        tone: 'neutral',
        summary: args.missingSummary,
        detail: '編集部でまだ根拠ページを確認できていません。購入前に公式サイトの最新情報をご確認ください。',
        verifiedAt,
    }
}

export function getShopVerificationFields(shop: ShopVerificationInput): VerificationField[] {
    const shippingGuide = shop.ships_to_japan === false
        ? '現時点では日本への直送不可、または制限がある前提で案内しています。購入前に公式配送ポリシーの確認が必要です。'
        : shop.shipping_guide

    const shippingSummary = shop.ships_to_japan === false
        ? '日本発送は未対応または制限ありとして確認'
        : '日本発送の可否を確認'

    return [
        buildField({
            key: 'shipping',
            label: '日本発送',
            guide: shippingGuide,
            sourceUrl: shop.shipping_url,
            confirmedSummary: shippingSummary,
            reviewSummary: '説明文はあるが根拠ページURLが未登録',
            missingSummary: '日本発送の可否は未確認',
            record: shop,
        }),
        buildField({
            key: 'tax',
            label: '関税',
            guide: shop.tax_guide,
            sourceUrl: shop.tax_url,
            confirmedSummary: '関税の扱いを確認',
            reviewSummary: '関税の説明文はあるが根拠ページURLが未登録',
            missingSummary: '関税の扱いは未確認',
            record: shop,
        }),
        buildField({
            key: 'fee',
            label: '送料',
            guide: shop.fee_guide,
            sourceUrl: shop.fee_url,
            confirmedSummary: '送料の考え方を確認',
            reviewSummary: '送料の説明文はあるが根拠ページURLが未登録',
            missingSummary: '送料の目安は未確認',
            record: shop,
        }),
    ]
}

export function getVerificationToneStyles(tone: VerificationTone): { background: string; border: string; text: string } {
    if (tone === 'positive') {
        return {
            background: '#f0fdf4',
            border: '#86efac',
            text: '#166534',
        }
    }

    if (tone === 'warning') {
        return {
            background: '#fff7ed',
            border: '#fdba74',
            text: '#9a3412',
        }
    }

    return {
        background: '#f8fafc',
        border: '#cbd5e1',
        text: '#475569',
    }
}
