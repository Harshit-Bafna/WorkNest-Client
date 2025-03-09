import * as React from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/helper/syncHelper'
import { cva } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'

// Button Variants
const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer tracking-tight relative overflow-hidden',
    {
        variants: {
            variant: {
                default: 'bg-primary text-neutral shadow-md hover:bg-primary/90 focus-visible:ring-primary/30',
                secondary: 'bg-secondary text-neutral shadow-md hover:bg-secondary/90 focus-visible:ring-secondary/30',
                destructive: 'bg-warning text-neutral shadow-md hover:bg-warning/90 focus-visible:ring-warning/30',

                outline: 'border-2 border-primary bg-transparent text-primary focus-visible:ring-primary/20',
                outlineSecondary: 'border-2 border-secondary bg-transparent text-secondary focus-visible:ring-secondary/20',

                ghost: 'hover:bg-muted text-primary',
                ghostSecondary: 'hover:bg-muted text-secondary',
                
                link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
                linkSecondary: 'text-secondary underline-offset-4 hover:underline p-0 h-auto',
            },
            size: {
                default: 'h-10 px-5 py-2 has-[>svg]:px-4 text-sm',
                sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
                lg: 'h-12 rounded-md px-6 has-[>svg]:px-5 text-base',
                icon: 'size-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

// Define Props for Button
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'onDrag'>, VariantProps<typeof buttonVariants> {
    href?: string
    withRipple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, href, variant, size, withRipple = true, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])
    const isInteractive = !props.disabled && variant !== 'link' && variant !== 'linkSecondary'

    const handleRipple = (event: React.MouseEvent<HTMLElement>) => {
        if (!withRipple || !isInteractive) return

        const button = event.currentTarget
        const rect = button.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const id = Date.now()
        setRipples([...ripples, { x, y, id }])

        setTimeout(() => {
            setRipples((ripples) => ripples.filter((ripple) => ripple.id !== id))
        }, 600)
    }

    const buttonContent = (
        <>
            {isInteractive &&
                withRipple &&
                ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/20 pointer-events-none"
                        initial={{ width: 0, height: 0, opacity: 0.5, x: ripple.x, y: ripple.y, transform: 'translate(-50%, -50%)' }}
                        animate={{ width: 300, height: 300, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                ))}
            {children}
        </>
    )

    if (href) {
        return (
            <motion.a
                href={href}
                className={cn(buttonVariants({ variant, size, className }))}
                onClick={handleRipple}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                {buttonContent}
            </motion.a>
        )
    }

    return (
        <motion.button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            onClick={handleRipple}
            whileHover={isInteractive ? { scale: 1.02 } : undefined}
            whileTap={isInteractive ? { scale: 0.98 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...props}>
            {buttonContent}
        </motion.button>
    )
})

Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
