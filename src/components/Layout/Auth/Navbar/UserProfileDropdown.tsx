import type React from 'react'
import { User, Settings, CreditCard, LogOut, LifeBuoy } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/Dropdown'
import { User as UserType } from '@/lib/types/types'
import path from '@/router/path'

interface UserProfileDropdownProps {
    user: UserType
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ user }) => {
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center focus:outline-none cursor-pointer">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden outline-2 outline-offset-2 border-primary">
                        {user.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary-light text-primary font-semibold">
                                {getUserInitials(user.name)}
                            </div>
                        )}
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-64"
                sideOffset={12}>
                <div className="flex items-center px-2 py-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary mr-3">
                        {user.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary-light text-primary font-semibold">
                                {getUserInitials(user.name)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-secondary">{user.name}</h3>
                        <p className="text-xs text-dark-muted/70">{user.userName}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2" path={path.profile}>
                    <User
                        size={16}
                        className="mr-2"
                    />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2" path={path.subscription}>
                    <CreditCard
                        size={16}
                        className="mr-2"
                    />
                    Subscripion
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2" path={path.settings}>
                    <Settings
                        size={16}
                        className="mr-2"
                    />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2" path={path.settings}>
                    <LifeBuoy
                        size={16}
                        className="mr-2"
                    />
                    Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2 text-warning" path={path.logout}>
                    <LogOut
                        size={16}
                        className="mr-2"
                    />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileDropdown
