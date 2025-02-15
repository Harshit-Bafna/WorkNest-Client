export interface SuccessState {
    successMessage: string | null
    isSuccess: boolean
}

export const initialState: SuccessState = {
    successMessage: null,
    isSuccess: false,
}