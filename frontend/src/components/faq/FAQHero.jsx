import { MessageCircle } from "lucide-react";

const FAQHero = () => {
  return (
    <section className="text-center py-20 bg-[#f8fafc] px-6">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm mb-6">
        <MessageCircle size={16} />
        Help Center
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight">
        Frequently Asked <br />
        <span className="text-orange-500">Questions</span>
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
        Everything you need to know about WanderWhiz. Can't find your answer? Reach out directly.
      </p>

    </section>
  );
};

export default FAQHero;