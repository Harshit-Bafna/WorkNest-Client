import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const validateName = (name: string) => {
    if (!name) {
        return 'name is required'
    }
    if (name.length > 100) {
        return 'Name must be less than 100 characters'
    }
    return ''
}

export const validateEmail = (email: string) => {
    if (!email) {
        return 'Email is required'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Invalid email format'
    }
    return ''
}

export const validatePassword = (password: string) => {
    if (!password) {
        return 'Password is required'
    }
    if (password.length < 8 || password.length > 20) {
        return 'Password must be between 8 and 20 characters'
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number'
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        return 'Password must contain at least one special character'
    }
    return ''
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!password) {
        return 'Confirm Password is required'
    }
    if (password !== confirmPassword) {
        return 'Confirm password does not match with password'
    }
    return ''
}

export const handleShortcut = (e: KeyboardEvent, shortcuts: { keys: string; callback: () => void }[]) => {
    shortcuts.forEach(({ keys, callback }) => {
        const keyCombination = keys.split('+').map((key) => key.trim().toLowerCase())

        const isShortcutPressed = keyCombination.every((key) => {
            if (key === '⌘' || key === 'cmd') return e.metaKey
            if (key === 'ctrl') return e.ctrlKey
            if (key === 'alt') return e.altKey
            if (key === 'shift') return e.shiftKey
            return e.key.toLowerCase() === key
        })

        if (isShortcutPressed) {
            e.preventDefault()
            callback()
        }
    })
}
