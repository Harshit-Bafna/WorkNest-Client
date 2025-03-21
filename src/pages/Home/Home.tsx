import Brand from '@/pages/Home/components/Brand'
import Features from '@/pages/Home/components/Features'
import { Pricing } from '@/pages/Home/components/Pricing'
import Hero from '@/pages/Home/components/Hero'
import { Testimonials } from '@/pages/Home/components/Testimonials'
import CallToAction from '@/pages/Home/components/CallToAction'
import Navbar from '@/components/Layout/Unauth/Navbar'
import Footer from '@/components/Layout/Unauth/Footer'
import ContactUs from '@/pages/Home/components/ContactUs'

const Home = () => {
    return (
        <>
            <Navbar />
            <div id="home">
                <Hero />
            </div>
            <Brand />
            <div id="features">
                <Features />
            </div>
            <div id="pricing">
                <Pricing />
            </div>
            <div id="testimonials">
                <Testimonials />
            </div>
            <CallToAction />
            <div id="contact-us">
                <ContactUs />
            </div>
            <Footer />
        </>
    )
}

export default Home
