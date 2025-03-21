import { Button } from '@/components/ui/Button'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { Mail, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'

const maskEmail = (email: string) => {
    const [username, domain] = email.split('@')
    const maskedUsername = username.charAt(0) + '*'.repeat(Math.max(1, username.length - 2)) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
}

interface EmailVerificationSentProps {
    email: string
    title: string
    description: string
}

const EmailSent = ({ email, title, description }: EmailVerificationSentProps) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-light/20 to-muted/20 p-0 sm:p-6">
            <motion.div
                className="relative max-w-md w-full rounded-3xl sm:shadow-xl p-5 sm:p-10 overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={containerVariants}>
                <motion.div
                    className="flex flex-col items-center text-center space-y-6"
                    variants={containerVariants}>
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center w-24 h-24 rounded-full bg-primary-light/20 shadow-inner">
                        <Mail
                            size={42}
                            className="text-primary"
                        />
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl font-montserrat font-semibold text-secondary-dark">
                        {title}
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-secondary-light font-poppins text-base">
                        {description}
                    </motion.p>

                    <motion.p
                        variants={itemVariants}
                        className="text-primary font-poppins font-medium text-lg tracking-wide">
                        {maskEmail(email)}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="w-full">
                        <Button
                            className="w-full flex items-center justify-center gap-2 transition-transform hover:scale-105"
                            onClick={() => window.open('https://mail.google.com/', '_blank')}>
                            Open Gmail
                            <ExternalLink size={16} />
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-4">
                        <p className="text-sm text-secondary-light font-poppins">Didn’t receive the email? Check your spam folder or try again.</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default EmailSent
