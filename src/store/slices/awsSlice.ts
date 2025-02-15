import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setError } from './errorSlice'
import { ApiResponse } from '../Types/ApiTypes'
import config from '../../data/config'
import { DeleteFilePayload, GetSignedUrlPayload, UploadFilePayload } from '../Types/awsTypes'

const serverURL = config.SERVER_URL
const awsURL = 'api/v1/s3'

export const uploadToAWS = createAsyncThunk('aws/upload', async ({ fileDetails, setLoading }: UploadFilePayload, thunkAPI) => {
    try {
        setLoading(true)
        const { data }: { data: ApiResponse } = await axios.post(`${serverURL}/${awsURL}/upload`, fileDetails)

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
        setLoading(false)
    }
})

export const getSignedURL = createAsyncThunk('aws/getSignedUrl', async ({ key, setLoading }: GetSignedUrlPayload, thunkAPI) => {
    try {
        setLoading(true)
        const { data }: { data: ApiResponse } = await axios.get(`${serverURL}/${awsURL}/getSignedUrl?key=${key}`)

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
        setLoading(false)
    }
})

export const deleteFile = createAsyncThunk('aws/deleteFile', async ({ key, setLoading }: DeleteFilePayload, thunkAPI) => {
    try {
        setLoading(true)
        const { data }: { data: ApiResponse } = await axios.delete(`${serverURL}/${awsURL}/deleteFile?key=${key}`)

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
        setLoading(false)
    }
})

const authSlice = createSlice({
    name: 'aws',
    initialState: null,
    reducers: {},
})

export default authSlice.reducer
