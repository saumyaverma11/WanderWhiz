import { CheckCircle } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="px-6 md:px-16 py-20 bg-[#f8fafc]">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
            alt="travel"
            className="rounded-3xl w-full h-[320px] md:h-[420px] object-cover shadow-md"
          />

          {/* FLOATING CARD */}
          <div className="absolute bottom-[-20px] right-6 bg-white rounded-2xl shadow-xl px-6 py-4">
            <h3 className="text-orange-500 font-bold text-2xl">10K+</h3>
            <p className="text-gray-500 text-sm">
              Trips planned with AI
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>

          {/* HEADING */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6">
            Our Mission
          </h2>

          {/* PARAGRAPH */}
          <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
            We believe everyone deserves a well-planned trip — not just those with a
            travel agent or 10 free hours. WanderWhiz uses the latest AI to
            democratize travel planning, giving you a personalized itinerary in seconds.
          </p>

          <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
            From the narrow lanes of Paris to the rice terraces of Bali, our AI has
            planned thousands of adventures. Every itinerary is unique, contextual,
            and genuinely useful.
          </p>

          {/* LIST */}
          <div className="space-y-4 mt-6">

            {[
              "Day-by-day AI itinerary with morning, afternoon & evening activities",
              "Real-time weather data for your destination",
              "Nearby attractions, restaurants, and hotels via OpenStreetMap",
              "Edit and regenerate trips any time",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-orange-500 w-5 h-5 mt-1" />
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionSection;