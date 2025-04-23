import { useState, useRef, useEffect } from 'react'
import { AlignRight, ArrowRight, X } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'motion/react'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import path from '@/router/path'
import { navItems } from '@/router/Routes/unauthNavItems'
import { arrowVariants } from '@/lib/utils/animations'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string>('home')
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header className="fixed w-full top-0 backdrop-blur-sm z-40">
            <div className="flex items-center justify-center py-3 bg-secondary text-neutral text-sm font-montserrat gap-2">
                <div className="inline-flex gap-1 items-center">
                    <p className="hidden md:inline-flex text-neutral/70 mr-3">Streamline your workflow and boost your performance</p>
                    <Link
                        to={path.signUp}
                        className="flex items-center gap-2 hover:underline">
                        <p>Get started for free</p>
                        <motion.span
                            initial="initial"
                            whileHover="hover"
                            variants={arrowVariants}>
                            <ArrowRight size={16} />
                        </motion.span>
                    </Link>
                </div>
            </div>
            <div className="py-3 px-5 sm:px-10 md:px-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                        <img
                            src={logo || '/placeholder.svg'}
                            alt="worknest"
                            height={40}
                            width={40}
                        />
                        <p className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-bold text-lg">
                            <span className="text-2xl">W</span>ORK<span className="text-2xl">N</span>EST
                        </p>
                    </div>
                    <div className="relative lg:hidden">
                        <Button
                            ref={buttonRef}
                            variant="ghostSecondary"
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            className="relative">
                            <AnimatePresence
                                initial={false}
                                mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}>
                                        <X />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                        transition={{ duration: 0.2 }}>
                                        <AlignRight />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.aside
                                    ref={menuRef}
                                    className="absolute flex flex-col right-0 top-12 w-48 bg-white shadow-lg rounded-md overflow-hidden pt-2"
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}>
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.to}
                                            className="w-full justify-start rounded-none text-secondary/60 hover:bg-transparent"
                                            variant="ghostSecondary"
                                            onClick={() => setIsMenuOpen(false)}>
                                            <ScrollLink
                                                to={item.to}
                                                smooth={true}
                                                duration={500}
                                                spy={true}
                                                onSetActive={() => setActiveSection(item.to)}
                                                className={`w-full cursor-pointer hover:text-secondary hover:bg-muted/40 py-2 rounded-lg ${
                                                    activeSection === item.to ? 'text-secondary bg-muted' : ''
                                                }`}>
                                                {item.label}
                                            </ScrollLink>
                                        </Button>
                                    ))}
                                    <div className="px-3 py-3">
                                        <Button
                                            onClick={() => navigate(path.signUp)}
                                            className="w-full"
                                            variant="secondary">
                                            Get For Free
                                        </Button>
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>
                    </div>
                    <nav className="hidden lg:flex items-center gap-6 text-secondary/60 font-poppins">
                        {navItems.map((item) => (
                            <ScrollLink
                                key={item.to}
                                to={item.to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                onSetActive={() => setActiveSection(item.to)}
                                className={`cursor-pointer hover:text-secondary transition-colors ${
                                    activeSection === item.to ? 'text-secondary underline underline-offset-3' : ''
                                }`}>
                                {item.label}
                            </ScrollLink>
                        ))}
                        <Button
                            onClick={() => navigate(path.signUp)}
                            variant="secondary">
                            Get For Free
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
