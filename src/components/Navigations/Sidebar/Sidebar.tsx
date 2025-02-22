import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../ui/Button'
import { ArrowLeftToLine, ArrowRightFromLine, ChevronDown } from 'lucide-react'
import { menu } from './menu'
import { NavLink, useLocation } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownSeparator } from '../../ui/Dropdown'

export type SidebarProps = {
    collapse: boolean
    setCollapse: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ collapse, setCollapse }: SidebarProps) => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; title: string | null }>({
        top: 0,
        title: null,
    })
    const location = useLocation()

    const toggleSubmenu = (title: string) => {
        setOpenSubmenu((prev) => (prev === title ? null : title))
    }

    const handleDropdownToggle = (e: React.MouseEvent, title: string) => {
        e.stopPropagation()
        const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        setDropdownPosition((prev) => ({
            top: buttonRect.top,
            title: prev.title === title ? null : title,
        }))
    }

    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownPosition({ top: 0, title: null })
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const isActive = (path: string) => {
        return location.pathname === path
    }

    return (
        <motion.aside
            initial={{ width: collapse ? 64 : 240 }}
            animate={{ width: collapse ? 64 : 240 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed h-screen top-0 left-0 z-40 pt-16 bg-off-white shadow-lg">
            <div className="h-full flex flex-col justify-between">
                <div className={`h-full overflow-y-auto custom-scrollbar flex flex-col justify-start ${collapse ? 'px-2' : 'px-5'} my-5`}>
                    {menu.map((item, index) => (
                        <div key={item.title}>
                            {collapse ? (
                                item.header ? (
                                    index !== 0 && <hr className="border-t m-2 border-light-dark-grey/30" />
                                ) : (
                                    <div>
                                        <button
                                            className={`flex w-full justify-center items-start p-2 my-1 rounded-md hover:bg-light-dark-grey/10 ${
                                                isActive(item.path || '') ? 'bg-light-dark-grey/20' : ''
                                            }`}
                                            onClick={(e) => handleDropdownToggle(e, item.title)}>
                                            {item.icon}
                                        </button>
                                        <AnimatePresence>
                                            {dropdownPosition.title === item.title && (
                                                <motion.div
                                                    ref={dropdownRef}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    style={{ top: dropdownPosition.top }}
                                                    className="absolute left-[260px] ">
                                                    <Dropdown className="min-w-[190px]">
                                                        {item.submenu ? (
                                                            <>
                                                                <div className="px-3 py-2 text-sm font-medium font-poppins text-light-dark-grey">
                                                                    {item.title}
                                                                </div>
                                                                <DropdownSeparator />
                                                                {item.submenuItems?.map((submenu) => (
                                                                    <NavLink
                                                                        key={submenu.title}
                                                                        to={submenu.path || '#'}
                                                                        className={({ isActive }) =>
                                                                            isActive ? 'bg-light-dark-grey/20' : ''
                                                                        }>
                                                                        <DropdownItem className="font-poppins text-sm font-medium text-dark-grey">
                                                                            {submenu.title}
                                                                        </DropdownItem>
                                                                    </NavLink>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <NavLink
                                                                to={item.path || '#'}
                                                                className={({ isActive }) =>
                                                                    isActive ? 'bg-light-dark-grey/20' : ''
                                                                }>
                                                                <DropdownItem className="font-poppins text-sm font-medium text-dark-grey">
                                                                    {item.title}
                                                                </DropdownItem>
                                                            </NavLink>
                                                        )}
                                                    </Dropdown>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            ) : item.header ? (
                                <p className={`text-dark-grey text-sm font-medium font-poppins mb-1 ${index !== 0 && 'mt-5'} `}>{item.title}</p>
                            ) : item.submenu ? (
                                <div>
                                    <button
                                        className={`flex gap-x-3 w-full justify-start px-3 rounded-md py-2 hover:bg-light-dark-grey/10 ${
                                            item.submenuItems?.some((submenu) => isActive(submenu.path || ''))
                                                ? 'bg-light-dark-grey/20'
                                                : ''
                                        }`}
                                        onClick={() => toggleSubmenu(item.title)}>
                                        {item.icon}
                                        <div className="flex justify-between w-full items-center">
                                            <p className="text-sm font-normal font-poppins">{item.title}</p>
                                            <motion.div
                                                animate={{ rotate: openSubmenu === item.title ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}>
                                                <ChevronDown size={16} />
                                            </motion.div>
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openSubmenu === item.title && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}>
                                                {item.submenuItems?.map((submenu) => (
                                                    <div key={submenu.title}>
                                                        {submenu.path && (
                                                            <NavLink
                                                                to={submenu.path}
                                                                className={({ isActive }) =>
                                                                    `flex gap-x-5 w-full justify-start pl-12 rounded-md py-2 hover:bg-light-dark-grey/10 ${
                                                                        isActive ? 'bg-light-dark-grey/20' : ''
                                                                    }`
                                                                }>
                                                                <p className="text-sm font-normal font-poppins">{submenu.title}</p>
                                                            </NavLink>
                                                        )}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                item.path && (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex gap-x-3 w-full justify-start px-3 rounded-md py-2 hover:bg-light-dark-grey/10 ${
                                                isActive ? 'bg-light-dark-grey/20' : ''
                                            }`
                                        }>
                                        {item.icon}
                                        <div className="flex justify-between w-full items-center">
                                            <p className="text-sm font-normal font-poppins">{item.title}</p>
                                        </div>
                                    </NavLink>
                                )
                            )}
                        </div>
                    ))}
                </div>
                <Button
                    variant={'ghost'}
                    onClick={() => setCollapse(!collapse)}
                    className="border-t w-full rounded-none h-14 gap-x-3 text-sm font-normal font-poppins flex justify-start items-center">
                    <motion.div
                        initial={{ opacity: 0, x: collapse ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}>
                        {collapse ? <ArrowRightFromLine size={18} /> : <ArrowLeftToLine size={18} />}
                    </motion.div>
                    {!collapse && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}>
                            Collapsed View
                        </motion.span>
                    )}
                </Button>
            </div>
        </motion.aside>
    )
}

export default Sidebar
