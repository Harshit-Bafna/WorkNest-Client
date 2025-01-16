import { FC, useState } from 'react'
import AuthBody from '../Components/AuthBody'
import Form from './Form'
import ErrorMessage from '../../../components/ErrorMessage'

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
            />
        </div>
    )
}

export default Index
