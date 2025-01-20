import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RegisterUserPayload } from '../Types/authTypes'
import config from '../../data/config'
import { setError } from './errorSlice'
import { startLoading, stopLoading } from './loaderSlice'
import { ApiResponse } from '../Types/ApiTypes'

const serverURL = config.SERVER_URL
const authURL = 'api/v1/auth'

export const registerUser = createAsyncThunk('auth/register', async (userPayload: RegisterUserPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.post(`${serverURL}/${authURL}/create`, userPayload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        return data
    } catch (error) {
        const errorMessage =
            axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : error instanceof Error
                  ? error.message
                  : 'Something went wrong'
        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {}
})

export default authSlice.reducer
