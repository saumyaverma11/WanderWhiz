import { useLocation } from "react-router-dom";

import ContactHero from "../components/contact/ContactHero";
import ContactInfoCards from "../components/contact/ContactInfoCards";
import ContactForm from "../components/contact/ContactForm";
import ContactSide from "../components/contact/ContactSide";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dashboard");

    return (
        <>
            {!isDashboard && <Navbar />}

            {/* ❌ Hide Hero */}
            {/* {!isDashboard && <ContactHero />} */}
            <ContactHero />
            {/* ❌ Hide extra cards (optional but recommended) */}
            {!isDashboard && <ContactInfoCards />}

            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
                <ContactForm />
                <ContactSide />
            </section>

            {!isDashboard && <Footer />}
        </>
    );
};


export default Contact;