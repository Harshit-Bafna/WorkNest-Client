import { FC, useState } from 'react'
import AuthBody from '../Components/AuthBody'
import FormIndividual from './FormIndividual'
import ErrorMessage from '../../../components/ErrorMessage'
import RegisterIndividualImage from '../../../assets/auth/register-individual.svg'

const authBody = {
    type: 'Sign Up',
    message: 'Create your account today',
}

const leftContainer = {
    header: 'Start managing your tasks today',
    description: 'Sign in to track your tasks, collaborate with your team, and stay ahead of your goals ...',
    image: RegisterIndividualImage,
    btnText: 'Resgister as an organization',
    btnRoute: '/',
}

const RegisterIndividual: FC = () => {
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
                CustomComponent={FormIndividual}
                onError={handleError}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default RegisterIndividual
