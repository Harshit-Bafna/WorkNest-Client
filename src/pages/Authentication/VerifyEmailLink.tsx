import VerifyEmail from '@/components/Verification/VerifyEmail'
import path from '@/router/path'
import { useParams, useSearchParams } from 'react-router-dom'

const verifyEmail = async (code: string, token: string): Promise<boolean> => {
    if (!code || !token) {
        return new Promise((resolve) => setTimeout(() => resolve(false), 2000))
    }
    return new Promise((resolve) => setTimeout(() => resolve(true), 2000))
}

const VerifyEmailLink = () => {
    const { token = '' } = useParams<{ token: string }>()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code') as string
    const signIn = searchParams.get('signIn') === 'true'

    return (
        <div>
            <VerifyEmail
                verifyEmail={() => verifyEmail(code, token)}
                successNavigation={signIn ? path.dashboard : path.signIn}
                errorNavigations={[{ text: 'Go to Home', path: path.home }]}
            />
        </div>
    )
}

export default VerifyEmailLink
