import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './slices/errorSlice'
import loaderReducer from './slices/loaderSlice'
import authReducer from './slices/authSlice'
import successReducer from './slices/successSlice'
import awsReducer from './slices/awsSlice'

export const store = configureStore({
    reducer: {
        error: errorReducer,
        success: successReducer,
        loader: loaderReducer,
        auth: authReducer,
        aws: awsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
