import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl font-bold text-gray-900">
        Ready to explore?
      </h2>

      <p className="text-gray-600 mt-2">
        Create your free account and plan your first AI-powered trip.
      </p>

      <Link
        to="/register"
        className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow hover:bg-orange-600 transition"
      >
        Get Started Free →
      </Link>
    </section>
  );
};

export default AboutCTA;