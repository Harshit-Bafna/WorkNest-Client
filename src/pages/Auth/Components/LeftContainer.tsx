import containerImg from '../../../assets/auth/container.png'
import { FC } from 'react'

interface LeftContainerProps {
    leftContainer: {
        header: string
        description: string
        image: string
    }
}

const LeftContainer: FC<LeftContainerProps> = ({ leftContainer }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${containerImg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className="bg-light-blue md:p-12 p-6 md:max-w-96 max-w-72 rounded-lg flex flex-col shrink md:text-left text-center">
            <div className="font-semibold font-poppins text-xl">{leftContainer.header}</div>
            <div className="font-normal font-inter md:text-base text-sm mt-4 text-light-dark-grey md:leading-7 sm:tracking-wide">
                {leftContainer.description}
            </div>
            <img
                className="mt-20 md:block hidden"
                src={leftContainer.image}
                alt="SignIn"
            />
        </div>
    )
}

export default LeftContainer
