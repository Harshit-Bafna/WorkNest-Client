import { FC, useState } from 'react'
import AuthBody from '../Components/AuthBody'
import Form from './Form'
import ErrorMessage from '../../../components/ErrorMessage'
import LoginImage from '../../../assets/auth/loginPage.svg'

const authBody = {
    type: 'Sign In',
    message: 'Get Access to your account',
}

const leftContainer = {
    header: 'Good to Have You Back!',
    description: 'Sign in to track your tasks, collaborate with your team, and stay ahead of your goals ...',
    image: LoginImage,
}

const Index: FC = () => {
    const [userError, setUserError] = useState<string | null>(null)

    const handleError = (error: string | null) => {
        setUserError(error)

        if (error) {
            setTimeout(() => {
                setUserError(null)
            }, 5000)
        }
    }

    return (
        <div className="bg-off-white min-h-screen min-w-screen w-full flex justify-center items-center p-10 transition-all">
            {userError && <ErrorMessage errorMessage={userError} />}
            <AuthBody
                CustomComponent={Form}
                onError={handleError}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default Index
