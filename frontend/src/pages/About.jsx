
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="py-16 px-6 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10">
          About WanderWhiz
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            className="rounded-2xl shadow"
          />

          <div>
            <p className="text-gray-600 mb-4">
              WanderWhiz is an AI-powered travel planner designed to simplify trip planning.
            </p>

            <ul className="space-y-2 text-gray-600">
              <li>✔ AI Itinerary</li>
              <li>✔ Weather Insights</li>
              <li>✔ Map Integration</li>
            </ul>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;