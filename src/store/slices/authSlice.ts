import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    EmailVerificationPayload,
    ForgetPasswordPayload,
    initialState,
    LoginPayload,
    RegisterOrganizationPayload,
    RegisterUserPayload,
    ResendEmailVerificationPayload,
    ResetPasswordPayload,
} from '../Types/authTypes'
import config from '../../data/config'
import { setError } from './errorSlice'
import { startLoading, stopLoading } from './loaderSlice'
import { ApiResponse } from '../Types/ApiTypes'
import { setSuccess } from './successSlice'
import successMessage from '../../utils/constants/successMessage'

const serverURL = config.SERVER_URL
const authURL = 'api/v1/auth'
const organizationURL = 'api/v1/organisation'

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

export const registerOrganization = createAsyncThunk('organisation/create', async (organizationPayload: RegisterOrganizationPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.post(`${serverURL}/${organizationURL}/create`, organizationPayload)

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

export const userLogin = createAsyncThunk('auth/login', async (loginPayload: LoginPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.post(`${serverURL}/${authURL}/login`, loginPayload, { withCredentials: true })

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.User_LoggedIn))

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

export const forgetPassword = createAsyncThunk('auth/forgot-password', async (forgetPasswordPayload: ForgetPasswordPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.put(
            `${serverURL}/${authURL}/forgot-password?emailAddress=${forgetPasswordPayload.emailAddress}`
        )

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

export const verifyEmail = createAsyncThunk('auth/verify-email', async ({ token, code }: EmailVerificationPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.put(`${serverURL}/${authURL}/confirmation/${token}?code=${code}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.Email_Verified))

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

export const ResendVerifyEmailLink = createAsyncThunk('auth/verify-email', async ({ emailAddress }: ResendEmailVerificationPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.put(`${serverURL}/${authURL}/resend/email-verification?emailAddress=${emailAddress}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.Resend_Email_Verification_Link))

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

export const resetPassword = createAsyncThunk('auth/reset-password', async ({ token, newPassword }: ResetPasswordPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data }: { data: ApiResponse } = await axios.put(`${serverURL}/${authURL}/reset-password/${token}`, { newPassword: newPassword })

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.Password_Reset))

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
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.isLoggedIn = false
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.data = action.payload.data
            })
            .addCase(userLogin.rejected, (state) => {
                state.isLoggedIn = false
            })
    },
})

export default authSlice.reducer
