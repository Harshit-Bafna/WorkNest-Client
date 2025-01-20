import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '../Types/errorTypes'

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
