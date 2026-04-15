import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Solo Traveler",
    location: "Tokyo",
    text: "WanderWhiz planned my entire 10-day trip in minutes. The itinerary was perfect — I didn’t change anything.",
  },
  {
    name: "Rahul Verma",
    role: "Backpacker",
    location: "Bali",
    text: "Super easy to use. Weather updates and nearby places helped me explore better without wasting time.",
  },
  {
    name: "Ananya Gupta",
    role: "Couple Travel",
    location: "Paris",
    text: "Loved the UI and recommendations. It felt like a personal travel assistant guiding us.",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 text-center">

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4">
        What Our Users Say
      </h2>

      <p className="text-gray-500 mb-12">
        Real experiences from travelers using WanderWhiz
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 px-8">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >

            {/* Stars ⭐ */}
            <div className="flex justify-center text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-600 mb-6 italic">
              "{item.text}"
            </p>

            {/* User Info */}
            <h4 className="font-semibold text-lg">
              {item.name}
            </h4>

            <p className="text-sm text-gray-500">
              {item.role} • {item.location}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Testimonials;