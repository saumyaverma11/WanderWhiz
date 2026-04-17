import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f8fafc] text-center py-20 px-6 mt-16">

      <div className="bg-orange-100 inline-flex p-4 rounded-full mb-6">
        <Mail className="text-orange-500" />
      </div>

      <h2 className="text-2xl font-semibold text-[#0f172a] mb-3">
        Still have questions?
      </h2>

      <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
        Can't find the answer you're looking for? Our team is happy to help — just reach out.
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center">

        {/* Contact Support */}
        <button
          onClick={() => navigate("/login")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          Contact Support
        </button>

        {/* Get Started */}
        <button
          onClick={() => navigate("/login")}
          className="border border-orange-500 text-orange-500 px-6 py-3 rounded-full hover:bg-orange-50 transition"
        >
          Get Started Free →
        </button>

      </div>

    </section>
  );
};

export default FAQCTA;