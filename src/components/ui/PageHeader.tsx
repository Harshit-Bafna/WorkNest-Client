import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
    breadcrumbs: Array<{
        label: string
        href?: string
    }>
}

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <nav className="flex items-center gap-1 text-sm text-gray-muted">
                {breadcrumbs.map((crumb, index) => (
                    <div
                        key={crumb.label}
                        className="flex items-center">
                        {index > 0 && <span className="mx-2 font-inter">/</span>}
                        {crumb.href ? (
                            <Link
                                to={crumb.href}
                                className="text-bright-blue hover:underline font-inter">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="font-inter">{crumb.label}</span>
                        )}
                    </div>
                ))}
            </nav>
        </motion.header>
    )
}
