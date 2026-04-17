import { useNavigate } from "react-router-dom";

const GalleryCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f8fafc] px-6 md:px-16 py-24 text-center">

      <h2 className="text-3xl md:text-4xl font-semibold text-[#0f172a] mb-4">
        Inspired to travel?
      </h2>

      <p className="text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed mb-10">
        Let WanderWhiz plan your perfect trip to any of these destinations — in seconds.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
      >
        Plan My Trip
        <span className="text-lg">→</span>
      </button>

    </section>
  );
};

export default GalleryCTA;