import { NavItem } from '@/lib/types/types'
import path from '@/router/path'
import {
    LayoutDashboard,
    Folder,
    BarChart2,
    Bell,
    Settings,
    ClipboardList,
    Users,
    LifeBuoy,
    CreditCard,
    FolderOpen,
    PlusCircle,
    CalendarDays,
    LayoutGrid,
    ListOrdered,
} from 'lucide-react'

export const navItems: { mainMenu: NavItem[]; serviceMenu: NavItem[] } = {
    mainMenu: [
        {
            title: 'Dashboard',
            path: path.dashboard,
            icon: <LayoutDashboard />,
        },
        {
            title: 'Projects',
            path: '',
            icon: <Folder />,
            submenu: true,
            submenuItems: [
                {
                    icon: <FolderOpen />,
                    title: 'All Projects',
                    path: path.allProject,
                },
                {
                    icon: <PlusCircle />,
                    title: 'Add Project',
                    path: path.addProject,
                },
            ],
        },
        {
            title: 'Tasks',
            path: '',
            icon: <ClipboardList />,
            submenu: true,
            submenuItems: [
                {
                    icon: <ListOrdered />,
                    title: 'List',
                    path: path.taskList,
                },
                {
                    icon: <LayoutGrid />,
                    title: 'Board',
                    path: path.taskBoard,
                },
                {
                    icon: <CalendarDays />,
                    title: 'Calendar',
                    path: path.taskCalendar,
                },
            ],
        },
        {
            title: 'Teams',
            path: path.teams,
            icon: <Users />,
        },
        {
            title: 'Analytics',
            path: path.analaytics,
            icon: <BarChart2 />,
        },
        {
            title: 'Notifications',
            path: path.notifications,
            icon: <Bell />,
        },
    ],
    serviceMenu: [
        {
            title: 'Subscription',
            path: path.subscription,
            icon: <CreditCard />,
        },
        {
            title: 'Settings',
            path: path.settings,
            icon: <Settings />,
        },
        {
            title: 'Support',
            path: path.support,
            icon: <LifeBuoy />,
        },
    ],
}
