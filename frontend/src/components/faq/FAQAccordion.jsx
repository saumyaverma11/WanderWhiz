import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQAccordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {data.map((section, i) => (
        <div key={i}>

          {/* CATEGORY TITLE */}
          <h2 className="font-semibold text-lg text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-orange-500 rounded"></span>
            {section.category}
          </h2>

          {/* QUESTIONS */}
          <div className="space-y-4">

            {section.questions.map((item, index) => {
              const isOpen = openIndex === `${i}-${index}`;

              return (
                <div
                  key={index}
                  className={`border rounded-xl p-4 cursor-pointer transition
                    ${isOpen ? "shadow-md border-orange-300" : "bg-white border-gray-200"}
                  `}
                  onClick={() => setOpenIndex(isOpen ? null : `${i}-${index}`)}
                >
                  
                  {/* Question */}
                  <div className="flex justify-between items-center">
                    <h3 className={`font-medium text-sm ${isOpen ? "text-orange-500" : "text-gray-800"}`}>
                      {item.q}
                    </h3>

                    <ChevronDown
                      size={18}
                      className={`transition ${isOpen ? "rotate-180 text-orange-500" : "text-gray-400"}`}
                    />
                  </div>

                  {/* Answer */}
                  {isOpen && (
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                      {item.a}
                    </p>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;