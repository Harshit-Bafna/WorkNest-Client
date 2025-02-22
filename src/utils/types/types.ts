import React from 'react'

export type DropdownProps = {
    children: React.ReactNode
    className?: string
    align?: 'left' | 'right'
}

export type UserProfile = {
    name: string
    emailAddress: string
    image?: string
}

export type Notification = {
    id: string
    sender: {
        name: string
        image?: string
    }
    message: string
    timestamp: string
    read: boolean
    url?: string
}

export type MenuItem = {
    title: string
    icon?: React.ReactNode
    path?: string
    header?: true
    submenu?: boolean
    submenuItems?: MenuItem[]
}