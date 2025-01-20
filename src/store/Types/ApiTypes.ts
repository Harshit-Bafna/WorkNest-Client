export interface ApiResponse {
    success: boolean
    statusCode: number
    request: {
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}