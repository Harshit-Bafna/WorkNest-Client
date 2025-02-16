import { FC } from 'react'
import AuthBody from '../Components/AuthBody'
import ResetPasswordImage from '../../../assets/auth/reset-password.svg'
import ResetPasswordForm from './ResetPasswordForm'

const authBody = {
    type: 'Reset Password',
    message: 'Enter your new password below and confirm it to secure your account.',
};

const leftContainer = {
    header: 'Reset Your Password',
    description: 'Almost there! Choose a strong new password and confirm it to update your credentials. Make sure it’s one you haven’t used before.',
    image: ResetPasswordImage,
};

const ResetPassword: FC = () => {

    return (
        <div className="bg-off-white min-h-screen min-w-screen w-full flex justify-center items-center p-10 transition-all">
            <AuthBody
                CustomComponent={ResetPasswordForm}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default ResetPassword
