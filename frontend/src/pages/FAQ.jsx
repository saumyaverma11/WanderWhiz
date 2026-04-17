import { useState } from "react";
import FAQHero from "../components/faq/FAQHero";
import FAQFilter from "../components/faq/FAQFilter";
import FAQAccordion from "../components/faq/FAQAccordion";
import FAQCTA from "../components/faq/FAQCTA";
import { faqData } from "../data/faqData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const FAQ = () => {
  const [active, setActive] = useState("All");

  const filteredData =
    active === "All"
      ? faqData
      : faqData.filter((item) => item.category === active);

  return (
    <>
      <Navbar />
      <FAQHero />
      <FAQFilter active={active} setActive={setActive} />
      <FAQAccordion data={filteredData} />
      <FAQCTA />
      <Footer/>
    </>
  );
};

export default FAQ;