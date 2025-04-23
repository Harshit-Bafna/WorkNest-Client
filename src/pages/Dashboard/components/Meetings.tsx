import { motion } from 'motion/react'
import { MoreVertical, Video, Plus, Eye } from 'lucide-react'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/Button'

interface IMeeting {
    id: string
    title: string
    status: 'In Progress' | 'Pending'
    time: string
    projectName: string
    projectId: string
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
}

const Meeting = () => {
    const [isOpen, setIsOpen] = useState(false)

    const meetings: IMeeting[] = [
        {
            id: '1',
            title: 'Finalize Homepage Design and UI Enhancements',
            status: 'In Progress',
            time: '10:00 AM',
            projectName: 'Website Redesign',
            projectId: '1',
        },
        {
            id: '2',
            title: 'Resolve Login Authentication Bug',
            status: 'Pending',
            time: '02:00 PM',
            projectName: 'Authentication Module',
            projectId: '2',
        },
        {
            id: '3',
            title: 'Deploy Production-Ready API Services',
            status: 'Pending',
            time: '04:00 PM',
            projectName: 'Backend Services',
            projectId: '3',
        },
    ]

    const totalMeetings = meetings.length

    const handleScheduleMeeting = () => {
        setIsOpen(false)
    }

    const getTimeFormat = (time: string) => {
        const [hours, minutes] = time.split(':')
        const period = time.includes('AM') ? 'AM' : 'PM'
        return { hours, minutes, period }
    }

    const isOngoing = (meeting: IMeeting) => {
        return meeting.status === 'In Progress'
    }

    return (
        <motion.div
            className="border border-dark-muted/15 rounded-3xl p-5 bg-neutral h-74"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-montserrat font-bold text-secondary truncate">Meetings</h2>
                    <div className="bg-primary-light text-primary text-sm font-medium rounded-lg h-5 px-2 flex items-center justify-center">
                        {totalMeetings}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu
                        open={isOpen}
                        onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger className="text-primary cursor-pointer hover:bg-primary-light rounded-full p-1 transition-colors">
                            <MoreVertical size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="min-w-30 max-w-10">
                            <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View All
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {meetings.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 h-52">
                    {meetings.map((meeting) => (
                        <motion.div
                            key={meeting.id}
                            className={`rounded-2xl py-3 px-4 cursor-pointer flex flex-col justify-between ${
                                isOngoing(meeting) ? 'bg-dark-muted text-neutral' : 'bg-dark-muted/15 text-secondary'
                            }`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs opacity-80">{getTimeFormat(meeting.time).period}</div>
                                    <div className="text-xl font-bold">{meeting.time.split(' ')[0]}</div>
                                </div>
                                <div
                                    className={`min-w-6 h-6 rounded-full ${
                                        isOngoing(meeting) ? 'bg-muted' : 'bg-dark-muted/20'
                                    } flex items-center justify-center`}>
                                    <Video className="w-3 h-3 text-secondary" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="font-medium text-sm truncate">{meeting.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div
                        className="rounded-2xl p-4 cursor-pointer bg-primary-light flex flex-col items-center justify-center"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        onClick={handleScheduleMeeting}>
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mb-1">
                            <Plus className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-primary text-sm text-center font-medium">Schedule meeting</span>
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    className="border-2 border-dashed border-dark-muted/30 rounded-2xl p-5 h-52 bg-muted flex flex-col items-center justify-center"
                    variants={itemVariants}>
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                        <Video className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-dark-muted text-sm font-montserrat text-center mb-3">No meetings scheduled for today</p>
                    <Button
                        size={'sm'}
                        className="tracking-normal">
                        Schedule Meeting
                    </Button>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Meeting
