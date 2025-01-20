import { Input } from '../../../components/ui/Forms/Input'
import { User, KeyRound, Mail } from 'lucide-react'
import { Label } from '../../../components/ui/Forms/Label'
import { Button } from '../../../components/ui/Button'
import { useRef, useState, useEffect, FormEvent, FC } from 'react'
import { emailRegex, passwordRegex } from '../../../utils/constants/regex'
import { useDispatch } from 'react-redux'
import { setError } from '../../../store/slices/errorSlice'
import { RegisterUserPayload } from '../../../store/Types/authTypes'
import { registerUser } from '../../../store/slices/authSlice'
import { AppDispatch } from '../../../store/store'

const FormIndividual: FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const userRef = useRef<HTMLInputElement | null>(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const [, setSuccess] = useState(false)

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            const errorMessage = 'Email is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!name) {
            const errorMessage = 'Name is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!password) {
            const errorMessage = 'Password is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!cPassword) {
            const errorMessage = 'Confirm password is required.'
            dispatch(setError(errorMessage))
            return
        }

        if (!emailRegex.test(email)) {
            const errorMessage = 'Invalid email address'
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

        const registerUserPayload: RegisterUserPayload = {
            name: name,
            emailAddress: email,
            password: password,
            conscent: true,
            role: 'Admin'
        }

        dispatch(registerUser(registerUserPayload))
        setSuccess(true)
    }

    return (
        <div className="">
            <form
                className="md:min-w-72 mt-8 w-full"
                onSubmit={handleSubmit}>
                <div className="form-field">
                    <Label
                        htmlFor="name"
                        className="font-roboto-slab font-normal text-sm text-dark-grey">
                        Name <span className="text-red-700">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="your name"
                        leftIcon={<User />}
                    />
                </div>
                <div className="form-field mt-5">
                    <Label
                        htmlFor="email"
                        className="font-roboto-slab font-normal text-sm text-dark-grey">
                        Email <span className="text-red-700">*</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
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
                        Confirm Password <span className="text-red-700">*</span>
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
                        Sign in to an existing account
                    </a>
                </div>
            </form>
            <div className="flex justify-center items-center font-inter mt-5 text-light-dark-grey">
                <hr className="w-8 border-light-dark-grey mr-2" />
                or as an organization
                <hr className="w-8 border-light-dark-grey ml-2" />
            </div>
            <Button
                size={'lg'}
                className="mt-2"
                variant={'outline'}>
                Register as an organization
            </Button>
        </div>
    )
}

export default FormIndividual
