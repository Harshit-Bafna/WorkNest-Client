import { NavItem } from '@/lib/types/types'
import { navItems } from '@/router/Routes/authNavItems'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { listHoverVariants } from '@/lib/utils/animations'
import { ChevronUp } from 'lucide-react'

const SidebarMenuItem = ({ navItem, key, collapse }: { navItem: NavItem; key: number; collapse: boolean }) => {
    const [showHoverCard, setShowHoverCard] = useState(false)
    const [isHovered, setIsHovered] = useState<string | null>(null)
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev)
    }

    return (
        <div
            key={key}
            className="relative">
            {navItem.submenu ? (
                <>
                    <button
                        onClick={toggleExpand}
                        className="flex gap-2 font-montserrat text-sm items-center p-2 rounded-lg hover:bg-muted cursor-pointer w-full outline-none border-none"
                        onMouseEnter={() => !collapse && setIsHovered(navItem.title)}
                        onMouseLeave={() => !collapse && setIsHovered(null)}>
                        <span className={`${collapse ? 'w-5 h-5' : 'w-4 h-4'} flex items-center justify-center`}>
                            {isHovered ? (
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}>
                                    <ChevronUp className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                navItem.icon
                            )}
                        </span>
                        {!collapse && navItem.title}
                    </button>
                    <div className="ml-6">
                        <motion.div
                            className="overflow-hidden"
                            initial={false}
                            animate={{ height: isExpanded ? 'auto' : 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}>
                            {!collapse &&
                                isExpanded &&
                                navItem.submenuItems?.map((subMenuItem, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={'hover'}
                                        variants={listHoverVariants}>
                                        <NavLink
                                            to={subMenuItem.path}
                                            end={true}
                                            className={({ isActive }) =>
                                                `flex gap-2 font-montserrat text-sm items-center p-2 rounded-lg ${isActive ? 'bg-primary-light/40' : 'hover:bg-muted'}`
                                            }
                                            onMouseEnter={() => collapse && setShowHoverCard(true)}
                                            onMouseLeave={() => collapse && setShowHoverCard(false)}>
                                            <span className={`${collapse ? 'w-5 h-5' : 'w-4 h-4'} flex items-center justify-center`}>
                                                {subMenuItem.icon}
                                            </span>
                                            {!collapse && subMenuItem.title}
                                        </NavLink>
                                    </motion.div>
                                ))}
                        </motion.div>
                    </div>
                </>
            ) : (
                <motion.div
                    whileHover={'hover'}
                    variants={listHoverVariants}>
                    <NavLink
                        to={navItem.path}
                        end={true}
                        className={({ isActive }) =>
                            `flex gap-2 font-montserrat text-sm items-center p-2 rounded-lg ${isActive ? 'bg-primary-light/40' : 'hover:bg-muted'}`
                        }
                        onMouseEnter={() => collapse && setShowHoverCard(true)}
                        onMouseLeave={() => collapse && setShowHoverCard(false)}>
                        <span className={`${collapse ? 'w-5 h-5' : 'w-4 h-4'} flex items-center justify-center`}>{navItem.icon}</span>
                        {!collapse && navItem.title}
                    </NavLink>
                </motion.div>
            )}

            {collapse && showHoverCard && (
                <motion.div
                    className="absolute right-full top-0 mr-2 z-50 h-full bg-primary shadow-md rounded-md py-1 px-3 text-sm font-montserrat border border-dark-muted/10"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </div>
    )
}

const Sidebar = ({ collapse }: { collapse: boolean }) => {
    return (
        <div
            className={`bg-neutral z-35 fixed flex flex-col justify-between top-0 h-screen left-0 pt-21 pb-8 overflow-clip border-r border-dark-muted/10 ${collapse ? 'w-0 sm:w-16' : 'shadow-lg lg:shadow-none w-50'}`}>
            <div className={`${collapse ? 'space-y-2' : 'space-y-1'} px-3`}>
                {navItems.mainMenu.map((navItem, index) => (
                    <SidebarMenuItem
                        navItem={navItem}
                        key={index}
                        collapse={collapse}
                    />
                ))}
            </div>
            <div className="space-y-1 border-t border-dark-muted/10 pt-5 px-3">
                {navItems.serviceMenu.map((navItem, index) => (
                    <SidebarMenuItem
                        navItem={navItem}
                        key={index}
                        collapse={collapse}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
