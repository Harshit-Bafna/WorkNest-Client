import Navbar from '@/components/Layout/Auth/Navbar/Navbar'
import Sidebar from '@/components/Layout/Auth/Sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    const [collapse, setCollapse] = useState(true)

    return (
        <div className="overflow-x-clip">
            <Navbar
                collapse={collapse}
                setCollapse={setCollapse}
            />
            <div className="flex w-screen relative">
                <Sidebar collapse={collapse} />
                <div
                    className={`relative h-full w-full flex-1 overflow-x-hidden px-7 my-5 ${collapse ? 'ml-0 sm:ml-16' : 'ml-16 lg:ml-50'}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RootLayout
