import { useEffect, useState } from "react";
import { getTrips } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Trips</h2>

      {trips.length === 0 ? (
        <p className="text-gray-500">No trips yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => navigate(`/dashboard/trip/${trip._id}`)}
              className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={`https://source.unsplash.com/400x300/?${trip.destination}`}
                alt="trip"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />

              <h3 className="font-bold text-lg">{trip.destination}</h3>

              <p className="text-sm text-gray-500 capitalize">
                {trip.travelType}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;