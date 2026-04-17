import { useState } from "react";
import { useLocation } from "react-router-dom";

import FAQHero from "../components/faq/FAQHero";
import FAQFilter from "../components/faq/FAQFilter";
import FAQAccordion from "../components/faq/FAQAccordion";
import FAQCTA from "../components/faq/FAQCTA";
import { faqData } from "../data/faqData";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ = () => {
  const [active, setActive] = useState("All");

  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  const filteredData =
    active === "All"
      ? faqData
      : faqData.filter((item) => item.category === active);

  return (
    <>
      {!isDashboard && <Navbar />}

      {/* ❌ Hide Hero */}
      {/* {!isDashboard && <FAQHero />} */}
      <FAQHero />
      <FAQFilter active={active} setActive={setActive} />
      <FAQAccordion data={filteredData} />

      {/* ❌ Hide CTA */}
      {!isDashboard && <FAQCTA />}

      {!isDashboard && <Footer />}
    </>
  );
};

export default FAQ;