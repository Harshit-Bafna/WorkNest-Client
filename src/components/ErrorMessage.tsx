import { FC } from 'react'

interface ErrorMessageProps {
    errorMessage: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
    return (
        <div className="bg-off-white fixed top-3 right-3 shadow-input-shadow px-5 py-5 w-64 z-50 border-l-4 border-bright-blue rounded-tr-xl rounded-br-xl select-none">
            <p className="text-dark-grey text-base font-inter font-medium">{errorMessage}</p>
        </div>
    )
}

export default ErrorMessage
