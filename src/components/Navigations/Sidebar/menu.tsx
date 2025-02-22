import { LayoutDashboard, Folder, CheckSquare, BarChart2, Bell, Users, User, Settings, LogOut } from 'lucide-react'
import { MenuItem } from '../../../utils/types/types'
import path from '../../../Router/path'

export const menu: MenuItem[] = [
    {
        title: 'Main',
        header: true,
    },
    {
        title: 'Dashboard',
        path: path.Dashboard,
        icon: <LayoutDashboard size={20} />,
    },
    {
        title: 'Projects',
        path: path.Projects,
        icon: <Folder size={20} />,
    },
    {
        title: 'Tasks',
        path: path.Tasks,
        icon: <CheckSquare size={20} />,
    },
    {
        title: 'Analytics',
        path: path.Analytics,
        icon: <BarChart2 size={20} />,
    },
    {
        title: 'Notifications',
        path: path.Analytics,
        icon: <Bell size={20} />,
    },

    {
        title: 'Management',
        header: true,
    },
    {
        title: 'Organization',
        icon: <Users size={20} />,
        submenu: true,
        submenuItems: [
            {
                title: 'Details',
                path: path.OrganizationDetails,
            },
            {
                title: 'Management Tool',
                path: path.OrganizationManagementTool,
            },
        ],
    },

    {
        title: 'Account',
        header: true,
    },
    {
        title: 'Profile',
        icon: <User size={20} />,
        submenu: true,
        submenuItems: [
            {
                title: 'Basic Info',
                path: path.BasicProfile,
            },
            {
                title: 'Professional',
                path: path.ProfessionalProfile,
            },
            {
                title: 'Social',
                path: path.SocialProfile,
            },
            {
                title: 'Education',
                path: path.EducationProfile,
            },
        ],
    },
    {
        title: 'Settings',
        icon: <Settings size={20} />,
        submenu: true,
        submenuItems: [
            {
                title: 'Sessions & Prefs',
                path: path.GeneralSettings,
            },
            {
                title: 'Change Password',
                path: path.ChangePasswordSettings,
            },
        ],
    },
    {
        title: 'Logout',
        path: path.Logout,
        icon: <LogOut size={20} />,
    },
]
