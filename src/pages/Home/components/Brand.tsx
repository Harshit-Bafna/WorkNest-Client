import { motion } from 'motion/react'
import acmeLogo from '../../../assets/Home/Brands/logo-acme.png'
import apexLogo from '../../../assets/Home/Brands/logo-apex.png'
import celestialLogo from '../../../assets/Home/Brands/logo-celestial.png'
import echoLogo from '../../../assets/Home/Brands/logo-echo.png'
import pulseLogo from '../../../assets/Home/Brands/logo-pulse.png'
import quantamLogo from '../../../assets/Home/Brands/logo-quantum.png'

const brandImages = [
    { id: '1', logo: acmeLogo, altName: 'Acme' },
    { id: '2', logo: apexLogo, altName: 'Apex' },
    { id: '3', logo: celestialLogo, altName: 'Celestial' },
    { id: '4', logo: echoLogo, altName: 'Echo' },
    { id: '5', logo: pulseLogo, altName: 'Pulse' },
    { id: '6', logo: quantamLogo, altName: 'Quantam' },
    { id: '7', logo: acmeLogo, altName: 'Acme' },
    { id: '8', logo: apexLogo, altName: 'Apex' },
    { id: '9', logo: celestialLogo, altName: 'Celestial' },
    { id: '10', logo: echoLogo, altName: 'Echo' },
    { id: '11', logo: pulseLogo, altName: 'Pulse' },
    { id: '12', logo: quantamLogo, altName: 'Quantam' },
]

const Brand = () => {
    return (
        <div className="py-8 md:py-12 bg-neutral">
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
                <motion.div
                    className="flex gap-14 pr-14 flex-none"
                    animate={{ translateX: '-50%' }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}>
                    {brandImages.map((brandImage) => {
                        return (
                            <img
                                key={brandImage.id}
                                src={brandImage.logo}
                                alt={brandImage.altName}
                                className="h-8 w-auto"
                            />
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default Brand
