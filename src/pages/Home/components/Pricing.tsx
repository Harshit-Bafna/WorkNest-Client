import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/helper/syncHelper'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'

const pricingTiers = [
    {
        title: 'Free',
        monthlyPrice: 0,
        buttonText: 'Get started for free',
        popular: false,
        inverse: false,
        features: ['Up to 5 project members', 'Up to 5 projects', '2GB storage', 'Basic customer support'],
    },
    {
        title: 'Pro',
        monthlyPrice: 9,
        buttonText: 'Sign up now',
        popular: true,
        inverse: true,
        features: [
            'Everything in free',
            'Up to 50 project members',
            'Unlimited tasks and projects',
            '5GB storage',
            'Priority support',
            'Advanced support',
            'Export support',
        ],
    },
    {
        title: 'Business',
        monthlyPrice: 19,
        buttonText: 'Sign up now',
        popular: false,
        inverse: false,
        features: [
            'Everything in Free, Pro',
            'Up to 10 project managers',
            'Unlimited project members',
            'Unlimited tasks and projects',
            '20GB storage',
            'Custom fields',
            'Advanced analytics',
            'Export capabilities',
            'Advanced security features',
            'Faster customer support',
        ],
    },
]

export const Pricing = () => {
    return (
        <section className="py-24 unauth-section-layout">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <div className="md:max-w-[900px] max-w-[540px] mx-auto">
                    <h2 className="section-title">Pricing</h2>
                    <p className="section-description">Free forever. Upgrade for unlimited tasks, better security, and exclusive features.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-end lg:justify-center mt-10">
                    {pricingTiers.map((tier) => (
                        <motion.div
                            whileHover={{
                                y: -2,
                                boxShadow: '0 10px 30px rgba(0, 30, 128, 0.1)',
                                transition: { duration: 0.1 },
                            }}
                            key={tier.title}
                            className={cn(
                                'p-10 border border-muted rounded-3xl shadow-xs max-w-xs w-full',
                                tier.inverse && 'border-secondary bg-secondary text-neutral'
                            )}>
                            <div className="flex justify-between items-center">
                                <h3 className={cn('text-lg font-bold font-poppins text-secondary/50', tier.inverse && 'text-neutral')}>
                                    {tier.title}
                                </h3>
                                {tier.popular && (
                                    <div className="text-sm inline-flex px-4 py-1.5 rounded-xl border-neutral/20">
                                        <motion.span
                                            animate={{ backgroundPositionX: '100%' }}
                                            transition={{ repeat: Infinity, duration: 1, repeatType: 'loop', ease: 'linear' }}
                                            className="bg-[linear-gradient(to_right,#dd7ddf,#e1cd86,#bbcb92,#71c2ef,#3bffff,#dd7ddf,#e1cd86,#bbcb92,#71c2ef,#3bffff)] [background-size:200%] text-transparent bg-clip-text font-roboto-slab font-medium border border-muted/20 px-4 rounded-full">
                                            Popular
                                        </motion.span>
                                    </div>
                                )}
                            </div>
                            <div className="font-poppins flex items-baseline gap-1 mt-[30px]">
                                <span className="text-4xl font-bold tracking-tighter leading-none">${tier.monthlyPrice}</span>
                                <span className="tracking-tight text-secondary/50 font-bold">/month</span>
                            </div>
                            <Button
                                variant={tier.inverse ? 'ghostSecondary' : 'secondary'}
                                className={cn('w-full mt-7.5', tier.inverse === true && 'bg-neutral')}>
                                {tier.buttonText}
                            </Button>
                            <ul className="flex flex-col gap-5 mt-8">
                                {tier.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex text-sm font-roboto-slab items-center gap-4">
                                        <Check size={24} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
