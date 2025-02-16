import { Input } from '../../../components/ui/Forms/Input'
import { ArrowRight, Mail } from 'lucide-react'
import { Label } from '../../../components/ui/Forms/Label'
import { Button } from '../../../components/ui/Button'
import { useRef, useState, useEffect, FormEvent, FC } from 'react'
import { emailRegex } from '../../../utils/constants/regex'
import { useDispatch } from 'react-redux'
import { setError } from '../../../store/slices/errorSlice'
import { AppDispatch } from '../../../store/store'
import { forgetPassword } from '../../../store/slices/authSlice'
import { ForgetPasswordPayload } from '../../../store/Types/authTypes'
import path from '../../../Router/path'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPasswordForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const emailRef = useRef<HTMLInputElement | null>(null)

    const [email, setEmail] = useState('')

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            const errorMessage = 'Email is required.'
            dispatch(setError(errorMessage))
            return
        }

        if (!emailRegex.test(email)) {
            const errorMessage = 'Invalid email address'
            dispatch(setError(errorMessage))
            return
        }

        const forgetPasswordPayload: ForgetPasswordPayload = {
            emailAddress: email,
        }

        const response = await dispatch(forgetPassword(forgetPasswordPayload))

        if (response.meta.requestStatus === 'fulfilled') {
            navigate(path.EmailVerificationSent, {
                replace: true,
                state: { EmailMessage: 'We have sent a password reset link to', EmailAddress: email, IsForgotPassword: true },
            })
        }
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
                <Button
                    type="submit"
                    className="mt-8"
                    size={'lg'}>
                    Send
                </Button>
            </form>
            <Link
                to={path.SignIn}
                className="text-bright-blue flex justify-center items-center mt-4 font-medium text-base">
                Go back to Sign In <ArrowRight className="w-10 h-5" />
            </Link>
        </div>
    )
}

export default ForgotPasswordForm
