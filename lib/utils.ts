const BLOCKED_TAGS = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'base', 'meta', 'link']

function stripBlockedTags(html: string): string {
    let sanitized = html

    for (const tag of BLOCKED_TAGS) {
        const pairedTagPattern = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi')
        const selfClosingTagPattern = new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi')
        sanitized = sanitized.replace(pairedTagPattern, '').replace(selfClosingTagPattern, '')
    }

    return sanitized
}

function stripDangerousAttributes(html: string): string {
    return html
        .replace(/\s+on[a-z-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/\s+(href|src)\s*=\s*("|\')\s*(?:javascript:|data:text\/html)/gi, ' $1=$2#blocked:')
        .replace(/\s+style\s*=\s*("|\')[\s\S]*?(expression\s*\(|javascript:|url\s*\(\s*["\']?\s*javascript:)[\s\S]*?\1/gi, '')
}

/**
 * Remove obviously dangerous HTML before rendering CMS article content.
 * This is a lightweight server-side sanitizer for stored article HTML.
 */
export function sanitizeArticleHtml(html: string): string {
    if (!html) return ''

    const withoutBlockedTags = stripBlockedTags(html)
    return stripDangerousAttributes(withoutBlockedTags)
}

/**
 * Add target="_blank" and rel="noopener noreferrer" to all external links in an HTML string.
 * External links are those starting with http:// or https:// and NOT pointing to original-price.com.
 */
export function addExternalLinkAttributes(html: string): string {
    // Correctly handle both single and double quotes for href, and target non-local links
    return html.replace(
        /<a\s([^>]*?)href=['"](https?:\/\/(?!original-price\.com)[^'"]+)['"]([^>]*?)>/gi,
        (match, before, url, after) => {
            // If it already has a target, we leave it, but ensure rel exists for safety
            if (/target=['"]?_blank['"]?/i.test(before) || /target=['"]?_blank['"]?/i.test(after)) {
                if (!/rel=/i.test(before) && !/rel=/i.test(after)) {
                    return `<a ${before}href="${url}"${after} rel="noopener noreferrer">`
                }
                return match
            }
            // Add attributes. We use double quotes for the injected attributes.
            return `<a ${before}href="${url}"${after} target="_blank" rel="noopener noreferrer">`
        }
    )
}

export function getArticleExcerpt(html: string | null | undefined, maxLength = 120): string | undefined {
    const plainText = html
        ?.replace(/<[^>]*>/g, ' ')
        ?.replace(/\s+/g, ' ')
        ?.trim()

    if (!plainText) return undefined
    if (plainText.length <= maxLength) return plainText

    return `${plainText.slice(0, maxLength)}...`
}

type TimestampedRecord = {
    updated_at?: string | null
    created_at?: string | null
}

export function getLastVerifiedAt(record: TimestampedRecord | null | undefined): string | undefined {
    return record?.updated_at || record?.created_at || undefined
}

export function formatJapaneseDate(dateString: string | null | undefined): string | undefined {
    if (!dateString) return undefined

    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return undefined

    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date)
}
