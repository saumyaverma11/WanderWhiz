import { CheckCircle } from "lucide-react";

const features = [
  "Day-by-day AI itinerary with morning, afternoon & evening activities",
  "Real-time weather data for your destination",
  "Nearby attractions, restaurants, and hotels via OpenStreetMap",
  "Edit and regenerate trips any time",
  "Secure user profiles with travel preferences",
  "Admin panel for platform management",
  "Print/export itineraries as PDF",
  "Fully responsive — plan from any device",
];

const FeaturesGrid = () => {
  return (
    <section className="bg-[#f8fafc] px-6 md:px-16 py-20">

      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#0f172a] mb-12">
        Everything included — for free
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <CheckCircle className="text-orange-500 w-5 h-5" />

            <p className="text-gray-600 text-[15px] leading-relaxed">
              {item}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default FeaturesGrid;