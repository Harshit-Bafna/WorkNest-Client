import { itemVariants } from '@/lib/utils/animations'
import { Eye, MoreVertical, PlusCircle, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/Dropdown'
import { useState } from 'react'

const Reminders = () => {
    type Priority = 'High' | 'Medium' | 'Low'

    const [isOpen, setIsOpen] = useState(false)

    const reminders: { dueTime: string; priority: Priority; message: string }[] = [
        {
            dueTime: '09:00 AM',
            priority: 'High',
            message: 'Submit project report to manager',
        },
        {
            dueTime: '02:30 PM',
            priority: 'Medium',
            message: 'Team meeting for sprint planning',
        },
        {
            dueTime: '06:00 PM',
            priority: 'Low',
            message: 'Review task progress and update board',
        },
    ]

    const priorityColors: Record<Priority, string> = {
        High: 'bg-warning',
        Medium: 'bg-alert',
        Low: 'bg-success',
    }

    return (
        <div className="p-5 border 2xl:border-none border-dark-muted/15 rounded-3xl">
            <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-montserrat font-medium">Reminders</p>
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
                className="h-71 overflow-x-clip overflow-y-auto"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                {reminders.length > 0 ? (
                    reminders.map((reminder, index) => (
                        <div
                            key={index}
                            className="space-y-1 font-poppins my-3 rounded-xl p-3 hover:shadow-sm border-1 border-dark-muted/15 cursor-pointer">
                            <div className="flex justify-between">
                                <p className="text-lg font-medium">
                                    {reminder.dueTime.slice(0, -2)}
                                    <span className="text-sm text-dark-muted/70">{reminder.dueTime.slice(-2)}</span>
                                </p>
                                <p className={`text-xs text-white h-fit py-1 px-2 rounded-full ${priorityColors[reminder.priority]}`}>
                                    {reminder.priority}
                                </p>
                            </div>
                            <p className="text-sm truncate">{reminder.message}</p>
                        </div>
                    ))
                ) : (
                    <motion.div
                        className="h-full flex flex-col items-center justify-center"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible">
                        <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
                            <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-dark-muted text-sm font-montserrat text-center mb-2">No reminders set</p>
                    </motion.div>
                )}
            </div>
            <motion.div
                className="bg-primary-light flex items-center justify-center gap-3 rounded-full py-2 font-montserrat font-medium text-primary cursor-pointer mt-3"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}>
                Add Reminders
                <PlusCircle size={16} />
            </motion.div>
        </div>
    )
}

export default Reminders
