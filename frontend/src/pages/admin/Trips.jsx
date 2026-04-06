import { useEffect, useState } from "react";
import { getAllTrips, deleteTrip } from "../../services/admin.service";
import { FaMapMarkerAlt, FaTrash, FaEye } from "react-icons/fa";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null); // 🔥 modal

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const data = await getAllTrips();
    setTrips(data);
  };

  const handleDelete = async (id) => {
    await deleteTrip(id);
    fetchTrips();
  };

  console.log("Selected Trip:", selectedTrip);
  return (
    <div className="p-4 md:p-6">

      {/* 🔥 TITLE */}
      <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
        Trip Management
      </h1>
      <p className="text-sm text-gray-400 mb-5">
        {trips.length} trips across all users
      </p>

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Destination</th>
              <th className="px-5 py-3 text-left">User</th>
              <th className="px-5 py-3 text-left">Dates</th>
              <th className="px-5 py-3 text-left">Type</th>
              <th className="px-5 py-3 text-left">Created</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id} className="border-t hover:bg-gray-50 transition">

                {/* DESTINATION */}
                <td className="px-5 py-4 flex items-center gap-3">
                  <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
                    <FaMapMarkerAlt size={12} />
                  </div>
                  <span className="font-medium text-gray-700">
                    {trip.destination}
                  </span>
                </td>

                {/* USER */}
                <td className="px-5 py-4 text-gray-600">
                  {trip.user?.name}
                </td>

                {/* DATES */}
                <td className="px-5 py-4 text-gray-500 text-xs">
                  {trip.startDate?.slice(0, 10)} → {trip.endDate?.slice(0, 10)}
                </td>

                {/* TYPE */}
                <td className="px-5 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                    {trip.travelType}
                  </span>
                </td>

                {/* CREATED */}
                <td className="px-5 py-4 text-gray-400 text-xs">
                  {new Date(trip.createdAt).toDateString()}
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-4 text-right space-x-3">

                  {/* VIEW */}
                  <button
                    onClick={() => setSelectedTrip(trip)}
                    className="text-blue-500 hover:text-blue-600 text-sm inline-flex items-center gap-1"
                  >
                    <FaEye size={12} /> View
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="text-red-500 hover:text-red-600 text-sm inline-flex items-center gap-1"
                  >
                    <FaTrash size={12} /> Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>




      </div>

      {/* 🔥 MODAL */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[95%] md:w-[70%] max-h-[80vh] rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 tracking-wide">
                {selectedTrip.destination} Itinerary
              </h2>

              <button
                onClick={() => setSelectedTrip(null)}
                className="text-gray-400 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[70vh]">

              <p className="text-xs md:text-sm text-gray-400 mb-1">
                by {selectedTrip.user?.name}
              </p>

              <p className="text-xs md:text-sm text-gray-400 mb-4">
                {selectedTrip.startDate?.slice(0, 10)} → {selectedTrip.endDate?.slice(0, 10)}
              </p>

              {/* 🔥 ITINERARY */}
              <div className="space-y-4">

                {selectedTrip.itinerary && selectedTrip.itinerary.length > 0 ? (
                  selectedTrip.itinerary.map((day, index) => (

                    <div key={index} className="border rounded-xl p-4 bg-gray-50">

                      <h3 className="text-sm font-semibold text-orange-500 tracking-wide mb-2">
                        Day {day.day} ({day.date})
                      </h3>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        🌅 <b>Morning:</b> {day.morning}
                      </p>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        ☀️ <b>Afternoon:</b> {day.afternoon}
                      </p>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        🌙 <b>Evening:</b> {day.evening}
                      </p>

                      {/* Places */}
                      {day.places?.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">Places:</p>

                          {day.places.map((place, i) => (
                            <div key={i} className="text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm mb-1">
                              <b>{place.name}</b> — {place.description}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Weather */}
                      {day.weather && (
                        <p className="text-xs text-gray-400 mt-2">
                          🌤 {day.weather.temperature}°C | {day.weather.condition}
                        </p>
                      )}

                    </div>

                  ))
                ) : (
                  <p className="text-gray-400 text-center">
                    No itinerary available
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Trips;