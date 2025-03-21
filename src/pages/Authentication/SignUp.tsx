import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Bell, CheckCircle, Clock, Lock, Mail, Sparkles, User } from 'lucide-react'
import LinkedIn from '@/assets/Authentication/linkedin.svg'
import Google from '@/assets/Authentication/google.svg'
import GitHub from '@/assets/Authentication/github.svg'
import { motion } from 'framer-motion'
import { FeatureItem } from './components/FeatureItem'
import { InfoCard } from './components/InfoCard'
import { SocialLoginButton } from './components/SocialLoginButton'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from '@/lib/utils/helper/syncHelper'
import EmailSent from '@/components/Verification/EmailSent'
import path from '@/router/path'

const features = [
    {
        icon: (
            <CheckCircle
                size={20}
                className="text-primary"
            />
        ),
        title: 'Seamless Workflow',
        description: 'Pick up where you left off with persistent sessions.',
    },
    {
        icon: (
            <Clock
                size={20}
                className="text-primary"
            />
        ),
        title: 'Real-time Collaboration',
        description: 'Stay in sync with instant updates and team notifications.',
    },
    {
        icon: (
            <Bell
                size={20}
                className="text-primary"
            />
        ),
        title: 'Smart Notifications',
        description: 'Get timely reminders so you never miss a deadline.',
    },
]

const socialLogin = [
    {
        name: 'Google',
        icon: Google,
    },
    {
        name: 'LinkedIn',
        icon: LinkedIn,
    },
    {
        name: 'GitHub',
        icon: GitHub,
    },
]

const SignUp = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPsswordError, setConfirmPasswordError] = useState('')

    const [success, setSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const nameValidationError = validateName(fullName)
        const emailValidationError = validateEmail(email)
        const passwordValidationError = validatePassword(password)
        const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword)

        setNameError(nameValidationError)
        setEmailError(emailValidationError)
        setPasswordError(passwordValidationError)
        setConfirmPasswordError(confirmPasswordValidationError)

        if (nameValidationError || emailValidationError || passwordValidationError || confirmPasswordValidationError) {
            return
        }

        setSuccess(true)
    }

    return success ? (
        <EmailSent
            email={email}
            title="Check Your Email"
            description="We've sent a verification link to your email address."
        />
    ) : (
        <div className="min-h-screen max-w-screen w-full h-full bg-gradient-to-r from-primary-light/10 to-muted/10 overflow-x-clip">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 lg:gap-8 min-h-screen min-w-screen w-full h-full py-10 px-5 sm:px-10 md:px-20 lg:px-24">
                <motion.div
                    className="w-full items-center md:items-start md:w-6/12 lg:w-1/2 flex flex-col justify-center gap-7"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}>
                    <motion.div
                        className="flex text-primary text-sm font-semibold font-montserrat gap-2 items-center justify-center w-fit bg-neutral shadow-sm px-4 py-1 rounded-full"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}>
                        <Sparkles size={16} />
                        <p>Join WorkNest</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="space-y-2 bg-gradient-to-b from-primary to-secondary text-center md:text-left text-transparent bg-clip-text">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold">Start Your Productivity Journey</h1>
                            <p className="text-base lg:text-lg font-montserrat hidden md:block">
                                Create an account to access powerful tools, collaborate with your team, and boost your productivity.
                            </p>
                        </div>

                        <div className="mt-6 hidden sm:grid grid-cols-3 md:grid-cols-1 gap-4">
                            {features.map((feature, index) => (
                                <FeatureItem
                                    key={index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 mt-10 gap-5">
                            <InfoCard
                                title="Already have an account?"
                                description="Sign in to access your projects and continue where you left off."
                                linkText="Sign In"
                                linkHref={path.signIn}
                            />
                            <InfoCard
                                title="Need Assistance?"
                                description="We're here to help! Reach out to our customer support team for any queries."
                                linkText="Contact Support"
                                linkHref={path.home}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="w-full md:w-fit lg:w-1/2 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <h1 className="text-2xl font-montserrat font-bold text-secondary mb-7 hidden sm:block">Sign Up</h1>

                    <motion.form
                        className="max-w-xs w-full space-y-3"
                        onSubmit={handleSubmit}
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}>
                        <motion.div
                            className="w-full"
                            variants={itemVariants}>
                            <label
                                htmlFor="fullName"
                                className="text-sm font-poppins">
                                Full Name
                            </label>
                            <Input
                                id="fullName"
                                type="text"
                                leftIcon={<User className="text-primary" />}
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            {nameError && <p className="text-warning font-medium text-xs mt-1">{nameError}</p>}
                        </motion.div>

                        <motion.div
                            className="w-full"
                            variants={itemVariants}>
                            <label
                                htmlFor="email"
                                className="text-sm font-poppins">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                leftIcon={<Mail className="text-primary" />}
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className="text-warning font-medium text-xs mt-1">{emailError}</p>}
                        </motion.div>

                        <motion.div
                            className="w-full"
                            variants={itemVariants}>
                            <label
                                htmlFor="password"
                                className="text-sm font-poppins">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                leftIcon={<Lock className="text-primary" />}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <p className="text-warning font-medium text-xs mt-1">{passwordError}</p>}
                        </motion.div>

                        <motion.div
                            className="w-full"
                            variants={itemVariants}>
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-poppins">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                leftIcon={<Lock className="text-primary" />}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {confirmPsswordError && <p className="text-warning font-medium text-xs mt-1">{confirmPsswordError}</p>}
                        </motion.div>

                        <motion.div
                            className="flex items-start gap-2"
                            variants={itemVariants}>
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-poppins cursor-pointer">
                                I agree to the{' '}
                                <a
                                    href="/"
                                    className="text-primary hover:underline underline-offset-2">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a
                                    href="/"
                                    className="text-primary hover:underline underline-offset-2">
                                    Privacy Policy
                                </a>
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full mt-5"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}>
                                Create Account
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="flex font-poppins items-center justify-center gap-3 text-sm text-dark-muted my-4">
                                <hr className="h-px bg-dark-muted flex-grow" />
                                <span className="text-xs sm:text-sm">Or sign up with</span>
                                <hr className="h-px bg-dark-muted flex-grow" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {socialLogin.map((social, index) => (
                                    <SocialLoginButton
                                        key={index}
                                        name={social.name}
                                        icon={social.icon}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex md:hidden items-center justify-center gap-1 font-poppins text-sm mt-10"
                            variants={itemVariants}>
                            <p>Already have an account?</p>
                            <a
                                href="/"
                                className="text-primary hover:underline underline-offset-2">
                                Sign In
                            </a>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}

export default SignUp
