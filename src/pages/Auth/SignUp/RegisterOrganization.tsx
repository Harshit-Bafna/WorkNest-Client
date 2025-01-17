import { FC, useState } from 'react'
import AuthBody from '../Components/AuthBody'
import FormOrganization from './FormOrganization'
import ErrorMessage from '../../../components/ErrorMessage'
import RegisterTeamImage from '../../../assets/auth/register-team.svg'

const authBody = {
    type: 'Sign Up',
    message: 'Create your account today',
}

const leftContainer = {
    header: 'Start managing your tasks today',
    description: 'Create an account to streamline tasks, boost team collaboration, and task progress ...',
    image: RegisterTeamImage,
    btnText: 'Resgister as an organization',
    btnRoute: '/',
}

const RegisterOrganization: FC = () => {
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
                CustomComponent={FormOrganization}
                onError={handleError}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default RegisterOrganization
