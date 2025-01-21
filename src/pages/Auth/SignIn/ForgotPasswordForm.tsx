import { Input } from '../../../components/ui/Forms/Input'
import { Mail } from 'lucide-react'
import { Label } from '../../../components/ui/Forms/Label'
import { Button } from '../../../components/ui/Button'
import { useRef, useState, useEffect, FormEvent, FC } from 'react'
import { emailRegex } from '../../../utils/constants/regex'
import { useDispatch } from 'react-redux'
import { setError } from '../../../store/slices/errorSlice'
import { AppDispatch } from '../../../store/store'
import { forgetPassword } from '../../../store/slices/authSlice'
import { ForgetPasswordPayload } from '../../../store/Types/authTypes'

const ForgotPasswordForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const emailRef = useRef<HTMLInputElement | null>(null)

    const [email, setEmail] = useState('')

    const [, setSuccess] = useState(false)

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

        dispatch(forgetPassword(forgetPasswordPayload))
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
                <Button
                    type="submit"
                    className="mt-8"
                    size={'lg'}>
                    Send
                </Button>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
