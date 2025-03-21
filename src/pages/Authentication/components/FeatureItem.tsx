import { listVariants } from '@/lib/utils/animations'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FeatureItemProps {
    icon: ReactNode
    title: string
    description: string
    index: number
}

export const FeatureItem = ({ icon, title, description, index }: FeatureItemProps) => {

    return (
        <motion.div
            custom={index}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className={`flex flex-col md:flex-row items-center gap-2 md:gap-5 ${index !== 0 && 'sm:border-l border-dark-muted/20 md:border-none sm:pl-4 md:pl-0'}`}>
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <p className="text-secondary text-center max-w-30 md:max-w-full md:text-left text-sm font-semibold font-montserrat">{title}</p>
                <p className="text-secondary text-sm font-montserrat hidden md:block">{description}</p>
            </div>
        </motion.div>
    )
}
