import { Input } from '../../../components/ui/Forms/Input'
import { User, KeyRound, Mail, Building, BookUser, Hexagon, MoveRight, Link2 } from 'lucide-react'
import { Label } from '../../../components/ui/Forms/Label'
import { Button } from '../../../components/ui/Button'
import React, { useRef, useState, useEffect, FormEvent, FC } from 'react'
import { emailRegex, passwordRegex } from '../../../utils/constants/regex'
import { Checkbox } from '../../../components/ui/Forms/Checkbox'
import { cn } from '../../../utils/helper/syncHelper'
import { useDispatch } from 'react-redux'
import { setError } from '../../../store/slices/errorSlice'
import { AppDispatch } from '../../../store/store'
import { RegisterOrganizationPayload } from '../../../store/Types/authTypes'
import { registerOrganization } from '../../../store/slices/authSlice'
import useNavigation from '../../../hooks/useNavigation'
import path from '../../../Router/path'
import { Link } from 'react-router-dom'
import { uploadToAWS } from '../../../store/slices/awsSlice'
import { UploadFilePayload } from '../../../store/Types/awsTypes'

const FormIndividual: FC = () => {
    const { goTo } = useNavigation()
    const dispatch = useDispatch<AppDispatch>()

    const userRef = useRef<HTMLInputElement | null>(null)

    const [organizationName, setOrganizationName] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [logo, setLogo] = useState('')
    const [logoLoading, setLogoLoading] = useState(false)
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [conscent, setConsent] = useState(false)
    const [currentForm, setCurrentForm] = useState(1)

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])
    
    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {            
            const formData = new FormData()
            formData.append('file', file)
            formData.append('fileName', name)
            formData.append('folderName', 'Organization_logo')

            const awsPayload: UploadFilePayload = {
                fileDetails: formData,
                setLoading: setLogoLoading
            }

            const response = (await dispatch(uploadToAWS(awsPayload)).unwrap()) as { data: { key: string } }
            
            setLogo(response.data.key)
        }
    }

    const validateAndUpdateFormIndex = (formIndex: number) => {
        if (!organizationName) {
            const errorMessage = 'Organization name is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!registrationNumber) {
            const errorMessage = 'Registration number is required.'
            dispatch(setError(errorMessage))
            return
        }
        setCurrentForm(formIndex)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            const errorMessage = 'Email is required.'
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
        } else if (!name) {
            const errorMessage = 'Admin name is required.'
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

        if (!conscent) {
            const errorMessage = 'Please agree to terms and conditions'
            dispatch(setError(errorMessage))
            return
        }

        const organizationPayload: RegisterOrganizationPayload = {
            name: organizationName,
            emailAddress: email,
            logo: logo,
            website: websiteUrl,
            registrationNumber: registrationNumber,
            adminName: name,
            password: password,
            conscent: conscent,
        }

        const response = await dispatch(registerOrganization(organizationPayload))
        if (response.meta.requestStatus === 'fulfilled') {
            goTo(path.EmailVerificationSent, { replace: true, state: { EmailMessage: 'We have sent a verification link to', EmailAddress: email } })
        }
    }

    return (
        <div className="">
            <form
                className="md:min-w-72 mt-8 w-full"
                onSubmit={handleSubmit}>
                <div
                    className={cn(
                        'transition-transform duration-500 ease-in-out',
                        currentForm === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
                    )}>
                    <div className="form-field">
                        <Label
                            htmlFor="organization-name"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Organization Name <span className="text-red-700">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="organization-name"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setOrganizationName(e.target.value)}
                            value={organizationName}
                            placeholder="organization name"
                            leftIcon={<Building />}
                        />
                    </div>
                    <div className="form-field mt-5">
                        <Label
                            htmlFor="registration-number"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Registration number <span className="text-red-700">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="registration-number"
                            autoComplete="off"
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            value={registrationNumber}
                            placeholder="ABC123"
                            leftIcon={<BookUser />}
                        />
                    </div>
                    <div className="form-field mt-5">
                        <Label
                            htmlFor="logo"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Logo
                        </Label>
                        <Input
                            type="file"
                            id="logo"
                            autoComplete="off"
                            onChange={handleLogoUpload}
                            loading={logoLoading}
                            placeholder="logo"
                            leftIcon={<Hexagon />}
                        />
                    </div>
                    <div className="form-field mt-5">
                        <Label
                            htmlFor="url"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Website URL
                        </Label>
                        <Input
                            type="text"
                            id="url"
                            autoComplete="off"
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            value={websiteUrl}
                            placeholder="www.organization.com"
                            leftIcon={<Link2 />}
                        />
                    </div>
                    <Button
                        type="button"
                        className="mt-12"
                        onClick={() => validateAndUpdateFormIndex(2)}
                        size={'lg'}>
                        Next <MoveRight className="w-5 ml-3" />
                    </Button>
                </div>
                <div
                    className={cn(
                        'transition-transform duration-500 ease-in-out',
                        currentForm === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute hidden'
                    )}>
                    <div className="form-field">
                        <Label
                            htmlFor="name"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Admin Name <span className="text-red-700">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="admin name"
                            leftIcon={<User />}
                        />
                    </div>
                    <div className="form-field mt-5">
                        <Label
                            htmlFor="email"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Admin Email <span className="text-red-700">*</span>
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="abc@organization.com"
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
                    <div className="form-field mt-5">
                        <Label
                            htmlFor="cPassword"
                            className="font-roboto-slab font-normal text-sm text-dark-grey">
                            Confirm Password <span className="text-red-700">*</span>
                        </Label>
                        <Input
                            type="password"
                            id="cPassword"
                            autoComplete="off"
                            onChange={(e) => setCPassword(e.target.value)}
                            value={cPassword}
                            placeholder="confirm password"
                            leftIcon={<KeyRound />}
                        />
                    </div>
                    <div className="flex justify-start items-center forgot-password mt-8 text-left">
                        <Checkbox onCheckedChange={(checked) => setConsent(!!checked)} />
                        <p className="font-normal font-inter text-sm ml-2">Agree to terms and condition</p>
                    </div>
                    <Button
                        type="submit"
                        className="mt-2"
                        size={'lg'}>
                        Sign In
                    </Button>
                </div>
                <div className="create-account mt-5 text-center">
                    <Link
                        to={path.SignIn}
                        className="text-bright-blue font-medium text-base">
                        Sign in to an existing account
                    </Link>
                </div>
            </form>
            <div className="flex justify-center items-center font-inter mt-5 text-light-dark-grey">
                <hr className="w-8 border-light-dark-grey mr-2" />
                or as an individual
                <hr className="w-8 border-light-dark-grey ml-2" />
            </div>
            <Button
                onClick={() => goTo(path.SignUp_Individual)}
                size={'lg'}
                className="mt-2"
                variant={'outline'}>
                Register as an individual
            </Button>
        </div>
    )
}

export default FormIndividual
