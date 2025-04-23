import { motion } from 'framer-motion'
import { MoreVertical, Calendar, CheckCircle, Clock, AlertCircle, Folder, Users, CheckCircle2, Plus, Eye } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/Dropdown'
import { Tooltip } from '@/components/ui/Tooltip'
import { containerVariants, pulseVariants } from '@/lib/utils/animations'
import { Button } from '@/components/ui/Button'

interface TeamMember {
    id: string
    name: string
    avatar: string
    teamName: string
}

interface ProjectType {
    id: string
    image: string
    projectTitle: string
    projectNumber: number
    category: string
    taskDone: number
    taskPending: number
    taskInProgress: number
    startDate: string
    endDate?: string
    status: 'completed' | 'in-progress' | 'pending'
    team: TeamMember[]
    progress?: number
}

const projects: ProjectType[] = [
    {
        id: '1',
        image: 'https://vitbhopal-team-lc6jierh.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401',
        projectTitle: 'Website Redesign',
        projectNumber: 101,
        category: 'Design',
        taskDone: 12,
        taskPending: 4,
        taskInProgress: 3,
        startDate: '2025-01-10',
        endDate: '2025-03-15',
        status: 'completed',
        progress: 100,
        team: [
            {
                id: 't1',
                name: 'Alex Johnson',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Design Team',
            },
            {
                id: 't2',
                name: 'Sarah Miller',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Design Team',
            },
            {
                id: 't3',
                name: 'David Chen',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Design Team',
            },
        ],
    },
    {
        id: '2',
        image: 'https://vitbhopal-team-lc6jierh.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401',
        projectTitle: 'Mobile App Development',
        projectNumber: 102,
        category: 'Development',
        taskDone: 20,
        taskPending: 5,
        taskInProgress: 2,
        startDate: '2025-02-15',
        status: 'in-progress',
        progress: 74,
        team: [
            {
                id: 't4',
                name: 'Emily Wang',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Mobile Team',
            },
            {
                id: 't5',
                name: 'Michael Brown',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Mobile Team',
            },
            {
                id: 't6',
                name: 'Jessica Lee',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Mobile Team',
            },
            {
                id: 't7',
                name: 'Robert Kim',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Mobile Team',
            },
        ],
    },
    {
        id: '3',
        image: 'https://vitbhopal-team-lc6jierh.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401',
        projectTitle: 'Marketing Campaign',
        projectNumber: 103,
        category: 'Marketing',
        taskDone: 8,
        taskPending: 7,
        taskInProgress: 5,
        startDate: '2025-03-01',
        status: 'pending',
        progress: 40,
        team: [
            {
                id: 't8',
                name: 'Lisa Thompson',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Marketing Team',
            },
            {
                id: 't9',
                name: 'John Davis',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Marketing Team',
            },
        ],
    },
    {
        id: '4',
        image: 'https://vitbhopal-team-lc6jierh.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401',
        projectTitle: 'Data Analytics Platform',
        projectNumber: 104,
        category: 'Analytics',
        taskDone: 15,
        taskPending: 2,
        taskInProgress: 0,
        startDate: '2025-01-20',
        endDate: '2025-04-10',
        status: 'completed',
        progress: 100,
        team: [
            {
                id: 't10',
                name: 'Kevin Wilson',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Data Team',
            },
            {
                id: 't11',
                name: 'Amanda Garcia',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Data Team',
            },
            {
                id: 't12',
                name: 'Ryan Martinez',
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                teamName: 'Data Team',
            },
        ],
    },
]

