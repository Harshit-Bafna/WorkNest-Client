import * as React from 'react'
import { Bell } from 'lucide-react'
import { Button } from '../../ui/Button'
import { Dropdown, DropdownSeparator, DropdownItem } from '../../ui/Dropdown'
import { Notification } from '../../../utils/types/types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import path from '../../../Router/path'

type NotificationsDropdownProps = {
    openDropdown: string | null
    // eslint-disable-next-line no-unused-vars
    setOpenDropdown: (dropdown: string | null) => void
}

const notifications: Notification[] = [
    {
        id: '1',
        sender: {
            name: 'Jessie Samson',
        },
        message: 'Mentioned you in a comment.',
        timestamp: '10:41 AM August 7,2021',
        read: false,
    },
    {
        id: '2',
        sender: {
            name: 'Jane Foster',
        },
        message: 'Created an event.',
        timestamp: '10:20 AM August 7,2021',
        read: false,
    },
    {
        id: '3',
        sender: {
            name: 'Jessie Samson',
        },
        message: 'Liked your comment.',
        timestamp: '9:30 AM August 7,2021',
        read: true,
    },
    {
        id: '4',
        sender: {
            name: 'Jessie Samson',
        },
        message:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde optio recusandae corraupti quo reprehenderit. dsfge drf ger gergerg esr rgserg serg',
        timestamp: '10:41 AM August 7,2021',
        read: false,
    },
    {
        id: '5',
        sender: {
            name: 'Jane Foster',
        },
        message: 'Created an event.',
        timestamp: '10:20 AM August 7,2021',
        read: false,
    },
    {
        id: '6',
        sender: {
            name: 'Jessie Samson',
        },
        message: 'Liked your comment.',
        timestamp: '9:30 AM August 7,2021',
        read: true,
    },
]

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ openDropdown, setOpenDropdown }) => {
    const isOpen = openDropdown === 'notifications'
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, setOpenDropdown])

    return (
        <div
            className="relative"
            ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setOpenDropdown(isOpen ? null : 'notifications')}>
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red" />
            </Button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}>
                    <Dropdown className="w-[200px] sm:w-[380px]">
                        <div className="flex items-center justify-between px-4">
                            <p className="font-medium text-base">Notifications</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm duration-300 text-bright-blue hover:underline">
                                Mark all as read
                            </Button>
                        </div>
                        <DropdownSeparator />
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.map((notification, index) => (
                                <>
                                    <DropdownItem
                                        key={notification.id}
                                        className="relative gap-3">
                                        {notification.url ? (
                                            <Link
                                                to={notification.url}
                                                className="flex items-center gap-3">
                                                {notification.sender.image ? (
                                                    <img
                                                        src={notification.sender.image}
                                                        alt={notification.sender.name}
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-vibrant-green text-off-white font-semibold uppercase">
                                                        {notification.sender.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .slice(0, 2)}
                                                    </div>
                                                )}
                                                <div className="flex flex-col gap-0.5 max-w-[75%]">
                                                    <span className="font-medium">{notification.sender.name}</span>
                                                    <span className="text-light-dark-grey">
                                                        {notification.message.length > 75
                                                            ? `${notification.message.slice(0, 75)}...`
                                                            : notification.message}
                                                    </span>
                                                    <span className="text-xs text-gray-muted">{notification.timestamp}</span>
                                                </div>
                                                {!notification.read && (
                                                    <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-vibrant-green" />
                                                )}
                                            </Link>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                {notification.sender.image ? (
                                                    <img
                                                        src={notification.sender.image}
                                                        alt={notification.sender.name}
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-vibrant-green text-off-white font-semibold uppercase">
                                                        {notification.sender.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .slice(0, 2)}
                                                    </div>
                                                )}
                                                <div className="flex flex-col gap-0.5 max-w-[75%]">
                                                    <span className="font-medium">{notification.sender.name}</span>
                                                    <span className="text-light-dark-grey">
                                                        {notification.message.length > 75
                                                            ? `${notification.message.slice(0, 75)}...`
                                                            : notification.message}
                                                    </span>
                                                    <span className="text-xs text-gray-muted">{notification.timestamp}</span>
                                                </div>

                                                {!notification.read && (
                                                    <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-vibrant-green" />
                                                )}
                                            </div>
                                        )}
                                    </DropdownItem>
                                    {notifications.length - 1 !== index && <DropdownSeparator />}
                                </>
                            ))}
                        </div>
                        <DropdownSeparator />
                        <DropdownItem className="flex items-center justify-center text-bright-blue hover:text-bright-blue/90">
                            <Link to={path.Notifications}>View all notifications</Link>
                        </DropdownItem>
                    </Dropdown>
                </motion.div>
            )}
        </div>
    )
}
