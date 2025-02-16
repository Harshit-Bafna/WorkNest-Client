import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Index from '../pages/Auth/SignIn/Index'
import RegisterIndividual from '../pages/Auth/SignUp/RegisterIndividual'
import RegisterOrganization from '../pages/Auth/SignUp/RegisterOrganization'
import path from './path'
import ForgotPassword from '../pages/Auth/SignIn/ForgotPassword'
import EmailSent from '../pages/Auth/Verification/EmailSent'
import VerifyEmail from '../pages/Auth/Verification/VerifyEmail'
import ResetPassword from '../pages/Auth/SignIn/ResetPassword'

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path={path.SignIn}
                element={<Index />}
            />
            <Route
                path={path.SignUp_Individual}
                element={<RegisterIndividual />}
            />
            <Route
                path={path.SignUp_Organization}
                element={<RegisterOrganization />}
            />
            <Route
                path={path.ForgotPassword}
                element={<ForgotPassword />}
            />
            <Route
                path={path.ResetPassword}
                element={<ResetPassword />}
            />
            <Route
                path={path.EmailVerificationSent}
                element={<EmailSent />}
            />
            <Route
                path={path.Email_Verification}
                element={<VerifyEmail />}
            />
        </>
    )
)
