import { Sparkles, CloudSun, MapPin, Zap, Globe, Shield } from "lucide-react";

function Features() {
  return (
    <section className="py-20 bg-gray-50 px-6">

      {/* Top Text */}
      <div className="text-center max-w-3xl mx-auto">

        <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm">
          WHY WANDERWHIZ
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-900 leading-tight">
          Everything you need to <br /> travel smarter
        </h2>

        <p className="mt-4 text-gray-500 text-lg">
          No more hours of research. Our AI handles the planning so you can focus on the experience.
        </p>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-14">

        {/* CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <div className="bg-orange-100 p-3 w-fit rounded-xl mb-4">
            <Sparkles className="text-orange-500" />
          </div>

          <h3 className="font-semibold text-lg">AI Itinerary Generation</h3>

          <p className="text-gray-500 mt-2">
            Groq-powered LLM crafts a personalized day-by-day travel plan in seconds.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <div className="bg-blue-100 p-3 w-fit rounded-xl mb-4">
            <CloudSun className="text-blue-500" />
          </div>

          <h3 className="font-semibold text-lg">Live Weather</h3>

          <p className="text-gray-500 mt-2">
            Real-time weather data for your destination so you always pack right.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <div className="bg-green-100 p-3 w-fit rounded-xl mb-4">
            <MapPin className="text-green-500" />
          </div>

          <h3 className="font-semibold text-lg">Nearby Places</h3>

          <p className="text-gray-500 mt-2">
            Discover top attractions, restaurants, and hotels via OpenStreetMap.
          </p>
        </div>

        {/* ROW 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div className="bg-purple-100 p-3 w-fit rounded-xl mb-4">
            <Zap className="text-purple-500" />
          </div>

          <h3 className="font-semibold text-lg">Instant Planning</h3>
          <p className="text-gray-500 mt-2">
            From idea to full itinerary in under 10 seconds.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div className="bg-teal-100 p-3 w-fit rounded-xl mb-4">
            <Globe className="text-teal-500" />
          </div>

          <h3 className="font-semibold text-lg">Any Destination</h3>
          <p className="text-gray-500 mt-2">
            Works for any city or country in the world.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div className="bg-red-100 p-3 w-fit rounded-xl mb-4">
            <Shield className="text-red-500" />
          </div>

          <h3 className="font-semibold text-lg">Secure & Private</h3>
          <p className="text-gray-500 mt-2">
            JWT authentication keeps your trips safe.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;