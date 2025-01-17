import { FC, useEffect } from 'react'
import './loader.css'

const Loader: FC = () => {
    useEffect(() => {
        // Disable scrolling
        document.body.classList.add('no-scroll')

        return () => {
            // Re-enable scrolling when the component is unmounted
            document.body.classList.remove('no-scroll')
        }
    }, [])

    return (
        <div className="absolute h-screen w-screen flex justify-center items-center z-[49] top-0 bg-light-blue">
            <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
        </div>
    )
}

export default Loader
