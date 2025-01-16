import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../utils/helper/syncHelper'

const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-md font-medium transition-all', {
    variants: {
        variant: {
            default: 'bg-bright-blue text-[var(--color-white)] hover:text-bright-blue hover:bg-transparent border-2 border-bright-blue',
            outline: 'text-bright-blue bg-transparent border-2 border-bright-blue hover:bg-bright-blue hover:text-[var(--color-white)] ',
        },
        size: {
            default: 'h-10 py-2 px-14 rounded-lg',
            sm: 'h-9 px-5 rounded-sm',
            lg: 'h-11 w-full rounded-xl',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    href?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
        return (
            <a
                href={href}
                className={cn(buttonVariants({ variant, size, className }))}>
                {children}
            </a>
        )
    }
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}>
            {children}
        </button>
    )
})
Button.displayName = 'Button'
