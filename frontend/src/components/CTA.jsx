function CTA() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center text-center">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
        alt="travel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-orange-500/85"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6">
        <h2 className="text-4xl font-bold mb-4">
          Ready to start your adventure?
        </h2>

        <p className="mb-6 text-lg">
          Join thousands of travelers planning smarter with WanderWhiz.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold"
          >
            Create Free Account →
          </a>

          <a
            href="/faq"
            className="border border-white px-6 py-3 rounded-full"
          >
            Learn More
          </a>
        </div>
      </div>

    </section>
  );
}

export default CTA;