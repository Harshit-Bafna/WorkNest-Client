import React from 'react'

export type NavItem = {
    title: string
    icon: React.ReactNode
    path: string
    submenu?: boolean
    submenuItems?: {
        title: string
        path: string
        icon?: React.ReactNode
    }[]
}

export interface Notification {
    id: string
    senderName: string
    message: string
    timestamp: string
    read: boolean
    onClickUrl: string
}

export interface User {
    name: string
    userName: string
    profileImage?: string
}
