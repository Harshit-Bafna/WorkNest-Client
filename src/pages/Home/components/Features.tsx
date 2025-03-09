import type React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Kanban, Users, Calendar, CheckSquare, Clock } from 'lucide-react'

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    color: string
}

const features = [
    {
        id: '1',
        icon: <BarChart3 size={24} />,
        title: 'Real-time Analytics',
        description: 'Track team performance and project progress with live data visualization and customizable dashboards.',
        color: 'bg-blue-100',
    },
    {
        id: '2',
        icon: <Kanban size={24} />,
        title: 'Multiple View Systems',
        description: 'Switch between list, board, calendar, and timeline views to visualize your work in the way that suits you best.',
        color: 'bg-indigo-100',
    },
    {
        id: '3',
        icon: <Users size={24} />,
        title: 'Organization & Solo Modes',
        description: 'Seamlessly switch between team collaboration and personal task management with dedicated workspaces.',
        color: 'bg-purple-100',
    },
    {
        id: '4',
        icon: <Calendar size={24} />,
        title: 'Meeting Scheduler',
        description: 'Coordinate team availability, schedule meetings, and send automated reminders to keep everyone in sync.',
        color: 'bg-pink-100',
    },
    {
        id: '5',
        icon: <CheckSquare size={24} />,
        title: 'Task Prioritization',
        description: 'Organize tasks by importance and urgency with customizable priority levels and visual indicators.',
        color: 'bg-red-100',
    },
    {
        id: '6',
        icon: <Clock size={24} />,
        title: 'Deadline Tracking',
        description: 'Never miss a deadline with automated reminders and visual progress tracking for all your tasks.',
        color: 'bg-orange-100',
    },
]

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
    return (
        <motion.div
            whileHover={{
                y: -2,
                boxShadow: '0 10px 30px rgba(0, 30, 128, 0.1)',
                transition: { duration: 0.1 },
            }}
            className="bg-neutral rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className="p-6">
                <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary`}>{icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary font-montserrat tracking-tight">{title}</h3>
                <p className="text-secondary/70 font-poppins tracking-normal">{description}</p>
            </div>
        </motion.div>
    )
}

const Feature = () => {
    return (
        <section
            className="pt-15 pb-24 unauth-section-layout bg-gradient-to-b from-neutral to-primary-light font-poppins">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 md:max-w-[900px] max-w-[540px] mx-auto">
                    <div className="text-sm inline-flex border border-dark-muted px-3 py-1 mb-5 rounded-lg tracking-tight font-montserrat">
                        Boost You Productivity
                    </div>
                    <h2 className="section-title">Powerful Features for Seamless Productivity</h2>
                    <p className="section-description">
                        Worknest provides all the tools you need to manage tasks efficiently, collaborate effectively, and boost your team&apos;s
                        productivity.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            color={feature.color}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Feature
