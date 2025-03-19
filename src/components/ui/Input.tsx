import * as React from 'react'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils/helper/syncHelper'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    leftIcon?: React.ReactNode
    loading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, leftIcon, loading, type = 'text', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState)
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            togglePasswordVisibility()
        }
    }

    return (
        <div className="relative flex items-center mt-1">
            {leftIcon && <span className="absolute left-3 w-4 flex items-center justify-center text-dark-grey">{leftIcon}</span>}
            <input
                className={cn(
                    'flex w-full rounded-md bg-muted/20 outline-2 outline-dark-muted/20 h-9 px-3 text-sm font-roboto-slab font-normal placeholder:text-dark-muted/40  placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-dark-muted/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
                    leftIcon && 'pl-10',
                    type === 'file' && 'file:bg-transparent file:border-0 ver file:h-9',
                    className
                )}
                ref={ref}
                type={type === 'password' && isPasswordVisible ? 'text' : type}
                {...props}
            />
            {type === 'password' && (
                <span
                    role="button"
                    tabIndex={0}
                    className="absolute right-3 cursor-pointer text-dark-grey"
                    onClick={togglePasswordVisibility}
                    onKeyPress={handleKeyPress}
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}>
                    {isPasswordVisible ? <EyeOff className="w-4" /> : <Eye className="w-4" />}
                </span>
            )}
            {loading && (
                <span className="absolute right-3 w-4 flex items-center justify-center text-dark-grey">
                    <LoaderCircle
                        className="animate-spin"
                        size={18}
                    />
                </span>
            )}
        </div>
    )
})
Input.displayName = 'Input'

export { Input }
