function Contact() {
  return (
    <section className="py-16 bg-gray-100">

      <h2 className="text-3xl font-bold text-center mb-8">
        Contact Us
      </h2>

      <form className="max-w-xl mx-auto space-y-4">

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Message"
          className="w-full border p-3 rounded"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Send Message
        </button>

      </form>

    </section>
  );
}

export default Contact;