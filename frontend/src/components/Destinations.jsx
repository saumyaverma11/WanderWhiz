function Destinations() {
  const places = [
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      name: "Tokyo",
      image:
        "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
    },
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
  ];

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Destinations
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {places.map((place, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <img
                src={place.image}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">

                <h3 className="text-lg font-semibold">
                  {place.name}
                </h3>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Destinations;