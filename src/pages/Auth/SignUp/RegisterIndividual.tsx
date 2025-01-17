import { FC } from 'react'
import AuthBody from '../Components/AuthBody'
import FormIndividual from './FormIndividual'
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
    return (
        <div className="bg-off-white min-h-screen min-w-screen w-full flex justify-center items-center p-10 transition-all">
            <AuthBody
                CustomComponent={FormIndividual}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default RegisterIndividual
