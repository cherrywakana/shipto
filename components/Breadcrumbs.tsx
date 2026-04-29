
import Link from 'next/link'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const baseUrl = 'https://original-price.com'
    
    // 構造化データの生成
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'ホーム',
                'item': baseUrl
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 2,
                'name': item.label,
                ...(item.href ? { 'item': `${baseUrl}${item.href.startsWith('/') ? '' : '/'}${item.href}` } : {})
            }))
        ]
    }

    return (
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
            {/* 構造化データの埋め込み */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <ol style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0, 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center',
                fontSize: '0.85rem',
                color: '#64748b',
                fontWeight: 500
            }}>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        ホーム
                    </Link>
                </li>
                
                {items.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ margin: '0 0.6rem', color: '#cbd5e1', fontSize: '0.75rem' }}>&gt;</span>
                        {item.href ? (
                            <Link href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {item.label}
                            </Link>
                        ) : (
                            <span style={{ color: '#1e293b', fontWeight: 600 }}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
