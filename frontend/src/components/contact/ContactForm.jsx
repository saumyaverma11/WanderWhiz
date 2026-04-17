const ContactForm = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">

      <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
        Send a Message
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        We read every message and respond personally.
      </p>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="John Doe"
          className="border rounded-lg p-3 text-sm"
        />

        <input
          type="email"
          placeholder="you@example.com"
          className="border rounded-lg p-3 text-sm"
        />

      </div>

      <input
        type="text"
        placeholder="Select a topic..."
        className="border rounded-lg p-3 text-sm w-full mt-4"
      />

      <textarea
        placeholder="Tell us what's on your mind..."
        rows={5}
        className="border rounded-lg p-3 text-sm w-full mt-4"
      />

      <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-full shadow-md hover:scale-105 transition">
        Send Message
      </button>

    </div>
  );
};

export default ContactForm;