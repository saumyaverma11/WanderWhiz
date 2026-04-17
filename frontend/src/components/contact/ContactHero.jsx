import { Mail } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="text-center py-20 px-6 bg-[#f8fafc]">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm mb-6">
        <Mail size={16} />
        Get in Touch
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight">
        We'd love to <br />
        <span className="text-orange-500">hear from you.</span>
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
        Have a question, feedback, or just want to say hello? Fill out the form below and we'll get back to you as soon as possible.
      </p>

    </section>
  );
};

export default ContactHero;