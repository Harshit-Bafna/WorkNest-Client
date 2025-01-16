import React from 'react'
import LeftContainer from './LeftContainer'
import Logo from '../../../components/Logo/Logo'

interface AuthBodyProps {
    // eslint-disable-next-line no-unused-vars
    CustomComponent?: React.ComponentType<{ onError: (error: string | null) => void }>
    // eslint-disable-next-line no-unused-vars
    onError: (error: string | null) => void
    leftContainer: {
        header: string
        description: string
        image: string
    }
    authBody: {
        type: string
        message: string
    }
}

const AuthBody: React.FC<AuthBodyProps> = ({ CustomComponent, onError, leftContainer, authBody }) => {
    return (
        <div className="flex flex-col md:flex-row container h-full max-w-[1200px] w-fit bg-white p-5 rounded-lg drop-shadow-text-shadow shrink">
            <LeftContainer leftContainer={leftContainer} />
            <div className=" flex flex-col justify-center items-center md:p-10 py-5">
                <Logo
                    variant={'verticle'}
                    text={'hidden'}
                />
                <p className="font-inter text-2xl font-semibold">{authBody.type}</p>
                <p className="text-light-dark-grey font-roboto-slab text-center">{authBody.message}</p>
                {CustomComponent && <CustomComponent onError={onError} />}
            </div>
        </div>
    )
}

export default AuthBody
