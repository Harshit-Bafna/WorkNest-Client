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