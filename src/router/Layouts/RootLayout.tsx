import Navbar from '@/components/Layout/Auth/Navbar/Navbar'
import Sidebar from '@/components/Layout/Auth/Sidebar'
import useWindowSize from '@/lib/hooks/useWindowSize'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    const { width } = useWindowSize()
    const [collapse, setCollapse] = useState(width >= 1024 ? false : true)

    useEffect(() => {
        setCollapse(width >= 1024 ? false : true)
    }, [width])

    return (
        <div className="overflow-x-clip">
            <Navbar
                collapse={collapse}
                setCollapse={setCollapse}
            />
            <div className="flex w-screen relative">
                <Sidebar collapse={collapse} />
                <div className={`relative h-full w-full flex-1 overflow-x-hidden px-7 my-5 ${collapse ? 'ml-0 sm:ml-16' : 'ml-0 sm:ml-16 lg:ml-50'}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RootLayout
