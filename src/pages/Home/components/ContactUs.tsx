import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, Clock, Plus, Minus, Building, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, pulseVariants, listVariants, floatVariants } from '@/lib/utils/animations'

const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733878.082813951!2d75.77936030564574!3d23.94751878001472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39667381d35aea05%3A0xe0106b0d4e701c1e!2sMadhya%20Pradesh!5e0!3m2!1sen!2sin!4v1742552591893!5m2!1sen!2sin'

const faqData = [
    {
        id: 1,
        question: 'How quickly will I receive a response to my inquiry?',
        answer: 'We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call our support line directly for immediate assistance.',
    },
    {
        id: 2,
        question: 'Do you offer technical support for your platform?',
        answer: 'Yes, our dedicated technical support team is available during business hours to assist with any issues you may encounter. We also provide comprehensive documentation and video tutorials in our knowledge base.',
    },
    {
        id: 3,
        question: 'Can I schedule a personalized demo of your platform?',
        answer: "You can request a personalized demo through our contact form or by calling our sales team directly. We'll tailor the demonstration to focus on the features most relevant to your needs.",
    },
    {
        id: 4,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (UPI, Credit card, Debit card), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our payment gateway.',
    },
    {
        id: 5,
        question: 'Is there a free trial available before purchasing?',
        answer: 'No, we do not offer a free trial. However, we do provide a free tier that allows you to explore and use a limited set of features at no cost. This way, you can get a feel for the platform before deciding to upgrade to a paid plan.',
    },
]

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)

            setTimeout(() => {
                setSubmitSuccess(false)
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                })
            }, 3000)
        }, 1500)
    }

    const toggleFaq = (id: number) => {
        setExpandedFaq(expandedFaq === id ? null : id)
    }

    const handleGetDirections = () => {
        const latitude = 23.94751878001472
        const longitude = 75.77936030564574

        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en`

        window.open(googleMapsUrl, '_blank')
    }

    return (
        <div>
            <section className="unauth-section-layout pt-24 pb-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="md:max-w-[900px] max-w-[540px] mx-auto text-center">
                    <motion.div
                        variants={itemVariants}
                        className="text-sm inline-flex border border-dark-muted px-3 py-1 rounded-lg tracking-tight font-montserrat mb-5">
                        Get in Touch
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="section-title">
                        Contact Us
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="section-description">
                        Have questions or need assistance? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as
                        possible.
                    </motion.p>
                </motion.div>
            </section>

            <section className="unauth-section-layout pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-neutral rounded-3xl shadow-md p-8">
                            <motion.h2
                                variants={itemVariants}
                                className="text-2xl font-bold font-montserrat tracking-tight text-primary mb-6">
                                Send us a message
                            </motion.h2>

                            {submitSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-primary-light p-6 rounded-xl text-center">
                                    <div className="flex justify-center mb-4">
                                        <motion.div
                                            variants={pulseVariants}
                                            initial="initial"
                                            animate="animate"
                                            className="bg-primary rounded-full p-3">
                                            <Send className="text-neutral w-6 h-6" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-xl font-bold font-montserrat text-primary mb-2">Message Sent!</h3>
                                    <p className="text-secondary/70 font-poppins">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6">
                                    <motion.div variants={itemVariants}>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium font-roboto-slab text-secondary mb-1">
                                            Full Name
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            leftIcon={<User size={16} />}
                                            required
                                            className="w-full"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium font-roboto-slab text-secondary mb-1">
                                            Email Address
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email address"
                                            leftIcon={<AtSign size={16} />}
                                            required
                                            className="w-full"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium font-roboto-slab text-secondary mb-1">
                                            Subject
                                        </label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="What is this regarding?"
                                            leftIcon={<MessageSquare size={16} />}
                                            required
                                            className="w-full"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium font-roboto-slab text-secondary mb-1">
                                            Message
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="How can we help you?"
                                                required
                                                className="w-full rounded-md h-40 md:h-67 bg-muted/20 outline-2 outline-dark-muted/20 p-3 pl-10 text-sm font-roboto-slab font-normal placeholder:text-dark-muted/40 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-dark-muted/30 focus:ring-offset-1"
                                            />
                                            <span className="absolute left-3 top-3 w-4 flex items-center justify-center text-dark-grey">
                                                <MessageSquare size={16} />
                                            </span>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            className="w-full"
                                            disabled={isSubmitting}>
                                            Send Message
                                        </Button>
                                    </motion.div>
                                </form>
                            )}
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible">
                            <motion.div
                                variants={itemVariants}
                                className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold font-montserrat tracking-tight text-primary mb-6">Contact Information</h2>
                                    <p className="text-secondary/70 font-poppins mb-8">
                                        Feel free to reach out to us through any of the following channels. Our team is available to assist you during
                                        business hours.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <motion.div
                                        custom={0}
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: '0 10px 30px rgba(0, 30, 128, 0.1)',
                                            transition: { duration: 0.1 },
                                        }}
                                        className="bg-neutral rounded-xl p-6 shadow-sm border border-muted flex items-start gap-4">
                                        <div className="bg-primary-light rounded-lg p-3 text-primary">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold font-montserrat text-primary mb-1">Our Location</h3>
                                            <p className="text-secondary/70 font-poppins">
                                                123 Business Avenue, Tech District
                                                <br />
                                                Indore, M.P., India 451111
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        custom={1}
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: '0 10px 30px rgba(0, 30, 128, 0.1)',
                                            transition: { duration: 0.1 },
                                        }}
                                        className="bg-neutral rounded-xl p-6 shadow-sm border border-muted flex items-start gap-4">
                                        <div className="bg-primary-light rounded-lg p-3 text-primary">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold font-montserrat text-primary mb-1">Email Us</h3>
                                            <p className="text-secondary/70 font-poppins">
                                                support@worknest.com
                                                <br />
                                                info@worknest.com
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        custom={2}
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: '0 10px 30px rgba(0, 30, 128, 0.1)',
                                            transition: { duration: 0.1 },
                                        }}
                                        className="bg-neutral rounded-xl p-6 shadow-sm border border-muted flex items-start gap-4">
                                        <div className="bg-primary-light rounded-lg p-3 text-primary">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold font-montserrat text-primary mb-1">Call Us</h3>
                                            <p className="text-secondary/70 font-poppins">
                                                +91 9876543210
                                                <br />
                                                +91 8765432107
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        custom={3}
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: '0 10px 30px rgba(0, 30, 128, 0.1)',
                                            transition: { duration: 0.1 },
                                        }}
                                        className="bg-neutral rounded-xl p-6 shadow-sm border border-muted flex items-start gap-4">
                                        <div className="bg-primary-light rounded-lg p-3 text-primary">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold font-montserrat text-primary mb-1">Business Hours</h3>
                                            <p className="text-secondary/70 font-poppins">
                                                Monday - Friday: 9:00 AM - 6:00 PM
                                                <br />
                                                Saturday: 10:00 AM - 4:00 PM
                                                <br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-16">
                        <motion.div
                            variants={itemVariants}
                            className="bg-neutral rounded-3xl shadow-md overflow-hidden relative">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="md:col-span-1 bg-primary p-8 text-neutral">
                                    <motion.div
                                        variants={floatVariants}
                                        initial="initial"
                                        animate="animate"
                                        className="mb-6">
                                        <Building
                                            size={48}
                                            className="text-neutral/80"
                                        />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold font-montserrat mb-4">Visit Our Office</h3>
                                    <div className="space-y-4 font-poppins">
                                        <div className="flex items-start gap-3">
                                            <MapPin
                                                size={20}
                                                className="mt-1 flex-shrink-0"
                                            />
                                            <div>
                                                <p className="font-medium">Main Headquarters</p>
                                                <p className="text-neutral/80">
                                                    123 Business Avenue
                                                    <br />
                                                    Tech District
                                                    <br />
                                                    Indore, M.P., India 451111
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Globe
                                                size={20}
                                                className="mt-1 flex-shrink-0"
                                            />
                                            <div>
                                                <p className="font-medium">Global Offices</p>
                                                <p className="text-neutral/80">
                                                    India • New York • London
                                                    <br />
                                                    Sydney • Berlin • Tokyo
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <Button
                                            variant="outline"
                                            onClick={handleGetDirections}
                                            className="border-neutral text-neutral hover:bg-primary-light/20">
                                            Get Directions
                                        </Button>
                                    </div>
                                </div>
                                <div className="md:col-span-2 h-[400px] md:h-full bg-primary-light/30 relative">
                                    <iframe
                                        title="map"
                                        src={mapSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0"
                                    />
                                    <div className="absolute inset-0 pointer-events-none">
                                        <motion.div
                                            variants={pulseVariants}
                                            initial="initial"
                                            animate="animate"
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                                            <MapPin
                                                size={36}
                                                className="text-neutral"
                                            />
                                        </motion.div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6 text-neutral">
                                        <p className="font-montserrat font-medium">
                                            Located in the heart of the tech district, easily accessible by public transportation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-16">
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-12">
                            <h2 className="text-2xl font-bold font-montserrat tracking-tight text-primary">Frequently Asked Questions</h2>
                            <p className="text-secondary/70 font-poppins mt-2">Find quick answers to common questions about our services</p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="max-w-3xl mx-auto">
                            <div className="space-y-4">
                                {faqData.map((faq, index) => (
                                    <motion.div
                                        key={faq.id}
                                        custom={index}
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="border border-muted rounded-xl shadow-sm overflow-hidden bg-neutral">
                                        <button
                                            onClick={() => toggleFaq(faq.id)}
                                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                                            <h3 className="font-bold font-montserrat text-primary">{faq.question}</h3>
                                            <div className="bg-primary-light rounded-full p-1 text-primary">
                                                {expandedFaq === faq.id ? <Minus size={18} /> : <Plus size={18} />}
                                            </div>
                                        </button>

                                        <motion.div
                                            initial={false}
                                            animate={{ height: expandedFaq === faq.id ? 'auto' : 0, opacity: expandedFaq === faq.id ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden">
                                            <div className="p-5 pt-0 border-t border-muted">
                                                <p className="text-secondary/70 font-poppins">{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default ContactUs
