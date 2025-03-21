import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import DashboardImage from '../../../assets/Home/Dashboard.svg'
import { motion } from 'motion/react'
import { Link as ScrollLink } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import path from '@/router/path'
import { arrorVariants } from '@/lib/utils/animations'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <section className="unauth-section-layout overflow-hidden pt-36 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183ec2,#eaeefe_90%)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="md:flex items-center justify-between">
                <div className="md:w-[478px]">
                    <div className="text-sm inline-flex border border-dark-muted px-3 py-1 rounded-lg tracking-tight font-montserrat">
                        Version 1.0 is here
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-secondary to-primary text-transparent font-montserrat bg-clip-text pb-1 mt-6">
                        Manage tasks with ease and efficiency
                    </h1>
                    <p className="text-lg text-secondary tracking-tight mt-5 font-montserrat">
                        Streamline your workflow, collaborate seamlessly, and boost productivity with our intuitive task management platform.
                    </p>
                    <div className="mt-6">
                        <Button
                            onClick={() => navigate(path.signUp)}
                            variant={'secondary'}>
                            Get For Free
                        </Button>
                        <ScrollLink
                            to="features"
                            smooth={true}
                            duration={500}
                            spy={true}>
                            <Button
                                variant={'linkSecondary'}
                                className="gap-1">
                                Learn More
                                <motion.span
                                    initial="initial"
                                    whileHover="hover"
                                    variants={arrorVariants}>
                                    <ArrowRight size={18} />
                                </motion.span>
                            </Button>
                        </ScrollLink>
                    </div>
                </div>
                <div className="mt-15 md:mt-0 md:h-[648px] md:flex-1 relative">
                    <img
                        src={DashboardImage}
                        alt="Dashboard"
                        className="md:absolute md:h-full md:w-auto md:max-w-none md:left-6"
                    />
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
