import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AboutHero from "../components/about/AboutHero";
import MissionSection from "../components/about/MissionSection";
import FeaturesGrid from "../components/about/FeaturesGrid";
import ValuesSection from "../components/about/ValuesSection";
import JourneyTimeline from "../components/about/JourneyTimeline";
import AboutCTA from "../components/about/AboutCTA";

const About = () => {
  return (
    <>
      <Navbar />

      <AboutHero />
      <MissionSection />
      <FeaturesGrid />
      <ValuesSection />
      <JourneyTimeline />
      <AboutCTA />

      <Footer />
    </>
  );
};

export default About;