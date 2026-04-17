import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="h-screen relative">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        alt="travel"
        className="absolute w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

        <p className="bg-white/20 px-4 py-1 rounded-full mb-4">
          ✨ AI-Powered Travel Planning
        </p>

        <h1 className="text-4xl md:text-6xl font-bold">
          Plan Your Dream Trip
        </h1>

        <h2 className="text-orange-500 text-4xl md:text-6xl font-bold mt-2">
          In Seconds.
        </h2>

        <p className="mt-4 max-w-xl text-gray-200">
          WanderWhiz uses AI to generate itineraries, weather insights,
          and curated travel experiences instantly.
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 px-6 py-3 rounded-full hover:bg-orange-600 transition"
          >
            Start Planning Free →
          </button>

          {/* About */}
          <button
            onClick={() => navigate("/about")}
            className="border px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            ▶ See How It Works
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;