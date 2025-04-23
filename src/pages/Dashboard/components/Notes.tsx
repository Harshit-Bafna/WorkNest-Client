import { motion } from 'motion/react'
import { MoreVertical, Eye, FileText, Edit, StickyNote } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { useState, useRef } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/Button'

interface Note {
    id: string
    title: string
    content: string
    category: string
}

const Notes = () => {
    const [isOpen, setIsOpen] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const notes: Note[] = [
        {
            id: '1',
            title: 'Meeting with design team',
            content: 'Discuss the new UI components and color scheme for the dashboard',
            category: 'Work',
        },
        {
            id: '2',
            title: 'Project requirements',
            content: 'List all the requirements for the new feature implementation',
            category: 'Project',
        },
        {
            id: '3',
            title: 'API documentation',
            content: 'Review the API documentation for the payment gateway integration',
            category: 'Development',
        },
        {
            id: '4',
            title: 'Weekly goals',
            content: 'Set goals for the upcoming sprint and assign tasks to team members',
            category: 'Planning',
        },
    ]

    const totalNotes = notes.length

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Work':
                return (
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                    </div>
                )
            default:
                return (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Edit className="w-4 h-4 text-primary" />
                    </div>
                )
        }
    }

    return (
        <motion.div
            className="border border-dark-muted/15 rounded-3xl p-5 bg-neutral h-74 lg:h-81.5"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-montserrat font-bold text-secondary">Notes</h2>
                    <div className="bg-primary-light text-primary text-sm font-medium rounded-lg h-5 px-2 flex items-center justify-center">
                        {totalNotes}
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
                className={`space-y-3 h-52 lg:h-60 overflow-x-clip pr-1 ${notes.length > 3 ? 'overflow-y-auto' : ''}`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <motion.div
                            key={note.id}
                            className="border border-dark-muted/15 rounded-2xl p-3 cursor-pointer hover:shadow-md transition-shadow bg-neutral"
                            variants={itemVariants}
                            whileHover={{ x: 3, backgroundColor: '#edf6f9' }}>
                            <div className="flex items-center gap-3">
                                {getCategoryIcon(note.category)}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-montserrat text-sm font-medium text-secondary truncate">{note.title}</h3>
                                    <p className="text-primary text-xs truncate max-w-45">{note.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        className="h-full flex flex-col items-center justify-center"
                        variants={itemVariants}>
                        <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
                            <StickyNote className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-dark-muted text-sm font-montserrat text-center mb-2">No notes available</p>
                        <Button>Create Note</Button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default Notes
