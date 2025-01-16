import { FC } from 'react'
import { cn } from '../../utils/helper/syncHelper'
import { cva, VariantProps } from 'class-variance-authority'

const logoVariants = cva('inline-flex items-center justify-center drop-shadow-text-shadow', {
    variants: {
        variant: {
            default: '',
            verticle: 'flex-col',
        },
        text: {
            default: 'logo-text text-2xl font-semibold font-poppins',
            hidden: 'hidden',
        },
    },
    defaultVariants: {
        variant: 'default',
        text: 'default',
    },
})

interface LogoProps extends VariantProps<typeof logoVariants> {
    logoClasses?: string
    logoNameClasses?: string
}

const Logo: FC<LogoProps> = ({ logoClasses, logoNameClasses, variant, text }) => {
    return (
        <div className={cn(logoVariants({ variant }), logoClasses)}>
            <img
                className="w-16 h-16"
                src="https://my-projects-images.s3.ap-south-1.amazonaws.com/worknest/logo-transparent.png"
                alt="WornNest-Logo"
            />
            <div className={cn(logoVariants({ text }), logoNameClasses)}>
                <span className="text-3xl text-[var(--color-bright-blue)]">W</span>ORK{' '}
                <span className="text-3xl text-[var(--color-bright-blue)]">N</span>EST
            </div>
        </div>
    )
}

export default Logo
