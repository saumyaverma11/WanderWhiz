import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Destinations from "../components/Destinations";
import Testimonials from "../components/Testimonals";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Destinations />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;