const ProjectCard = ({ project }: { project: ProjectType }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-success bg-success/10'
            case 'in-progress':
                return 'text-alert bg-alert/10'
            case 'pending':
                return 'text-warning bg-warning/10'
            default:
                return 'text-dark-muted bg-muted'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 size={14} />
            case 'in-progress':
                return <Clock size={14} />
            case 'pending':
                return <AlertCircle size={14} />
            default:
                return null
        }
    }

    return (
        <motion.div className="border border-dark-muted/15 rounded-2xl p-5 bg-neutral shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <img
                        className="w-10 h-10 rounded-full border border-primary-light"
                        src={project.image}
                        alt={project.projectTitle}
                    />
                    <div>
                        <h3 className="font-montserrat font-semibold text-secondary">{project.projectTitle}</h3>
                        <div className="flex items-center gap-2 text-xs text-dark-muted">
                            <span className="bg-primary-light text-primary px-2 py-0.5 rounded-full">#{project.projectNumber}</span>
                            <span className="flex items-center gap-1">
                                <Folder size={12} />
                                {project.category}
                            </span>
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-primary cursor-pointer hover:bg-primary-light rounded-full p-1 transition-colors">
                        <MoreVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="min-w-30 "
                        align="end">
                        <DropdownMenuItem>
                            <Eye
                                size={14}
                                className="mr-2"
                            />
                            View Details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                    <span className="text-xs font-medium text-dark-muted">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${
                            project.status === 'completed' ? 'bg-success' : project.status === 'in-progress' ? 'bg-alert' : 'bg-warning'
                        }`}
                        style={{ width: `${project.progress}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-1 text-success font-medium">
                        <CheckCircle size={14} />
                        <span>{project.taskDone}</span>
                    </div>
                    <span className="text-xs text-dark-muted">Done</span>
                </div>

                <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-1 text-alert font-medium">
                        <Clock size={14} />
                        <span>{project.taskInProgress}</span>
                    </div>
                    <span className="text-xs text-dark-muted">In Progress</span>
                </div>

                <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-1 text-warning font-medium">
                        <AlertCircle size={14} />
                        <span>{project.taskPending}</span>
                    </div>
                    <span className="text-xs text-dark-muted">Pending</span>
                </div>
            </div>

            <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Users
                            size={14}
                            className="text-dark-muted"
                        />
                        <span className="text-xs font-medium text-dark-muted">{project.team[0]?.teamName}</span>
                    </div>
                    <span className="text-xs text-dark-muted">{project.team.length} members</span>
                </div>
                <div className="flex -space-x-2">
                    {project.team.slice(0, 4).map((member, index) => (
                        <Tooltip
                            key={member.id}
                            content={member.name}
                            side="top">
                            <div
                                className="w-8 h-8 rounded-full border-2 border-neutral bg-primary-light flex items-center justify-center text-xs font-bold text-primary overflow-hidden"
                                style={{ zIndex: project.team.length - index }}>
                                {member.avatar ? (
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    member.name.charAt(0)
                                )}
                            </div>
                        </Tooltip>
                    ))}
                    {project.team.length > 4 && (
                        <Tooltip
                            content={`${project.team.length - 4} more team members`}
                            side="top">
                            <div className="w-8 h-8 rounded-full border-2 border-neutral bg-muted flex items-center justify-center text-xs font-bold text-dark-muted">
                                +{project.team.length - 4}
                            </div>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center text-xs text-dark-muted">
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Started: {formatDate(project.startDate)}</span>
                </div>
                {project.status === 'completed' && project.endDate && (
                    <div className="flex items-center gap-1 text-success">
                        <CheckCircle2 size={14} />
                        <span>Completed: {formatDate(project.endDate)}</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <motion.div
                className="w-16 h-16 mb-4 rounded-full bg-primary-light flex items-center justify-center"
                variants={pulseVariants}
                initial="initial"
                animate="animate">
                <Folder
                    size={24}
                    className="text-primary"
                />
            </motion.div>
            <h3 className="font-montserrat font-medium text-secondary mb-1">No more projects</h3>
            <p className="text-dark-muted text-sm max-w-xs">You&apos;ve reached the end of your project list. Need to add a new project?</p>
        </div>
    )
}

const Projects = () => {
    return (
        <div className="border border-dark-muted/15 rounded-3xl p-5 bg-neutral">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-montserrat font-bold text-secondary">Projects</h2>
                    <div className="bg-primary-light text-primary text-sm font-medium rounded-lg h-5 px-2 flex items-center justify-center">
                        {projects.length}
                    </div>
                </div>
                <div className="hidden xs:flex items-center gap-2">
                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        className="bg-muted hover:bg-primary-light tracking-normal">
                        <Plus size={16} />
                        <span>Add Project</span>
                    </Button>
                    <Button
                        size={'sm'}
                        className="tracking-normal">
                        <Eye size={16} />
                        View All
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-primary cursor-pointer hover:bg-primary-light rounded-full p-1 transition-colors xs:hidden">
                        <MoreVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="min-w-30 "
                        align="end">
                        <DropdownMenuItem>
                            <Plus
                                size={14}
                                className="mr-2"
                            />
                            Add Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Eye
                                size={14}
                                className="mr-2"
                            />
                            View All
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <motion.div
                className=" gap-4 h-107 space-y-4 overflow-auto pr-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                {projects.map((project) => (
                    <ProjectCard
                        project={project}
                        key={project.id}
                    />
                ))}

                {projects.length < 2 && <EmptyState />}
            </motion.div>
        </div>
    )
}

export default Projects
