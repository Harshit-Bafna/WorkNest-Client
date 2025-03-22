import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Bell, CheckCircle, Clock, Lock, Mail, Sparkles } from 'lucide-react'
import LinkedIn from '@/assets/Authentication/linkedin.svg'
import Google from '@/assets/Authentication/google.svg'
import GitHub from '@/assets/Authentication/github.svg'
import { motion } from 'framer-motion'
import { FeatureItem } from './components/FeatureItem'
import { InfoCard } from './components/InfoCard'
import { SocialLoginButton } from './components/SocialLoginButton'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { validateEmail, validatePassword } from '@/lib/utils/helper/syncHelper'
import path from '@/router/path'
import { Link, useNavigate } from 'react-router-dom'
import { OtpType } from '@/lib/constants'

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

const SignIn = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [success, setSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const emailValidationError = validateEmail(email)
        const passwordValidationError = validatePassword(password)

        setEmailError(emailValidationError)
        setPasswordError(passwordValidationError)

        if (emailValidationError || passwordValidationError) {
            return
        }

        setSuccess(true)

        if (success) {
            navigate(`${path.otp}/${OtpType.SignIn}`, { state: { email: email } })
        }
    }

    return (
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
                        <p>Welcome Back</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="space-y-2 bg-gradient-to-b from-primary to-secondary text-center md:text-left text-transparent bg-clip-text">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold">Ready to Get Things Done?</h1>
                            <p className="text-base lg:text-lg font-montserrat hidden md:block">
                                Sign in to access your projects, collaborate with your team, and boost your productivity.
                            </p>
                        </div>

                        <div className="mt-6 hidden sm:grid grid-cols-3 md:grid-cols-1 gap-4">
                            {features.map(({ icon, title, description }, index) => (
                                <FeatureItem
                                    key={index}
                                    icon={icon}
                                    title={title}
                                    description={description}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 mt-10 gap-5">
                            <InfoCard
                                title="New to WorkNest?"
                                description="Create an account to streamline your workflow and manage tasks efficiently."
                                linkText="Sign Up"
                                linkHref={path.signUp}
                            />
                            <InfoCard
                                title="Need Assistance?"
                                description="We're here to help! Reach out to our customer support team for any queries."
                                linkText="Contact Support"
                                linkHref={`${path.home}#contact-us`}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="w-full md:w-fit lg:w-1/2 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <h1 className="text-2xl font-montserrat font-bold text-secondary mb-7 hidden sm:block">Sign In</h1>

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
                                autoComplete="off"
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
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setPasswordError(validatePassword(e.target.value))
                                }}
                            />
                            {passwordError && <p className="text-warning font-medium text-xs mt-1">{passwordError}</p>}
                        </motion.div>

                        <motion.div
                            className="flex justify-between items-center"
                            variants={itemVariants}>
                            <div className="flex gap-2 justify-center items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-poppins cursor-pointer">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <Link
                                    to={path.forgotPassword}
                                    className="text-primary font-poppins text-sm hover:underline underline-offset-2">
                                    Forgot password?
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full mt-5"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}>
                                Sign In
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="flex font-poppins items-center justify-center gap-3 text-sm text-dark-muted my-4">
                                <hr className="h-px bg-dark-muted flex-grow" />
                                <span className="text-xs sm:text-sm">Or continue with</span>
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
                            <p>Don&apos;t have an account?</p>
                            <a
                                href="/"
                                className="text-primary hover:underline underline-offset-2">
                                Sign Up
                            </a>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}

export default SignIn
