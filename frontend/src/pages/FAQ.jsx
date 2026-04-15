
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "How it works?", a: "AI generates itinerary." },
    { q: "Is it free?", a: "Yes basic version is free." },
  ];

  return (
    <>
      <Navbar />

      <div className="py-16 px-6 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10">
          FAQ
        </h1>

        {faqs.map((faq, i) => (
          <div key={i} className="border p-4 mb-3 rounded-xl">
            <h3 onClick={() => setOpen(i)} className="cursor-pointer font-semibold">
              {faq.q}
            </h3>
            {open === i && (
              <p className="text-gray-600 mt-2">{faq.a}</p>
            )}
          </div>
        ))}

      </div>

      <Footer />
    </>
  );
}

export default FAQ;