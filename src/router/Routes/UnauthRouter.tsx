import ForgotPasswordRequest from '@/pages/Authentication/Password/ForgotPasswordRequest'
import ResetPassword from '@/pages/Authentication/Password/ResetPassword'
import VerifyResetLink from '@/pages/Authentication/Password/VerifyResetLink'
import SignIn from '@/pages/Authentication/SignIn'
import SignUp from '@/pages/Authentication/SignUp'
import VerifyEmailLink from '@/pages/Authentication/VerifyEmailLink'
import Home from '@/pages/Home/Home'
import path from '@/router/path'
import { Route } from 'react-router-dom'
import OtpInput from '@/pages/Authentication/OtpInput'

const UnauthRouter = (
    <>
        <Route
            path={path.home}
            element={<Home />}
        />

        <Route
            path={path.signIn}
            element={<SignIn />}
        />

        <Route
            path={path.signUp}
            element={<SignUp />}
        />

        <Route
            path={`${path.emailVerifyLink}/:token`}
            element={<VerifyEmailLink />}
        />

        <Route
            path={path.forgotPassword}
            element={<ForgotPasswordRequest />}
        />

        <Route
            path={`${path.resetLinkVerify}/:token`}
            element={<VerifyResetLink />}
        />

        <Route
            path={path.resetPassword}
            element={<ResetPassword />}
        />

        <Route
            path={`${path.otp}/:otpType`}
            element={<OtpInput />}
        />
    </>
)

export default UnauthRouter
