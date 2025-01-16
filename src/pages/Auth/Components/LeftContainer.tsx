import loginImage from '../../../assets/auth/loginPage.svg'
import containerImg from '../../../assets/auth/container.png'

const LeftContainer = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${containerImg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className="bg-light-blue md:p-12 p-6 md:max-w-96 max-w-72 rounded-lg flex flex-col shrink md:text-left text-center">
            <div className="font-semibold font-poppins text-xl">Good to Have You Back!</div>
            <div className="font-normal font-inter md:text-base text-sm mt-4 text-light-dark-grey md:leading-7 sm:tracking-wide">
                Sign in to track your tasks, collaborate with your team, and stay ahead of your goals ...
            </div>
            <img
                className="mt-20 md:block hidden"
                src={loginImage}
                alt="SignIn"
            />
        </div>
    )
}

export default LeftContainer
