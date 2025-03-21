import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import Calendar from '@/assets/Home/Calendar.svg'
import TaskPad from '@/assets/Home/TaskPad.svg'
import { motion } from 'motion/react'
import { Link as ScrollLink } from 'react-scroll'
import path from '@/router/path'
import { useNavigate } from 'react-router-dom'
import { arrorVariants } from '@/lib/utils/animations'

const CallToAction = () => {
    const navigate = useNavigate()

    return (
        <section className="unauth-section-layout bg-gradient-to-b from-neutral to-primary-light py-24 overflow-x-clip">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="md:max-w-[900px] max-w-[540px] mx-auto relative">
                <h1 className="section-title">Manage tasks with ease and efficiency</h1>
                <p className="section-description">
                    Streamline your workflow, collaborate seamlessly, and boost productivity with our intuitive task management platform.
                </p>
                <img
                    src={Calendar}
                    alt="Calendar"
                    className="hidden sm:flex absolute -left-30 md:-left-60 -top-[70px] w-40 md:w-50"
                />
                <img
                    src={TaskPad}
                    alt="Calendar"
                    className="hidden sm:flex absolute -right-30 md:-right-48 -bottom-[30px] w-40 md:w-50"
                />
                <div className="flex justify-center mt-10">
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
                        <Button variant={'linkSecondary'} className='gap-2'>
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
            </motion.div>
        </section>
    )
}

export default CallToAction
