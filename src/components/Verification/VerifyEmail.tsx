import { Button } from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { XCircle, Sparkles, CheckCircle, Mail, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { containerVariants, itemVariants, floatVariants, pulseVariants } from '@/lib/utils/animations'

interface VerifyEmailProps {
    verifyEmail: () => Promise<boolean>
    successNavigation: string
    errorNavigations: {
        text: string
        path: string
    }[]
}

const VerifyEmail = ({ verifyEmail, successNavigation, errorNavigations }: VerifyEmailProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [progress, setProgress] = useState(0)
    const [verificationStep, setVerificationStep] = useState(0)

    const verificationSteps = ['Connecting to server...', 'Validating credentials...', 'Verifying email address...', 'Finalizing verification...']

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + (1 + Math.random() * 2)
                return Math.min(newProgress, 95)
            })
        }, 300)

        const stepInterval = setInterval(() => {
            setVerificationStep((prev) => (prev < verificationSteps.length - 1 ? prev + 1 : prev))
        }, 1500)

        const verify = async () => {
            try {
                const result = await verifyEmail()
                setSuccess(result)
                setError(!result)
                setProgress(100)
            } catch {
                setError(true)
                setProgress(100)
            } finally {
                setLoading(false)
            }
        }

        const verifyTimeout = setTimeout(verify, 3000)

        if (success) {
            const redirectTimeout = setTimeout(() => {
                navigate(successNavigation)
            }, 3000)

            return () => clearTimeout(redirectTimeout)
        }

        return () => {
            clearInterval(progressInterval)
            clearInterval(stepInterval)
            clearTimeout(verifyTimeout)
        }
    }, [navigate, success, successNavigation, verificationSteps.length, verifyEmail])

    return (
        <div className="min-h-screen min-w-screen w-full h-full bg-gradient-to-r from-primary-light/10 to-muted/10 overflow-x-clip flex items-center justify-center">
            <motion.div
                className="max-w-md w-full mx-5 flex flex-col items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}>
                {loading && (
                    <>
                        <motion.div
                            className="flex text-primary text-sm font-semibold font-montserrat gap-2 items-center justify-center w-fit bg-neutral shadow-sm px-4 py-1 rounded-full mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}>
                            <Sparkles
                                size={16}
                                className="animate-pulse"
                            />
                            <p>Verifying Email</p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center gap-6 w-full"
                            variants={itemVariants}>
                            <div className="relative flex items-center justify-center w-24 h-24">
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-primary-light/20"
                                    variants={pulseVariants}
                                    initial="initial"
                                    animate="animate"
                                />

                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary-light/30">
                                    <motion.div
                                        variants={floatVariants}
                                        initial="initial"
                                        animate="animate"
                                        className="relative">
                                        <Mail className="h-10 w-10 text-primary" />
                                        <motion.div
                                            className="absolute -top-1 -right-1 bg-primary rounded-full p-1"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: 'loop',
                                            }}>
                                            <Shield className="h-3 w-3 text-white" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: 'linear',
                                    }}
                                />
                            </div>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl md:text-3xl font-montserrat font-bold bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text">
                                    Verifying Your Email
                                </h1>
                                <p className="text-base font-montserrat text-secondary">{verificationSteps[verificationStep]}</p>
                            </div>

                            <div className="w-full bg-neutral rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                                />
                            </div>

                            <motion.p
                                className="text-sm text-secondary/70 italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}>
                                This may take a moment...
                            </motion.p>
                        </motion.div>
                    </>
                )}

                {success && (
                    <motion.div
                        className="flex flex-col items-center gap-6"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible">
                        <motion.div
                            className="flex text-success text-sm font-semibold font-montserrat gap-2 items-center justify-center w-fit bg-neutral shadow-sm px-4 py-1 rounded-full mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}>
                            <CheckCircle size={16} />
                            <p>Verification Successful</p>
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-center w-20 h-20 rounded-full bg-success/20"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                            <CheckCircle className="h-10 w-10 text-success" />
                        </motion.div>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl md:text-3xl font-montserrat font-bold bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text">
                                Email Verified!
                            </h1>
                            <p className="text-base font-montserrat text-secondary">Please wait while we are redirecting...</p>
                            <motion.div
                                className="mt-4 flex justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}>
                                <div className="h-1.5 w-24 bg-neutral rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 2.8 }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {error && (
                    <>
                        <motion.div
                            className="flex text-warning text-sm font-semibold font-montserrat gap-2 items-center justify-center w-fit bg-neutral shadow-sm px-4 py-1 rounded-full mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}>
                            <XCircle size={16} />
                            <p>Verification Failed</p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center gap-6"
                            variants={itemVariants}>
                            <motion.div
                                className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-light/20"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{
                                    duration: 0.5,
                                    times: [0, 0.25, 0.75, 1],
                                    repeat: 1,
                                }}>
                                <XCircle className="h-10 w-10 text-warning" />
                            </motion.div>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl md:text-3xl font-montserrat font-bold bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text">
                                    Email Verification Failed
                                </h1>
                                <p className="text-base font-montserrat text-secondary mb-6">
                                    Sorry, we couldn&apos;t verify your email at the moment. Please try again later.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                {errorNavigations.map((errorNavigation, index) => (
                                    <motion.div
                                        key={index}
                                        className="w-full"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}>
                                        <Button
                                            className="w-full"
                                            onClick={() => navigate(errorNavigation.path)}
                                            variant={index === 0 ? 'default' : 'outline'}>
                                            {errorNavigation.text}
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default VerifyEmail
