import { Link } from 'react-router-dom'
import { NotificationsDropdown } from './NotificationsDropdown'
import { UserProfileDropdown } from './UserProfileDropdown'
import { useState } from 'react'
import path from '../../../Router/path'

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    return (
        <nav className="duration-300 sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-off-white px-4 sm:px-12">
            <Link
                to={path.Dashboard}
                className="flex items-center select-none">
                <img
                    className="duration-300 mr-3 w-10 sm:w-12 cursor-pointer"
                    src="https://my-projects-images.s3.ap-south-1.amazonaws.com/worknest/logo-transparent.png"
                    alt="WorkNest-Logo"
                />
                <div className="text-md sm:text-lg font-semibold font-poppins">
                    <span className="text-xl sm:text-2xl">W</span>ORK
                    <span className="text-xl sm:text-2xl">N</span>EST
                </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
                <NotificationsDropdown
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                />
                <UserProfileDropdown
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                />
            </div>
        </nav>
    )
}

export default Navbar
