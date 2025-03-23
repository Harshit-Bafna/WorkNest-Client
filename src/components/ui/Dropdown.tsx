import { cn, handleShortcut } from '@/lib/utils/helper/syncHelper'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva } from 'class-variance-authority'
import { ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const menuAnimationVariants = {
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

const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.2,
            ease: 'easeOut',
        },
    }),
}

const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
}

const itemStyleVariants = cva(
    "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-hidden select-none font-poppins focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-medium",
    {
        variants: {
            variant: {
                default: 'text-muted-dark/90 focus:text-secondary',
                destructive: 'text-warning focus:bg-warning/10 focus:text-secondary',
            },
            inset: {
                true: 'pl-8',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
    return (
        <DropdownMenuPrimitive.Root
            data-slot="dropdown-menu"
            {...props}
        />
    )
}

function DropdownMenuTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
    return (
        <DropdownMenuPrimitive.Trigger
            data-slot="dropdown-menu-trigger"
            {...props}
            className={cn('outline-none', className)}
        />
    )
}

function DropdownMenuContent({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
    return (
        <DropdownMenuPrimitive.Portal>
            <AnimatePresence>
                <DropdownMenuPrimitive.Content
                    data-slot="dropdown-menu-content"
                    sideOffset={sideOffset}
                    asChild
                    className={cn(
                        'bg-neutral text-dark-muted z-50 min-w-56 w-full rounded-md border border-dark-muted/15 p-1.5 shadow-md font-poppins',
                        className
                    )}
                    {...props}>
                    <motion.div
                        variants={menuAnimationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit">
                        {props.children}
                    </motion.div>
                </DropdownMenuPrimitive.Content>
            </AnimatePresence>
        </DropdownMenuPrimitive.Portal>
    )
}

function DropdownMenuLabel({
    className,
    inset,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
}) {
    return (
        <DropdownMenuPrimitive.Label
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn('px-2 py-1.5 text-sm font-medium font-poppins text-secondary data-[inset]:pl-8', className)}
            {...props}
        />
    )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn('bg-dark-muted/15 -mx-1 my-1 h-px', className)}
            {...props}
        />
    )
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
    return (
        <DropdownMenuPrimitive.Group
            data-slot="dropdown-menu-group"
            {...props}
        />
    )
}

function DropdownMenuItem({
    className,
    inset,
    variant = 'default',
    path,
    externalPath,
    onClick,
    shortcut,
    index = 0,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
    path?: string
    externalPath?: string
    onClick?: () => void
    shortcut?: string
    index?: number
}) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else if (path) {
            navigate(path)
        } else if (externalPath) {
            window.open(externalPath, '_blank')
        }
    }

    React.useEffect(() => {
        if (!shortcut) return

        const shortcutHandler = (e: KeyboardEvent) => handleShortcut(e, [{ keys: shortcut, callback: handleClick }])

        window.addEventListener('keydown', shortcutHandler)
        return () => window.removeEventListener('keydown', shortcutHandler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shortcut])

    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(itemStyleVariants({ variant, inset }), className)}
            onClick={handleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            asChild
            {...props}>
            <motion.div
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                {props.children}
            </motion.div>
        </DropdownMenuPrimitive.Item>
    )
}

function DropdownMenuShortcut({
    className,
    ...props
}: React.ComponentProps<'span'> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
}) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn('ml-auto text-xs tracking-widest', className)}
            {...props}
        />
    )
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
    return (
        <DropdownMenuPrimitive.Sub
            data-slot="dropdown-menu-sub"
            {...props}
        />
    )
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
}) {
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        const handleStateChange = (e: Event) => {
            const target = e.target as HTMLElement
            if (target.getAttribute('data-state') === 'open') {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }

        const element = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')
        if (element) {
            element.addEventListener('mouseenter', handleStateChange)
            element.addEventListener('mouseleave', handleStateChange)
        }

        return () => {
            if (element) {
                element.removeEventListener('mouseenter', handleStateChange)
                element.removeEventListener('mouseleave', handleStateChange)
            }
        }
    }, [])

    return (
        <DropdownMenuPrimitive.SubTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(
                `relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-hidden select-none font-poppins focus:bg-muted focus:text-secondary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=open]:bg-muted data-[state=open]:text-secondary data-[inset]:pl-8`,
                className
            )}
            {...props}>
            {children}
            <motion.div
                variants={chevronVariants}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}>
                <ChevronRightIcon className="ml-auto size-4" />
            </motion.div>
        </DropdownMenuPrimitive.SubTrigger>
    )
}

function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
    return (
        <DropdownMenuPrimitive.Portal
            data-slot="dropdown-menu-portal"
            {...props}
        />
    )
}

function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
    return (
        <DropdownMenuPrimitive.SubContent
            data-slot="dropdown-menu-sub-content"
            asChild
            className={cn(
                'bg-neutral text-dark-muted z-50 min-w-[8rem] overflow-hidden rounded-md border border-dark-muted/15 p-1 shadow-lg font-poppins',
                className
            )}
            {...props}>
            <motion.div
                variants={menuAnimationVariants}
                initial="hidden"
                animate="visible"
                exit="exit">
                {props.children}
            </motion.div>
        </DropdownMenuPrimitive.SubContent>
    )
}

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
}
