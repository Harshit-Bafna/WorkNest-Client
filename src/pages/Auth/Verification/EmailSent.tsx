import { FC } from 'react'
import Lottie from 'lottie-react'
import emailSentAnimation from '../../../assets/auth/emailSent.json'
import { Button } from '../../../components/ui/Button'
import { Navigate, useLocation } from 'react-router-dom'
import path from '../../../Router/path'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { forgetPassword, ResendVerifyEmailLink } from '../../../store/slices/authSlice'
import { ForgetPasswordPayload, ResendEmailVerificationPayload } from '../../../store/Types/authTypes'

const EmailSent: FC = () => {
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()

    if (!location.state) {
        return <Navigate to={path.SignUp_Individual} />
    }

    const EmailMessage = location.state.EmailMessage
    const email = location.state.EmailAddress
    const IsEmailVerify = location.state.IsEmailVerify
    const IsForgotPassword = location.state.IsForgotPassword

    const handleClick = () => {
        if (IsEmailVerify) {
            const dispatchPayload: ResendEmailVerificationPayload = {
                emailAddress: email,
            }
            dispatch(ResendVerifyEmailLink(dispatchPayload))
        } else if (IsForgotPassword) {
            const dispatchPayload: ForgetPasswordPayload = {
                emailAddress: email,
            }
            dispatch(forgetPassword(dispatchPayload))
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-off-white px-4">
            <Lottie
                animationData={emailSentAnimation}
                loop={true}
                className="h-64 mb-6"
            />
            <h1 className="font-poppins font-bold text-3xl text-gray-800 mb-4">Email Sent!</h1>
            <p className="text-gray-600 text-center mb-6">{EmailMessage}</p>
            <div className="bg-white shadow-md rounded-lg px-6 py-3 mb-6 border border-teal-400">
                <p className="text-lg font-semibold text-gray-900">{email}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4">Please check your inbox and spam folder.</p>
            <Button onClick={handleClick}>Resend Email</Button>
        </main>
    )
}

export default EmailSent
