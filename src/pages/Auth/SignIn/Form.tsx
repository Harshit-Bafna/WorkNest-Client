import { Input } from '../../../components/ui/Forms/Input'
import { KeyRound, Mail } from 'lucide-react'
import { Label } from '../../../components/ui/Forms/Label'
import { Button } from '../../../components/ui/Button'
import { useRef, useState, useEffect, FormEvent, FC } from 'react'
import { emailRegex } from '../../../utils/constants/regex'
import { useDispatch } from 'react-redux'
import { setError } from '../../../store/slices/errorSlice'
import { AppDispatch } from '../../../store/store'
import { userLogin } from '../../../store/slices/authSlice'
import { LoginPayload } from '../../../store/Types/authTypes'

const Form: FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const emailRef = useRef<HTMLInputElement | null>(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [, setSuccess] = useState(false)

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            const errorMessage = 'Both email and password are required.'
            dispatch(setError(errorMessage))
            return
        }

        if (!emailRegex.test(email)) {
            const errorMessage = 'Invalid email address'
            dispatch(setError(errorMessage))
            return
        }

        const loginCredentials: LoginPayload = {
            emailAddress: email,
            password: password,
        }

        dispatch(userLogin(loginCredentials))
        setSuccess(true)
    }

    return (
        <div className="">
            <form
                className="md:min-w-72 mt-8 w-full"
                onSubmit={handleSubmit}>
                <div className="form-field">
                    <Label
                        htmlFor="email"
                        className="font-roboto-slab font-normal text-sm text-dark-grey">
                        Email <span className="text-red-700">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="abc@gmail.com"
                        leftIcon={<Mail />}
                    />
                </div>
                <div className="form-field mt-5">
                    <Label
                        htmlFor="password"
                        className="font-roboto-slab font-normal text-sm text-dark-grey">
                        Password <span className="text-red-700">*</span>
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="password"
                        leftIcon={<KeyRound />}
                    />
                </div>
                <div className="forgot-password mt-2 text-right">
                    <a
                        href="/"
                        className="text-bright-blue font-medium text-sm">
                        Forgot password?
                    </a>
                </div>
                <Button
                    type="submit"
                    className="mt-8"
                    size={'lg'}>
                    Sign In
                </Button>
                <div className="create-account mt-5 text-center">
                    <a
                        href="/"
                        className="text-bright-blue font-medium text-base">
                        Create an account
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Form
