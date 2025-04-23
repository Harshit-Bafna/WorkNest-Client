import { motion } from 'motion/react'
import { MoreVertical, Pause, Play, Eye, CheckSquare } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { useState, useRef } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/Button'

interface Task {
    id: string
    title: string
    status: 'Pending' | 'In Progress'
    projectname: string
    dueDays: number
}

const TodayTask = () => {
    const [isOpen, setIsOpen] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const tasks: Task[] = [
        {
            id: '1',
            title: 'Design Homepage and update the ui of the design',
            status: 'In Progress',
            projectname: 'Website Redesign',
            dueDays: 0,
        },
        {
            id: '2',
            title: 'Fix Login Bug',
            status: 'Pending',
            projectname: 'Authentication Module',
            dueDays: 1,
        },
        {
            id: '3',
            title: 'Deploy API',
            status: 'Pending',
            projectname: 'Backend Services',
            dueDays: 2,
        },
        {
            id: '4',
            title: 'Deploy API',
            status: 'Pending',
            projectname: 'Backend Services',
            dueDays: 2,
        },
    ]

    const totalTodayTask = tasks.length

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return (
                    <div className="w-8 h-8 rounded-full bg-alert flex items-center justify-center">
                        <Play className="w-4 h-4 text-neutral" />
                    </div>
                )
            case 'In Progress':
                return (
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                        <Pause className="w-4 h-4 text-primary" />
                    </div>
                )
            default:
                return null
        }
    }

    const getDueDaysText = (dueDays: number) => {
        if (dueDays === 0) return 'Today'
        if (dueDays === 1) return 'Tomorrow'
        return `${dueDays} days`
    }

    return (
        <motion.div
            className="border border-dark-muted/15 rounded-3xl p-5 bg-neutral h-74"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-montserrat font-bold text-secondary">Today&apos;s Tasks</h2>
                    <div className="bg-primary-light text-primary text-sm font-medium rounded-lg h-5 px-2 flex items-center justify-center">
                        {totalTodayTask}
                    </div>
                </div>
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

            <div
                ref={scrollContainerRef}
                className={`space-y-3 h-52 overflow-x-clip pr-1 ${tasks.length > 3 ? 'overflow-y-auto' : ''}`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            className="border border-dark-muted/15 rounded-2xl p-3 cursor-pointer hover:shadow-md transition-shadow bg-neutral"
                            variants={itemVariants}
                            whileHover={{ x: 3, backgroundColor: '#edf6f9' }}>
                            <div className="flex items-center gap-3">
                                {getStatusIcon(task.status)}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-montserrat text-sm font-medium text-secondary truncate">{task.title}</h3>
                                    <p className="text-primary text-xs truncate">{task.projectname}</p>
                                </div>
                                <div className="text-xs text-dark-muted font-medium whitespace-nowrap">{getDueDaysText(task.dueDays)}</div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        className="h-full flex flex-col items-center justify-center"
                        variants={itemVariants}>
                        <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
                            <CheckSquare className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-dark-muted text-sm font-montserrat text-center mb-2">No tasks for today</p>
                        <Button>Add Task</Button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default TodayTask
