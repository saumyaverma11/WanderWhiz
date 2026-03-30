import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaArrowLeft, FaDownload, FaShareAlt, FaMapMarkerAlt } from "react-icons/fa";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trip/${id}`);
      setTrip(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!trip) return <p className="p-6">Loading...</p>;

  const days = trip.itinerary || [];

  return (
    <div className="p-6">

      {/* 🔙 BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-500 mb-4"
      >
        <FaArrowLeft /> Back to Trips
      </button>

      {/* 🔥 HERO SECTION */}
      <div className="relative h-72 rounded-3xl overflow-hidden shadow-lg mb-8">

        <img
          src={`https://picsum.photos/seed/${trip.destination}/1200/600`}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">

          <div className="flex gap-3 mb-2">
            <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
              {trip.travelType}
            </span>

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {new Date(trip.startDate).toDateString()} –{" "}
              {new Date(trip.endDate).toDateString()}
            </span>
          </div>

          <h1 className="text-4xl font-bold">{trip.destination}</h1>

          <p className="flex items-center gap-2 mt-1 text-sm">
            <FaMapMarkerAlt /> {days.length} Days of Magic
          </p>

        </div>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT - TIMELINE */}
        <div className="lg:col-span-2 relative">

          <h2 className="text-2xl font-bold mb-6">📍 Your Itinerary</h2>

          {/* LINE */}
          <div className="absolute left-5 top-16 bottom-0 w-1 bg-gray-200"></div>

          {days.map((day, index) => (
            <div key={index} className="relative pl-16 mb-10">

              {/* DOT */}
              <div className="absolute left-0 top-5 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow">
                {day.day}
              </div>

              {/* CARD */}
              <div className="bg-white rounded-2xl p-6 shadow">

                <h3 className="text-xl font-bold text-orange-500 mb-4">
                  Day {day.day}
                </h3>

                <Section title="Morning" data={day.morning} />
                <Section title="Afternoon" data={day.afternoon} />
                <Section title="Evening" data={day.evening} />

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - WEATHER */}
        <div className="space-y-6">

          {/* WEATHER CARD */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow">
            <h3 className="font-bold mb-2">🌤 Current Weather</h3>

            <p className="text-3xl font-bold">
              {trip.itinerary?.[0]?.weather?.temperature || "--"}°C
            </p>

            <p className="text-gray-500">
              {trip.itinerary?.[0]?.weather?.condition || "Clear"}
            </p>

            <div className="flex justify-between mt-4 text-sm">
              <p>Humidity: {trip.itinerary?.[0]?.weather?.humidity || "--"}%</p>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-bold mb-2">📍 Location</h3>

            <iframe
              width="100%"
              height="200"
              src={`https://www.google.com/maps?q=${trip.destination}&output=embed`}
              className="rounded-xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data }) => {
  if (!data) return null;

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <p className="text-gray-500 text-sm">
        {typeof data === "string"
          ? data
          : data?.activity || "No data"}
      </p>
    </div>
  );
};

export default TripDetails;