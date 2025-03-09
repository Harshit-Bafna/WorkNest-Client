import logo from '@/assets/logo.png'
import SocialInsta from '@/assets/Home/Social/social-insta.svg'
import SocialLinkedIn from '@/assets/Home/Social/social-linkedin.svg'
import SocialPin from '@/assets/Home/Social/social-pin.svg'
import SocialX from '@/assets/Home/Social/social-x.svg'
import SocialYoutube from '@/assets/Home/Social/social-youtube.svg'
import { Link as ScrollLink } from 'react-scroll' 

const Footer = () => {
    return (
        <footer className="bg-secondary text-neutral text-sm font-montserrat py-10 text-center">
            <div className="inline-flex justify-center">
                <img
                    src={logo}
                    alt="WorkNest"
                    height={40}
                    width={40}
                />
            </div>
            <nav className="flex flex-col sm:flex-row sm:justify-center gap-6 mt-6">
                <ScrollLink
                    to="home"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer">
                    Home
                </ScrollLink>
                <ScrollLink
                    to="features"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer">
                    Features
                </ScrollLink>
                <ScrollLink
                    to="pricing"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer">
                    Pricing
                </ScrollLink>
                <ScrollLink
                    to="testimonials"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer">
                    Testimonials
                </ScrollLink>
            </nav>
            <div className="flex justify-center gap-6 mt-6 items-center">
                <img
                    src={SocialX}
                    alt="X"
                />
                <img
                    src={SocialInsta}
                    alt="Instagram"
                />
                <img
                    src={SocialLinkedIn}
                    alt="LinkedIn"
                />
                <img
                    src={SocialPin}
                    alt="Pintrest"
                />
                <img
                    src={SocialYoutube}
                    alt="Youtube"
                />
            </div>
            <p className="mt-6">&copy; 2025 WorkNest, Inc. All right reserved.</p>
        </footer>
    )
}

export default Footer
