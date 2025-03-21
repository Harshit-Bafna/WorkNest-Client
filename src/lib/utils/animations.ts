export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
}

export const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.3 + i * 0.1,
            duration: 0.5,
        },
    }),
}

export const pulseVariants = {
    initial: { scale: 0.95, opacity: 0.5 },
    animate: {
        scale: 1.05,
        opacity: 1,
        transition: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse' as const,
            ease: 'easeInOut',
        },
    },
}

export const floatVariants = {
    initial: { y: 0 },
    animate: {
        y: [-8, 8],
        transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse' as const,
            ease: 'easeInOut',
        },
    },
}

export const arrorVariants = {
    initial: { x: 0 },
    hover: { x: 5 },
    transition: { type: 'spring', stiffness: 400, damping: 10 },
}
