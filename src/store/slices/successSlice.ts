import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '../Types/successTypes'

export const successSlice = createSlice({
    name: 'success',
    initialState,
    reducers: {
        setSuccess: (state, action: PayloadAction<string>) => {
            state.isSuccess = true
            state.successMessage = action.payload
        },
        clearSuccess: (state) => {
            state.isSuccess = false
            state.successMessage = null
        },
    },
})

export const { setSuccess, clearSuccess } = successSlice.actions

export default successSlice.reducer
