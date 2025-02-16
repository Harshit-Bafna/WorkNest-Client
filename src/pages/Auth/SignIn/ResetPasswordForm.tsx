import { Input } from '../../../components/ui/Forms/Input'
import { ArrowRight, KeyRound } from 'lucide-react'
import { Label } from '../../../components/ui/Forms/Label'
import { Button } from '../../../components/ui/Button'
import { useRef, useState, useEffect, FormEvent, FC } from 'react'
import { passwordRegex } from '../../../utils/constants/regex'
import { useDispatch } from 'react-redux'
import { setError } from '../../../store/slices/errorSlice'
import { AppDispatch } from '../../../store/store'
import path from '../../../Router/path'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ResetPasswordPayload } from '../../../store/Types/authTypes'
import { resetPassword } from '../../../store/slices/authSlice'

const ResetPasswordForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { token } = useParams()

    if (!token) {
        navigate(path.SignIn, {
            replace: true,
        })
    }

    const passwordRef = useRef<HTMLInputElement | null>(null)
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    useEffect(() => {
        if (passwordRef.current) {
            passwordRef.current.focus()
        }
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!password) {
            const errorMessage = 'Password is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!cPassword) {
            const errorMessage = 'Confirm password is required.'
            dispatch(setError(errorMessage))
            return
        }

        if (!passwordRegex.test(password)) {
            const errorMessage = 'Password too weak: (password must have a lowercase, uppercase, number and a special character)'
            dispatch(setError(errorMessage))
            return
        }

        if (!(password === cPassword)) {
            const errorMessage = 'Password and confirm password does not match'
            dispatch(setError(errorMessage))
            return
        }

        const resetPasswordPyload: ResetPasswordPayload = {
            token: token ? token : '',
            newPassword: password,
        }

        const response = await dispatch(resetPassword(resetPasswordPyload))

        if (response.meta.requestStatus === 'fulfilled') {
            navigate(path.SignIn, {
                replace: true,
            })
        }
    }

    return (
        <div className="">
            <form
                className="md:min-w-72 mt-8 w-full"
                onSubmit={handleSubmit}>
                <div className="form-field mt-5">
                    <Label
                        htmlFor="password"
                        className="font-roboto-slab font-normal text-sm text-dark-grey">
                        New Password <span className="text-red-700">*</span>
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="password"
                        leftIcon={<KeyRound />}
                    />
                </div>
                <div className="form-field mt-5">
                    <Label
                        htmlFor="cPassword"
                        className="font-roboto-slab font-normal text-sm text-dark-grey">
                        Confirm New Password <span className="text-red-700">*</span>
                    </Label>
                    <Input
                        type="password"
                        id="cPassword"
                        onChange={(e) => setCPassword(e.target.value)}
                        value={cPassword}
                        placeholder="confirm password"
                        leftIcon={<KeyRound />}
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

export default ResetPasswordForm
