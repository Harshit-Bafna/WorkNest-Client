import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface InfoCardProps {
    title: string
    description: string
    linkText: string
    linkHref: string
}

export const InfoCard = ({ title, description, linkText, linkHref }: InfoCardProps) => {
    return (
        <motion.div
            className="bg-neutral space-y-2 font-poppins px-6 py-5 rounded-2xl shadow-sm"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 30, 128, 0.1)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <p className="font-medium">{title}</p>
            <p className="text-sm hidden lg:block">{description}</p>
            <Link
                to={linkHref}
                className="text-primary flex items-center gap-2 hover:underline underline-offset-2 w-fit group">
                {linkText}
                <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                    <ArrowRight size={16} />
                </motion.span>
            </Link>
        </motion.div>
    )
}
