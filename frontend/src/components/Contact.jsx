function Contact() {
  return (
    <section className="py-16 bg-gray-100">

      <h2 className="text-3xl font-bold text-center mb-8">
        Contact Us
      </h2>

      <form className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-xl shadow">

        <input type="text" placeholder="Name" className="w-full border p-3 rounded-lg" />
        <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
        <textarea placeholder="Message" className="w-full border p-3 rounded-lg" />

        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg w-full hover:bg-orange-600">
          Send Message
        </button>

      </form>

    </section>
  );
}

export default Contact;