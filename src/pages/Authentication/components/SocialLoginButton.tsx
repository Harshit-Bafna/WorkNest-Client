import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface SocialLoginButtonProps {
    name: string
    icon: string
}

export const SocialLoginButton = ({ name, icon }: SocialLoginButtonProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button
                type="button"
                variant={'outlineSecondary'}
                className="w-full gap-2 border-dark-muted/20">
                <img
                    src={icon}
                    alt={name}
                    className="h-6"
                />
                <span className="hidden sm:inline">{name}</span>
            </Button>
        </motion.div>
    )
}
