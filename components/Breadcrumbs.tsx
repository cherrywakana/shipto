
import Link from 'next/link'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
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
                    <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="breadcrumb-link">
                        ホーム
                    </Link>
                </li>
                
                {items.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ margin: '0 0.6rem', color: '#cbd5e1', fontSize: '0.75rem' }}>&gt;</span>
                        {item.href ? (
                            <Link href={item.href} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span style={{ color: '#1e293b', fontWeight: 600 }}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
            <style jsx>{`
                .breadcrumb-link:hover {
                    color: #1e293b;
                }
            `}</style>
        </nav>
    )
}
