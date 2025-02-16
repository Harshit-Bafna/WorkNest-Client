export interface RegisterUserPayload {
    name: string
    emailAddress: string
    password: string
    conscent: boolean
    role: string
}

export interface RegisterOrganizationPayload {
    name: string
    emailAddress: string
    logo: string
    website: string
    registrationNumber: string
    adminName: string
    password: string
    conscent: boolean
}

export interface LoginPayload {
    emailAddress: string
    password: string
}

export interface ForgetPasswordPayload {
    emailAddress: string
}

export interface EmailVerificationPayload {
    token: string
    code: string
}

export interface ResendEmailVerificationPayload {
    emailAddress: string
}

export interface ResetPasswordPayload {
    token: string
    newPassword: string
}

interface AuthState {
    isLoggedIn: boolean
    data: unknown
}

export const initialState: AuthState = {
    isLoggedIn: false,
    data: null,
}