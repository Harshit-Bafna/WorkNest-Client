import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { OtpType } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { validateEmail } from '@/lib/utils/helper/syncHelper'
import path from '@/router/path'
import { ArrowLeft, Mail, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPasswordRequest = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const emailValidationError = validateEmail(email)

        setEmailError(emailValidationError)

        if (emailValidationError) {
            return
        }

        setSuccess(true)

        if (success) {
            navigate(`${path.otp}/${OtpType.ResetPassword}`, { state: { email: email } })
        }
    }

    return (
        <div className="min-h-screen min-w-screen w-full h-full bg-gradient-to-r from-primary-light/10 to-muted/10 overflow-x-clip flex items-start sm:items-center justify-center">
            <div className="max-w-md h-full py-15 mx-5">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                    variants={containerVariants}>
                    <motion.div
                        className="flex text-primary text-sm font-semibold font-montserrat gap-2 items-center justify-center w-fit bg-neutral shadow-sm px-4 py-1 rounded-full"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}>
                        <Sparkles size={16} />
                        <p>Account Recovery</p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="space-y-2 bg-gradient-to-b from-primary to-secondary text-center text-transparent bg-clip-text my-10">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold">Forgot Your Password?</h1>
                        <p className="text-base lg:text-lg font-montserrat">
                            Don&apos;t worry, it happens to the best of us. Enter your email and we&apos;ll send you a reset link.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="w-full h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <motion.form
                        className="max-w-xs w-full space-y-3"
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit}
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
                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full mt-5"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}>
                                Send Reset Link
                            </Button>
                        </motion.div>
                        <motion.div
                            className="flex items-center justify-center gap-2 font-poppins text-sm mt-6"
                            variants={itemVariants}>
                            <motion.div
                                whileHover={{ x: -3 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                                <ArrowLeft
                                    size={16}
                                    className="text-primary"
                                />
                            </motion.div>
                            <Link
                                to={path.signIn}
                                className="text-primary hover:underline underline-offset-2">
                                Back to Sign In
                            </Link>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}

export default ForgotPasswordRequest
