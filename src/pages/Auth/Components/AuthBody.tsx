import React from 'react'
import LeftContainer from './LeftContainer'
import Logo from '../../../components/Logo/Logo'

interface AuthBodyProps {
    // eslint-disable-next-line no-unused-vars
    CustomComponent?: React.ComponentType<{ onError: (error: string | null) => void }>
    // eslint-disable-next-line no-unused-vars
    onError: (error: string | null) => void
}

const AuthBody: React.FC<AuthBodyProps> = ({ CustomComponent, onError }) => {
    return (
        <div className="flex flex-col md:flex-row container h-full max-w-[1200px] w-fit bg-white p-5 rounded-lg drop-shadow-text-shadow shrink">
            <LeftContainer />
            <div className=" flex flex-col justify-center items-center md:p-10 py-5">
                <Logo
                    variant={'verticle'}
                    text={'hidden'}
                />
                <p className="font-inter text-2xl font-semibold">Sign In</p>
                <p className="text-light-dark-grey font-roboto-slab text-center">Get Access to your account</p>
                {CustomComponent && <CustomComponent onError={onError} />}
            </div>
        </div>
    )
}

export default AuthBody
