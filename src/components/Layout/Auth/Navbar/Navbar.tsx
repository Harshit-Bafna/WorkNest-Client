import type React from 'react'
import Logo from '@/assets/logo.png'
import NotificationsDropdown from '@/components/Layout/Auth/Navbar/NotificationsDropdown'
import UserProfileDropdown from '@/components/Layout/Auth/Navbar/UserProfileDropdown'
import { Button } from '@/components/ui/Button'
import type { User as UserType, Notification } from '@/lib/types/types'
import { SidebarClose, SidebarOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import path from '@/router/path'

const user: UserType = {
    name: 'Harshit Bafna',
    userName: '@harshit_bafna',
    profileImage:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
}

const notifications: Notification[] = [
    {
        id: '1',
        senderName: 'Jessie Samson',
        message: 'Mentioned you in a comment.',
        timestamp: '10:41 AM August 7,2021',
        read: false,
        onClickUrl: '/test',
    },
    {
        id: '2',
        senderName: 'Jane Foster',
        message: 'Created an event.',
        timestamp: '10:20 AM August 7,2021',
        read: false,
        onClickUrl: '',
    },
    {
        id: '3',
        senderName: 'Jessie Samson',
        message: 'Liked your comment.',
        timestamp: '9:30 AM August 7,2021',
        read: true,
        onClickUrl: '/',
    },
    {
        id: '4',
        senderName: 'Jane Foster',
        message: 'Created an event.',
        timestamp: '10:20 AM August 7,2021',
        read: false,
        onClickUrl: '/',
    },
    {
        id: '5',
        senderName: 'Jane Foster',
        message: 'Created an event.',
        timestamp: '10:20 AM August 7,2021',
        read: false,
        onClickUrl: '/',
    },
]

const unreadCount = 99

interface NavbarProps {
    collapse: boolean
    setCollapse: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ collapse, setCollapse }: NavbarProps) => {
    const navigate = useNavigate()

    return (
        <header className="sticky z-40 top-0 flex items-center w-screen justify-between h-14 px-5 pl-5 sm:pr-10 border-b border-dark-muted/10 bg-neutral">
            <div className="flex items-center gap-8">
                <div className="max-w-6 w-full">
                    <Button
                        variant={'ghostSecondary'}
                        className="py-1 px-0 m-0 w-fit h-fit rounded-lg outline-none border-none hover:bg-transparent"
                        onClick={() => setCollapse(!collapse)}>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: collapse ? 0 : 180 }}
                            transition={{ duration: 0.3 }}>
                            {collapse ? <SidebarOpen size={20} /> : <SidebarClose size={20} />}
                        </motion.div>
                    </Button>
                </div>
                <button
                    onClick={() => navigate(path.dashboard)}
                    className="flex items-center justify-start gap-2 outline-none border-none cursor-pointer">
                    <img
                        src={Logo}
                        alt="worknest"
                        className="h-9 w-12"
                    />
                    <p className="bg-gradient-to-r from-primary to-secondary hidden sm:block text-transparent bg-clip-text font-bold text-base">
                        <span className="text-xl">W</span>ORK<span className="text-xl">N</span>EST
                    </p>
                </button>
            </div>

            <div className="flex items-center space-x-5 sm:space-x-8">
                <NotificationsDropdown
                    notifications={notifications}
                    unreadCount={unreadCount}
                />

                <UserProfileDropdown user={user} />
            </div>
        </header>
    )
}

export default Navbar
