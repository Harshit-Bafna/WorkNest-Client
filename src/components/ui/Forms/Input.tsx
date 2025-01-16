import * as React from 'react'
import { cn } from '../../../utils/helper/syncHelper'
import { Eye, EyeOff } from 'lucide-react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, leftIcon, type = 'text', ...props }, ref) => {
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
                    'flex w-full rounded-md bg-transparent outline outline-1 outline-dark-grey h-9 px-3 text-sm placeholder:text-light-dark-grey placeholder:opacity-50 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-gray-muted focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    leftIcon && 'pl-10',
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
        </div>
    )
})
Input.displayName = 'Input'

export { Input }
