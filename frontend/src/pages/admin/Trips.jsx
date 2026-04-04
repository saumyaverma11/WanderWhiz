import { useEffect, useState } from "react";
import { getAllTrips, deleteTrip } from "../../services/admin.service";

const Trips = () => {
  const [trips, setTrips] = useState([]);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trip Management</h1>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Destination</th>
              <th>User</th>
              <th>Dates</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {trips.map(trip => (
              <tr key={trip._id} className="border-t">

                <td className="p-3">{trip.destination}</td>
                <td>{trip.user?.name}</td>
                <td>{trip.startDate} → {trip.endDate}</td>

                <td>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button className="text-blue-500">
                    View Itinerary
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Trips;