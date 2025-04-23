import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/helper/syncHelper'

const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.15,
            ease: 'easeIn',
        },
    },
}

interface TooltipProps {
    children: React.ReactNode
    content: React.ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
    className?: string
    contentClassName?: string
}

export function Tooltip({ children, content, side = 'top', align = 'center', sideOffset = 4, className, contentClassName }: TooltipProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const tooltipRef = React.useRef<HTMLDivElement>(null)

    const calculatePosition = React.useCallback(() => {
        if (!triggerRef.current || !tooltipRef.current || !isOpen) return

        const triggerRect = triggerRef.current.getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()

        let x = 0
        let y = 0

        switch (side) {
            case 'top':
                y = triggerRect.top - tooltipRect.height - sideOffset
                break
            case 'right':
                x = triggerRect.right + sideOffset
                y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
                break
            case 'bottom':
                y = triggerRect.bottom + sideOffset
                break
            case 'left':
                x = triggerRect.left - tooltipRect.width - sideOffset
                y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
                break
        }

        if (side === 'top' || side === 'bottom') {
            switch (align) {
                case 'start':
                    x = triggerRect.left
                    break
                case 'center':
                    x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
                    break
                case 'end':
                    x = triggerRect.right - tooltipRect.width
                    break
            }
        }

        if (side === 'left' || side === 'right') {
            switch (align) {
                case 'start':
                    y = triggerRect.top
                    break
                case 'center':
                    break
                case 'end':
                    y = triggerRect.bottom - tooltipRect.height
                    break
            }
        }

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        if (x + tooltipRect.width > viewportWidth - 10) {
            x = viewportWidth - tooltipRect.width - 10
        }

        if (x < 10) {
            x = 10
        }

        if (y < 10) {
            y = 10
        }

        if (y + tooltipRect.height > viewportHeight - 10) {
            y = viewportHeight - tooltipRect.height - 10
        }

        if (tooltipRef.current) {
            tooltipRef.current.style.left = `${x}px`
            tooltipRef.current.style.top = `${y}px`
        }
    }, [isOpen, side, align, sideOffset])

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    React.useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(calculatePosition, 10)

            window.addEventListener('resize', calculatePosition)
            window.addEventListener('scroll', calculatePosition, true)

            return () => {
                clearTimeout(timer)
                window.removeEventListener('resize', calculatePosition)
                window.removeEventListener('scroll', calculatePosition, true)
            }
        }
    }, [isOpen, calculatePosition])

    return (
        <div
            ref={triggerRef}
            className={cn('relative inline-block', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}>
            {children}
            <AnimatePresence>
                {isOpen && (
                    <div
                        ref={tooltipRef}
                        className="fixed z-50 pointer-events-none"
                        style={{ left: 0, top: 0 }}>
                        <motion.div
                            className={cn(
                                'bg-neutral text-dark-muted rounded-md border border-dark-muted/15 px-3 py-1.5 text-sm shadow-md font-montserrat',
                                contentClassName
                            )}
                            variants={tooltipVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            {content}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* eslint-disable react/jsx-no-useless-fragment */
interface TooltipProviderProps {
    children: React.ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
    return <>{children}</>
}

interface TooltipRootProps {
    children: React.ReactNode
}

export const TooltipRoot = ({ children }: TooltipRootProps) => {
    return <>{children}</>
}

interface TooltipTriggerProps {
    children: React.ReactNode
    asChild?: boolean
}

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
    return <>{children}</>
}

interface TooltipContentProps {
    children: React.ReactNode
}

export const TooltipContent = ({ children }: TooltipContentProps) => {
    return <>{children}</>
}
