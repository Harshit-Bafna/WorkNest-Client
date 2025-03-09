import avatar1 from '@/assets/Home/Testimonials/avatar-1.png'
import avatar2 from '@/assets/Home/Testimonials/avatar-2.png'
import avatar3 from '@/assets/Home/Testimonials/avatar-3.png'
import avatar4 from '@/assets/Home/Testimonials/avatar-4.png'
import avatar5 from '@/assets/Home/Testimonials/avatar-5.png'
import avatar6 from '@/assets/Home/Testimonials/avatar-6.png'
import avatar7 from '@/assets/Home/Testimonials/avatar-7.png'
import avatar8 from '@/assets/Home/Testimonials/avatar-8.png'
import avatar9 from '@/assets/Home/Testimonials/avatar-9.png'
import React from 'react'
import { motion } from 'motion/react'

type TestimonialsType = {
    text: string
    imageSrc: string
    name: string
    username: string
}

type TestimonialColumnType = {
    testimonials: TestimonialsType[]
    className?: string
    duration?: number
}

const testimonials: TestimonialsType[] = [
    {
        text: 'As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.',
        imageSrc: avatar1,
        name: 'Jamie Rivera',
        username: '@jamietechguru00',
    },
    {
        text: "Our team's productivity has skyrocketed since we started using this tool. ",
        imageSrc: avatar2,
        name: 'Josh Smith',
        username: '@jjsmith',
    },
    {
        text: 'This app has completely transformed how I manage my projects and deadlines.',
        imageSrc: avatar3,
        name: 'Morgan Lee',
        username: '@morganleewhiz',
    },
    {
        text: 'I was amazed at how quickly we were able to integrate this app into our workflow.',
        imageSrc: avatar4,
        name: 'Casey Jordan',
        username: '@caseyj',
    },
    {
        text: 'Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.',
        imageSrc: avatar5,
        name: 'Taylor Kim',
        username: '@taylorkimm',
    },
    {
        text: 'The customizability and integration capabilities of this app are top-notch.',
        imageSrc: avatar6,
        name: 'Riley Smith',
        username: '@rileysmith1',
    },
    {
        text: 'Adopting this app for our team has streamlined our project management and improved communication across the board.',
        imageSrc: avatar7,
        name: 'Jordan Patels',
        username: '@jpatelsdesign',
    },
    {
        text: 'With this app, we can easily assign tasks, track progress, and manage documents all in one place.',
        imageSrc: avatar8,
        name: 'Sam Dawson',
        username: '@dawsontechtips',
    },
    {
        text: 'Its user-friendly interface and robust features support our diverse needs.',
        imageSrc: avatar9,
        name: 'Casey Harper',
        username: '@casey09',
    },
]

const firstSlice = testimonials.slice(0, 3)
const secondSlice = testimonials.slice(3, 6)
const thirdSlice = testimonials.slice(6, 9)

const TestimonialColumn: React.FC<TestimonialColumnType> = ({ className, testimonials, duration }) => (
    <div className={className}>
        <motion.div
            animate={{ translateY: '-50%' }}
            transition={{ duration: duration || 10, repeat: Infinity, ease: 'linear' }}
            className="flex flex-col gap-6 pb-6 items-center">
            {[...new Array(2)].fill(0).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={index}>
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.username}
                            className="p-10 border border-muted rounded-3xl shadow-xs max-w-xs w-full">
                            <div>{testimonial.text}</div>
                            <div className="flex items-center gap-2 mt-5">
                                <img
                                    src={testimonial.imageSrc}
                                    alt={testimonial.name}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div className="flex flex-col font-montserrat">
                                    <div className="font-medium tracking-tight leading-5">{testimonial.name}</div>
                                    <div className="tracking-tight leading-5">{testimonial.username}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
)

export const Testimonials = () => {
    return (
        <div className="unauth-section-layout">
            <div className="md:max-w-[900px] max-w-[540px] mx-auto">
                <div className="flex justify-center">
                    <div className="text-sm inline-flex border border-dark-muted px-3 py-1 rounded-lg tracking-tight font-montserrat">
                        Testimonials
                    </div>
                </div>
                <h2 className="section-title mt-5">What our user says</h2>
                <p className="section-description">
                    From intutive design to powerful features, our app has become an essential tool for users around the world.
                </p>
            </div>
            <div className="flex justify-center gap-10  mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
                <TestimonialColumn testimonials={firstSlice} duration={15}/>
                <TestimonialColumn
                    testimonials={secondSlice}
                    className="hidden md:block"
                    duration={19}
                />
                <TestimonialColumn
                    testimonials={thirdSlice}
                    className="hidden lg:block"
                    duration={17}
                />
            </div>
        </div>
    )
}
