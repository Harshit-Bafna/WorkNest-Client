import * as React from 'react'
import { cn } from '../../utils/helper/syncHelper'
import { DropdownProps } from '../../utils/types/types'

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({ children, className, align = 'right' }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'absolute z-50 mt-2 min-w-[240px] rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5',
                align === 'right' ? 'right-0' : 'left-0',
                className
            )}>
            {children}
        </div>
    )
})

Dropdown.displayName = 'Dropdown'

interface DropdownItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
    icon?: React.ReactNode
}

export const DropdownItem = React.forwardRef<HTMLAnchorElement, DropdownItemProps>(({ className, children, icon, ...props }, ref) => {
    return (
        <a
            ref={ref}
            className={cn('flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-dark-grey hover:bg-light-gray', className)}
            {...props}>
            {icon}
            {children}
        </a>
    )
})

DropdownItem.displayName = 'DropdownItem'

export const DropdownSeparator = () => {
    return <div className="my-1 h-px bg-light-gray" />
}
