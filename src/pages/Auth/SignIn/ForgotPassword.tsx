import { FC } from 'react'
import AuthBody from '../Components/AuthBody'
import ForgotPasswordForm from './ForgotPasswordForm'
import ForgotPasswordImage from '../../../assets/auth/forgot-password.svg'

const authBody = {
    type: 'Forgot your password?',
    message: 'Enter your email below and we will send you a reset link',
}

const leftContainer = {
    header: 'Forgot Your Password?',
    description: 'Don’t worry, it happens to the best of us! Enter your email to receive a reset link and regain access to your account.',
    image: ForgotPasswordImage,
}

const ForgotPassword: FC = () => {

    return (
        <div className="bg-off-white min-h-screen min-w-screen w-full flex justify-center items-center p-10 transition-all">
            <AuthBody
                CustomComponent={ForgotPasswordForm}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default ForgotPassword
