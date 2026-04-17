import Navbar from "../components/Navbar";
import Hero from "../components/homePage/Hero";
import Features from "../components/homePage/Features";
import Stats from "../components/homePage/Stats";
import Destinations from "../components/homePage/Destinations";
import Testimonials from "../components/homePage/Testimonals"; // fixed
import CTA from "../components/homePage/CTA";
import Footer from "../components/Footer"; // fixed


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