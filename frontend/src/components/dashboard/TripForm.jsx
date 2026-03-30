import { useState } from "react";
import { createTrip } from "../../services/trip.service";
import AIResult from "./AIResult";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";


import {
  FaPlane,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers
} from "react-icons/fa";


const TripForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    travelType: "solo",
    startDate: "",
    endDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ Step 1: Create Trip
      const trip = await createTrip(form);
      console.log("Trip created:", trip);

      // ✅ Step 2: CALL AI API (VERY IMPORTANT)
      await API.get(`/ai/${trip._id}`);

      console.log("AI generated");

      // ✅ Step 3: Redirect
      navigate(`/dashboard/trip/${trip._id}`);

    } catch (error) {
      console.error(error);
      alert("Error creating trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg border border-orange-200">

        {/* 🔥 TITLE */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          ✨ Plan a new trip
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

          {/* 📍 DESTINATION */}
          <div className="relative col-span-2">
            <FaMapMarkerAlt className="absolute top-4 left-3 text-gray-400" />

            <input
              type="text"
              placeholder="Where to? (e.g. Paris, Tokyo, Bali)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none transition"
              value={form.destination}
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
              required
            />
          </div>

          {/* 📅 START DATE */}
          <div className="relative">
            <FaCalendarAlt className="absolute top-4 left-3 text-gray-400" />

            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none transition"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              required
            />
          </div>

          {/* 📅 END DATE */}
          <div className="relative">
            <FaCalendarAlt className="absolute top-4 left-3 text-gray-400" />

            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none transition"
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
              required
            />
          </div>

          {/* 👥 TRAVEL TYPE */}
          <div className="relative col-span-2">
            <FaUsers className="absolute top-4 left-3 text-gray-400" />

            <select
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none transition"
              value={form.travelType}
              onChange={(e) =>
                setForm({ ...form, travelType: e.target.value })
              }
            >
              <option value="solo">Solo</option>
              <option value="family">Family</option>
              <option value="couple">Couple</option>
              <option value="friends">Friends</option>
            </select>
          </div>

          {/* 🚀 BUTTON */}
          <button
            className="col-span-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              "Generating..."
            ) : (
              <>
                <FaPlane />
                Generate Magic Itinerary ✨
              </>
            )}
          </button>

        </form>
      </div>

      <AIResult data={aiData} />
    </>
  );
};

export default TripForm;