import { Bell, Clock, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/Button'
import { Notification } from '@/lib/types/types'
import { getUserInitials } from '@/lib/utils/helper/syncHelper'
import path from '@/router/path'

interface NotificationsDropdownProps {
    notifications: Notification[]
    unreadCount: number
}

const NotificationsDropdown = ({ notifications, unreadCount }: NotificationsDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-muted hover:bg-primary-light/40">
                        <Bell size={20} />
                    </Button>
                    {unreadCount > 0 && (
                        <motion.span className="absolute -top-0 -right-2 flex items-center justify-center p-1 w-fit max-w-7 h-5 text-xs font-bold text-neutral bg-warning rounded-full">
                            {unreadCount < 100 ? unreadCount : '99+'}
                        </motion.span>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-70"
                sideOffset={8}>
                <div className="flex justify-between items-center text-sm p-2">
                    <h3 className="font-semibold text-secondary">Notifications</h3>
                    <span className="text-xs text-primary-light bg-primary px-2 py-0.5 rounded-full">{unreadCount} new</span>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto overflow-x-clip">
                    {notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            path={notification.onClickUrl}
                            className="justify-between py-3">
                            <div className="flex-col items-start">
                                <div className="flex gap-3 items-center">
                                    <div className="bg-primary text-lg font-semibold font-poppins rounded-full w-10 h-10 flex items-center justify-center text-neutral">
                                        {getUserInitials(notification.senderName)}
                                    </div>
                                    <div className="text-xs space-y-0.5">
                                        <p>{notification.senderName}</p>
                                        <p className="flex gap-1 text-dark-muted/80">
                                            <Clock /> {notification.timestamp}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-xs ml-13 font-poppins flex gap-1 mt-2">
                                    <MessageSquare />
                                    {notification.message}
                                </div>
                            </div>
                            {!notification.read && <div className="text-2xl">•</div>}
                        </DropdownMenuItem>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="justify-center text-primary font-medium"
                    path={path.notifications}>
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationsDropdown
