import { FC } from 'react'
import AuthBody from '../Components/AuthBody'
import Form from './Form'
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

    return (
        <div className="bg-off-white min-h-screen min-w-screen w-full flex justify-center items-center p-10 transition-all">
            <AuthBody
                CustomComponent={Form}
                leftContainer={leftContainer}
                authBody={authBody}
            />
        </div>
    )
}

export default Index
