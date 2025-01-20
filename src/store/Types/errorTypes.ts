export interface ErrorState {
    errorMessage: string | null
    isError: boolean
}

export const initialState: ErrorState = {
    errorMessage: null,
    isError: false,
}