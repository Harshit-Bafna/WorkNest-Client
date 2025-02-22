import * as React from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/helper/syncHelper'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-bright-blue text-off-white hover:text-bright-blue hover:bg-transparent border-2 border-bright-blue',
                outline: 'text-bright-blue bg-transparent border-2 border-bright-blue hover:bg-bright-blue hover:text-off-white',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                solid: 'bg-bright-blue text-off-white hover:bg-blue-600',
            },
            size: {
                default: 'h-10 px-4 py-2',
                icon: 'h-10 w-10',
                sm: 'h-fit px-5 py-2 rounded-sm',
                lg: 'h-11 w-full rounded-xl',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

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
