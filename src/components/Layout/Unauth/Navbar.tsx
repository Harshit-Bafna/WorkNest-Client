import { AlignRight, ArrowRight } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll' 
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/Button'

const Navbar = () => {
    return (
        <header className="fixed w-full top-0 backdrop-blur-sm z-40">
            <div className="flex items-center justify-center py-3 bg-secondary text-neutral text-sm font-montserrat gap-2">
                <div className="inline-flex gap-1 items-center">
                    <p className="hidden md:inline-flex text-neutral/70 mr-3">Streamline your workflow and boost your performance</p>
                    <p>Get started for free</p>
                    <ArrowRight size={16} />
                </div>
            </div>
            <div className="py-3 px-5 sm:px-10 md:px-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                        <img
                            src={logo}
                            alt="worknest"
                            height={40}
                            width={40}
                        />
                        <p className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-bold text-lg">
                            <span className="text-2xl">W</span>ORK<span className="text-2xl">N</span>EST
                        </p>
                    </div>
                    <AlignRight className="md:hidden" />
                    <nav className="hidden md:flex items-center gap-6 text-secondary/60 font-poppins">
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
                        <Button>Get For free</Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
