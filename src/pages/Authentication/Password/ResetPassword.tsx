import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { ArrowLeft, Lock, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { validateConfirmPassword, validatePassword } from '@/lib/utils/helper/syncHelper'
import { useNavigate } from 'react-router-dom'
import path from '@/router/path'

const ResetPassword = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [confirmPsswordError, setConfirmPasswordError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const passwordValidationError = validatePassword(password)
        const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword)

        setPasswordError(passwordValidationError)
        setConfirmPasswordError(confirmPasswordValidationError)

        if (passwordValidationError || confirmPasswordValidationError) {
            return
        }

        navigate(path.signIn)
    }

    return (
        <div className="min-h-screen min-w-screen w-full h-full bg-gradient-to-r from-primary-light/10 to-muted/10 overflow-x-clip flex items-start sm:items-center justify-center">
            <div className="max-w-md my-15 mx-5">
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
                        <p>Almost There</p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="space-y-2 bg-gradient-to-b from-primary to-secondary text-center text-transparent bg-clip-text my-10">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold">Create New Password</h1>
                        <p className="text-base lg:text-lg font-montserrat">Enter your new password below to regain access to your account. </p>
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
                                htmlFor="new-password"
                                className="text-sm font-poppins">
                                New Password
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
                                htmlFor="confirm-new-password"
                                className="text-sm font-poppins">
                                Confirm New Password
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
                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full mt-5"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}>
                                Reset Password
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
                            <a
                                href="/"
                                className="text-primary hover:underline underline-offset-2">
                                Back to Sign In
                            </a>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}

export default ResetPassword
