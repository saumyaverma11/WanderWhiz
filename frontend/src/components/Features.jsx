function Features() {
  const features = [
    {
      title: "AI Travel Planning",
      desc: "Generate smart itineraries instantly with AI assistance.",
    },
    {
      title: "Weather Insights",
      desc: "Check real-time weather for every destination.",
    },
    {
      title: "Location Explorer",
      desc: "Discover nearby attractions, hotels and restaurants.",
    },
    {
      title: "Trip Dashboard",
      desc: "Save and manage all your trips in one place.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose WanderWhiz
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;