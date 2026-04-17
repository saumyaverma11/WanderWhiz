import ContactHero from "../components/contact/ContactHero";
import ContactInfoCards from "../components/contact/ContactInfoCards";
import ContactForm from "../components/contact/ContactForm";
import ContactSide from "../components/contact/ContactSide";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Contact = () => {
    return (
        <>
            <Navbar />
            <ContactHero />
            <ContactInfoCards />

            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
                <ContactForm />
                <ContactSide />
            </section>
            <Footer />
        </>
    );
};

export default Contact;