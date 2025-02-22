import React, { useEffect, useRef, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import path from '../../Router/path'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { ChevronLeft, Ellipsis, MessageSquareMore } from 'lucide-react'
import { Dropdown, DropdownItem } from '../../components/ui/Dropdown'
import { Notification } from '../../utils/types/types'
import { format, isToday, isYesterday, parseISO } from 'date-fns'

const notifications: Notification[] = [
    {
        id: '16',
        sender: { name: 'Olivia Parker' },
        message: 'Liked your post.',
        timestamp: '2025-02-22T12:30:00Z',
        read: false,
    },
    {
        id: '11',
        sender: { name: 'Alice Johnson' },
        message: 'Tagged you in a photo.',
        timestamp: '2025-02-22T10:00:00Z',
        read: false,
    },
    {
        id: '12',
        sender: { name: 'Bob Carter' },
        message: 'Sent you a message.',
        timestamp: '2025-02-21T08:45:00Z',
        read: false,
    },
    {
        id: '17',
        sender: { name: 'Nathan Drake' },
        message: 'Commented on your post.',
        timestamp: '2025-02-21T06:15:00Z',
        read: false,
    },
    {
        id: '1',
        sender: { name: 'Jessie Samson' },
        message: 'Mentioned you in a comment.',
        timestamp: '2025-02-20T17:40:00Z',
        read: false,
    },
    {
        id: '8',
        sender: { name: 'Sarah Connor' },
        message: 'Reacted to your story.',
        timestamp: '2025-02-20T16:55:00Z',
        read: false,
    },
    {
        id: '4',
        sender: { name: 'Jessie Samson' },
        message: 'Shared your post.',
        timestamp: '2025-02-20T14:10:00Z',
        read: false,
    },
    {
        id: '13',
        sender: { name: 'Charlie Adams' },
        message: 'Posted in your group.',
        timestamp: '2025-02-19T09:30:00Z',
        read: false,
    },
    {
        id: '2',
        sender: { name: 'Jane Foster' },
        message: 'Created an event.',
        timestamp: '2025-02-19T15:30:00Z',
        read: false,
    },
    {
        id: '200',
        sender: { name: 'Jane Foster' },
        message: 'Created an event.',
        timestamp: '2025-02-19T15:30:00Z',
        read: false,
    },
    {
        id: '201',
        sender: { name: 'Jane Foster' },
        message: 'Created an event.',
        timestamp: '2025-02-19T15:30:00Z',
        read: false,
    },
    {
        id: '203',
        sender: { name: 'Jane Foster' },
        message: 'Created an event.',
        timestamp: '2025-02-19T15:30:00Z',
        read: false,
    },
    {
        id: '204',
        sender: { name: 'Jane Foster' },
        message: 'Created an event.',
        timestamp: '2025-02-19T15:30:00Z',
        read: false,
    },
    {
        id: '205',
        sender: { name: 'Jane Foster' },
        message: 'Created an event.',
        timestamp: '2025-02-19T15:30:00Z',
        read: false,
    },
    {
        id: '5',
        sender: { name: 'Jane Foster' },
        message: 'Sent you a friend request.',
        timestamp: '2025-02-18T18:05:00Z',
        read: false,
    },
    {
        id: '9',
        sender: { name: 'David Brown' },
        message: 'Started following you.',
        timestamp: '2025-02-18T08:30:00Z',
        read: false,
    },
    {
        id: '10',
        sender: { name: 'Emily Watson' },
        message: 'Invited you to join a group.',
        timestamp: '2025-02-18T20:20:00Z',
        read: false,
    },
    {
        id: '18',
        sender: { name: 'Bruce Wayne' },
        message: 'Sent you a business inquiry.',
        timestamp: '2025-02-18T07:45:00Z',
        read: false,
    },
    {
        id: '3',
        sender: { name: 'Jessie Samson' },
        message: 'Liked your comment.',
        timestamp: '2025-02-17T12:20:00Z',
        read: true,
    },
    {
        id: '7',
        sender: { name: 'Michael Lee' },
        message: 'Commented on your status.',
        timestamp: '2025-02-17T09:15:00Z',
        read: false,
    },
    {
        id: '14',
        sender: { name: 'Diana Prince' },
        message: 'Added you to a chat.',
        timestamp: '2025-02-17T07:50:00Z',
        read: false,
    },
    {
        id: '6',
        sender: { name: 'Jessie Samson' },
        message: 'Liked your photo.',
        timestamp: '2025-02-16T10:45:00Z',
        read: true,
    },
    {
        id: '15',
        sender: { name: 'Ethan Hunt' },
        message: 'Sent you a video message.',
        timestamp: '2025-02-16T08:20:00Z',
        read: false,
    },
    {
        id: '19',
        sender: { name: 'Clark Kent' },
        message: 'Shared your story.',
        timestamp: '2025-02-15T19:00:00Z',
        read: false,
    },
    {
        id: '20',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-15T15:30:00Z',
        read: false,
    },
    {
        id: '21',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-15T15:30:00Z',
        read: false,
    },
    {
        id: '22',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-15T15:30:00Z',
        read: false,
    },
    {
        id: '23',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-15T15:30:00Z',
        read: false,
    },
    {
        id: '24',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-15T15:30:00Z',
        read: false,
    },
    {
        id: '25',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-14T15:30:00Z',
        read: false,
    },
    {
        id: '26',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-14T15:30:00Z',
        read: false,
    },
    {
        id: '27',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-14T15:30:00Z',
        read: false,
    },
    {
        id: '28',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-14T15:30:00Z',
        read: false,
    },
    {
        id: '29',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-14T15:30:00Z',
        read: false,
    },
    {
        id: '30',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-13T15:30:00Z',
        read: false,
    },
    {
        id: '31',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-13T15:30:00Z',
        read: false,
    },
    {
        id: '32',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-13T15:30:00Z',
        read: false,
    },
    {
        id: '33',
        sender: { name: 'Peter Parker' },
        message: 'Followed your profile.',
        timestamp: '2025-02-13T15:30:00Z',
        read: false,
    },
]

const groupNotificationsByDate = (notifications: Notification[]): { [key: string]: Notification[] } => {
    return notifications.reduce((acc: { [key: string]: Notification[] }, notification) => {
        const date = parseISO(notification.timestamp)
        let dateLabel = format(date, 'MMMM d, yyyy')
        if (isToday(date)) dateLabel = 'Today'
        else if (isYesterday(date)) dateLabel = 'Yesterday'

        if (!acc[dateLabel]) acc[dateLabel] = []
        acc[dateLabel].push(notification)
        return acc
    }, {})
}

const NotificationPage: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const groupedNotifications = groupNotificationsByDate(notifications)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null)
            }
        }

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openDropdown])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <PageHeader breadcrumbs={[{ label: 'Dashboard', href: path.Dashboard }, { label: 'Notifications' }]} />
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-y-2 my-5 sm:my-3">
                <motion.h1
                    className="text-2xl md:text-3xl font-bold text-dark-grey font-poppins"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}>
                    Notifications
                </motion.h1>
                <Button
                    size={'sm'}
                    variant={'solid'}
                    className="text-xs rounded-lg">
                    Mark All As Read
                </Button>
            </motion.header>
            <main className="mt-5">
                {Object.entries(groupedNotifications).map(([dateLabel, notifs], index) => (
                    <motion.div
                        key={dateLabel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="mb-5">
                        <p className="text-2xl text-dark-grey font-semibold font-inter">{dateLabel}</p>
                        {notifs.map((notif) => (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-5 sm:pb-8 sm:px-10 py-5 rounded-lg my-2 font-poppins text-sm sm:text-[15px]">
                                <div>
                                    <div className="flex items-center gap-x-3">
                                        {notif.sender.image ? (
                                            <img
                                                src={notif.sender.image}
                                                className="sm:w-16 sm:h-16 h-14 w-14"
                                                alt="User"
                                            />
                                        ) : (
                                            <div className="sm:w-16 sm:h-16 h-14 w-14 flex items-center justify-center rounded-full bg-vibrant-green text-off-white text-xl font-semibold uppercase">
                                                {notif.sender.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .slice(0, 2)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium">{notif.sender.name}</p>
                                            <p className="flex items-center gap-x-2 text-dark-grey">
                                                <ChevronLeft className="bg-dark-grey rounded-full text-off-white -rotate-45 h-4 w-4 p-0.5" />
                                                <span className="font-medium">{format(parseISO(notif.timestamp), 'hh:mm a')}</span>
                                                <span className="sm:block hidden">{format(parseISO(notif.timestamp), 'MMMM d, yyyy')}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-start ml-3 sm:ml-20 text-light-dark-grey gap-x-2 mt-2"
                                        ref={dropdownRef}>
                                        <MessageSquareMore size={20} />
                                        <p>{notif.message}</p>
                                    </div>
                                </div>
                                <div className="relative w-full sm:w-fit text-right sm:m-0 mt-2">
                                    <Button
                                        onClick={() => setOpenDropdown(openDropdown === notif.id ? null : notif.id)}
                                        variant={'ghost'}>
                                        <Ellipsis />
                                    </Button>
                                    {openDropdown === notif.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="absolute right-4 top-7">
                                            <Dropdown className="min-w-40">
                                                <DropdownItem className="py-0 px-0">
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full">
                                                        Mark As Read
                                                    </Button>
                                                </DropdownItem>
                                            </Dropdown>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ))}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-poppins text-light-dark-grey w-full text-center font-medium">
                    No More Notifications
                </motion.footer>
            </main>
        </motion.div>
    )
}

export default NotificationPage
