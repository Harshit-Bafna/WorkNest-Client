import type React from 'react'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Sparkles, Timer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import path from '@/router/path'
import { OtpType } from '@/lib/constants'

const OtpInput = () => {
    const { otpType = '' } = useParams<{ otpType: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const userId = searchParams.get('userId')
    const otpFromQuery = searchParams.get('otp')
    const length = 6

    const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
    const [activeInput, setActiveInput] = useState<number>(0)
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [resendTimer, setResendTimer] = useState<number>(0)
    const [resendLoading, setResendLoading] = useState<boolean>(false)
    const [isResending, setIsResending] = useState<boolean>(false)

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const { backLink, backText, title, description } = useMemo(() => {
        let backLink = path.home,
            backText = 'Back'

        if (otpType === OtpType.ResetPassword) {
            backLink = path.signIn
            backText = 'Back to Sign In'
        } else if (otpType === OtpType.Email) {
            backLink = path.signUp
            backText = 'Back to Sign Up'
        } else if (otpType === OtpType.SignIn) {
            backLink = path.signIn
            backText = 'Back to Sign In'
        }

        return {
            backLink,
            backText,
            title: 'Enter Verification Code',
            description: "We've sent a 6-digit code to your email address.",
        }
    }, [otpType])

    const handleOtpComplete = useCallback(
        async (otp: string, userId: string | null) => {
            if (otpType === OtpType.ResetPassword) {
                navigate(`${path.resetLinkVerify}/${userId}?code=${otp}`, { replace: true })
            } else if (otpType === OtpType.Email ) {
                navigate(`${path.emailVerifyLink}/${userId}?code=${otp}`, { replace: true })
            } else if (otpType === OtpType.SignIn) {
                navigate(`${path.emailVerifyLink}/${userId}?code=${otp}?signIn=true`, { replace: true })
            }
        },
        [navigate, otpType]
    )

    const handleOtpResend = useCallback(
        async (userId: string) => {
            if (!userId || isResending) return false

            setIsResending(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return true
            } finally {
                setIsResending(false)
            }
        },
        [isResending]
    )

    const formatTime = useCallback((seconds: number): string => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }, [])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const value = e.target.value

            if (!/^[a-zA-Z0-9]*$/.test(value)) {
                return
            }

            const char = value.slice(-1).toUpperCase()

            const newOtp = [...otp]
            newOtp[index] = char
            setOtp(newOtp)

            if (char && index < length - 1) {
                setActiveInput(index + 1)
                inputRefs.current[index + 1]?.focus()
            }

            const isOtpComplete = newOtp.every((val) => val !== '')
            setIsComplete(isOtpComplete)

            if (isOtpComplete) {
                handleOtpComplete(newOtp.join(''), userId)
            }
        },
        [otp, length, userId, handleOtpComplete]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                setActiveInput(index - 1)
                inputRefs.current[index - 1]?.focus()
            } else if (e.key === 'ArrowLeft' && index > 0) {
                setActiveInput(index - 1)
                inputRefs.current[index - 1]?.focus()
            } else if (e.key === 'ArrowRight' && index < length - 1) {
                setActiveInput(index + 1)
                inputRefs.current[index + 1]?.focus()
            }
        },
        [otp, length]
    )

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault()
            const pastedData = e.clipboardData.getData('text/plain').trim()
            const filteredData = pastedData.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

            const newOtp = [...otp]
            for (let i = 0; i < Math.min(filteredData.length, length); i++) {
                newOtp[i] = filteredData[i]
            }

            setOtp(newOtp)

            const nextEmptyIndex = newOtp.findIndex((val) => val === '')
            const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex
            setActiveInput(focusIndex)
            inputRefs.current[focusIndex]?.focus()

            const isOtpComplete = newOtp.every((val) => val !== '')
            setIsComplete(isOtpComplete)

            if (isOtpComplete) {
                handleOtpComplete(newOtp.join(''), userId)
            }
        },
        [otp, length, userId, handleOtpComplete]
    )

    const handleInputClick = useCallback((index: number) => {
        setActiveInput(index)
        inputRefs.current[index]?.focus()
    }, [])

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (isComplete) {
                handleOtpComplete(otp.join(''), userId)
            }
        },
        [isComplete, otp, userId, handleOtpComplete]
    )

    const handleResendCode = useCallback(async () => {
        if (!userId || resendTimer > 0 || resendLoading) return

        setResendLoading(true)
        try {
            const success = await handleOtpResend(userId)
            if (success) {
                setResendTimer(60)
            }
        } finally {
            setResendLoading(false)
        }
    }, [userId, resendTimer, resendLoading, handleOtpResend])

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    useEffect(() => {
        if (userId === null || userId === 'null') {
            navigate(path.home)
            return
        } else if (otpFromQuery) {
            const otpArray = otpFromQuery
                .split('')
                .slice(0, length)
                .map((char) => char.toUpperCase())

            if (otpArray.length < length) {
                const filledOtp = [...otpArray, ...Array(length - otpArray.length).fill('')]
                setOtp(filledOtp)
                setActiveInput(otpArray.length)
                if (inputRefs.current[otpArray.length]) {
                    inputRefs.current[otpArray.length]?.focus()
                }
            } else {
                setOtp(otpArray)
                setIsComplete(true)
                handleOtpComplete(otpArray.join(''), userId)
            }
        }
    }, [otpFromQuery, userId, navigate, length, handleOtpComplete])

    useEffect(() => {
        // eslint-disable-next-line no-undef
        let interval: NodeJS.Timeout | null = null

        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [resendTimer])

    if (!otpType || (otpType !== OtpType.ResetPassword && otpType !== OtpType.Email && otpType !== OtpType.SignIn)) {
        navigate(path.home)
        return null
    }

    const renderOtpInputs = () => {
        return Array.from({ length }, (_, index) => (
            <div
                key={index}
                className="relative">
                <input
                    ref={(el) => {
                        inputRefs.current[index] = el
                    }}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    onClick={() => handleInputClick(index)}
                    className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-montserrat rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        activeInput === index
                            ? 'border-primary bg-primary-light/10'
                            : otp[index]
                              ? 'border-primary/70 bg-neutral'
                              : 'border-dark-muted/20 bg-neutral'
                    }`}
                    aria-label={`OTP digit ${index + 1}`}
                />
            </div>
        ))
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
                        <p>Verification</p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="space-y-2 bg-gradient-to-b from-primary to-secondary text-center text-transparent bg-clip-text my-10">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold">{title}</h1>
                        <p className="text-base lg:text-lg font-montserrat">{description}</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="w-full h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <motion.form
                        className="max-w-xs w-full space-y-6"
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit}
                        variants={containerVariants}>
                        <motion.div
                            className="w-full flex justify-center"
                            variants={itemVariants}>
                            <div className="flex gap-2 sm:gap-3 justify-center">{renderOtpInputs()}</div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full mt-5"
                                disabled={!isComplete}
                                whileHover={{ scale: isComplete ? 1.02 : 1 }}
                                whileTap={{ scale: isComplete ? 0.98 : 1 }}>
                                {isComplete ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle size={18} />
                                        Verify Code
                                    </span>
                                ) : (
                                    'Verify Code'
                                )}
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
                                to={backLink}
                                className="text-primary hover:underline underline-offset-2">
                                {backText}
                            </Link>
                        </motion.div>

                        <motion.div
                            className="text-center text-sm font-poppins text-dark-muted"
                            variants={itemVariants}>
                            Didn&apos;t receive the code?{' '}
                            {resendTimer > 0 ? (
                                <div className="inline-flex items-center gap-1 text-primary">
                                    <Timer size={14} />
                                    <span>Resend in {formatTime(resendTimer)}</span>
                                </div>
                            ) : (
                                <Button
                                    variant={'link'}
                                    onClick={handleResendCode}
                                    disabled={resendLoading || !userId}
                                    className="p-0">
                                    {resendLoading ? 'Sending...' : 'Resend Code'}
                                </Button>
                            )}
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}

export default OtpInput
