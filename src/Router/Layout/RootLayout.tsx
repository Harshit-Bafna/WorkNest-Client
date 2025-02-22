import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navigations/Navbar/Navbar'
import Sidebar from '../../components/Navigations/Sidebar/Sidebar'

const RootLayout = () => {
    const [collapse, setCollapse] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            setCollapse(window.innerWidth < 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                collapse={collapse}
                setCollapse={setCollapse}
            />

            <button
                className={`fixed inset-0 z-30 bg-gray-900 transition-opacity duration-300 ${
                    isMobile && !collapse ? 'opacity-50 z-30' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setCollapse(true)}></button>

            <div className={`flex flex-col flex-1`}>
                <Navbar />

                <div className={`overflow-auto bg-light-gray flex-1 p-5 sm:p-8 md:px-10 lg:px-14 ${isMobile ? 'ml-16' : collapse ? 'ml-16' : 'ml-60'} transition-all duration-300`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RootLayout
