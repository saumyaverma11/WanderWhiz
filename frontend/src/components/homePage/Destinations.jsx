import { useNavigate } from "react-router-dom";

export default function Destinations() {
  const navigate = useNavigate();

  const destinations = [
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tag: "Romance",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Adventure",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
    tag: "Culture",
  },
  {
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tag: "Relaxation",
  },
  {
    name: "New York",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=80",
    tag: "Urban",
  },
  {
    name: "Safari",
    country: "Kenya",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
    tag: "Wildlife",
  },
];

  const handlePlanTrip = () => {
    navigate("/login"); // simple redirect
  };

  return (
    <section className="py-16 px-8 bg-gray-50">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-4">
        Popular Destinations
      </h2>

      <p className="text-center text-gray-500 mb-10">
        From bustling cities to tropical escapes — WanderWhiz plans it all.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {destinations.map((place, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            {/* Image */}
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-[260px] object-cover transform group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>

            {/* Tag */}
            <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
              {place.tag}
            </span>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{place.name}</h3>
              <p className="text-sm opacity-80">{place.country}</p>
            </div>

            {/* Hover Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <button
                onClick={handlePlanTrip}
                className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full hover:bg-white/30"
              >
                Plan This Trip →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}