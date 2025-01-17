import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
    errorMessage: string | null
    isError: boolean
}

const initialState: ErrorState = {
    errorMessage: null,
    isError: false,
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.isError = true
            state.errorMessage = action.payload
        },
        clearError: (state) => {
            state.isError = false
            state.errorMessage = null
        },
    },
})

export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer
