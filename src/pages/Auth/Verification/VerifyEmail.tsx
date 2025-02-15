import { useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyEmail } from '../../../store/slices/authSlice'
import { EmailVerificationPayload } from '../../../store/Types/authTypes'
import { AppDispatch } from '../../../store/store'
import { setError } from '../../../store/slices/errorSlice'
import path from '../../../Router/path'

const EmailVerification = () => {
    const { token } = useParams()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        const verifyUserEmail = async () => {
            if (!token || !code) {
                dispatch(setError('Invalid verification link.'))
                navigate('/signup')
                return
            }

            try {
                const payload: EmailVerificationPayload = {
                    token: token,
                    code: code,
                }
                const response = await dispatch(verifyEmail(payload))

                if (response.meta.requestStatus === 'fulfilled') {
                    navigate(path.SignIn)
                } else {
                    dispatch(setError('Email verification failed.'))
                    navigate(path.SignUp_Individual)
                }
            } catch {
                dispatch(setError('Something went wrong.'))
                navigate(path.SignUp_Individual)
            }
        }

        verifyUserEmail()
    }, [token, code, dispatch, navigate])

    return null
}

export default EmailVerification
