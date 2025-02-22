import * as React from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { Button } from '../../ui/Button'
import { Dropdown, DropdownSeparator, DropdownItem } from '../../ui/Dropdown'
import userIcon from '../../../assets/user-icon.png'
import { motion } from 'framer-motion'
import { UserProfile } from '../../../utils/types/types'
import { Link } from 'react-router-dom'
import path from '../../../Router/path'

type UserProfileDropdownProps = {
    openDropdown: string | null
    // eslint-disable-next-line no-unused-vars
    setOpenDropdown: (dropdown: string | null) => void
}

const userProfile: UserProfile = {
    name: 'Jerry Seinfeld',
    emailAddress: 'jerry@example.com',
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ openDropdown, setOpenDropdown }) => {
    const isOpen = openDropdown === 'userProfile'
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
                onClick={() => setOpenDropdown(isOpen ? null : 'userProfile')}>
                <img
                    src={userProfile.image || userIcon}
                    alt=""
                    className="h-8 w-8 rounded-full"
                />
            </Button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}>
                    <Dropdown>
                        <div className="flex items-center gap-3 p-3">
                            <img
                                src={userProfile.image || userIcon}
                                alt={userProfile.name}
                                className="h-10 w-10 rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="font-medium">{userProfile.name}</span>
                                <span className="text-sm text-light-dark-grey">{userProfile.emailAddress}</span>
                            </div>
                        </div>
                        <DropdownSeparator />
                        <Link to={path.BasicProfile}>
                            <DropdownItem icon={<User className="h-4 w-4" />}>Profile</DropdownItem>
                        </Link>
                        <Link to={path.GeneralSettings}>
                            <DropdownItem icon={<Settings className="h-4 w-4" />}>Settings</DropdownItem>
                        </Link>
                        <DropdownSeparator />
                        <Link to={path.Logout}>
                            <DropdownItem
                                className="text-red"
                                icon={<LogOut className="h-4 w-4" />}>
                                Log out
                            </DropdownItem>
                        </Link>
                    </Dropdown>
                </motion.div>
            )}
        </div>
    )
}
