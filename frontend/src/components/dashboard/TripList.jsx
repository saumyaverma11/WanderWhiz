// // import { useEffect, useState } from "react";
// // import { getTrips } from "../../services/trip.service";

// // function TripList() {
// //   const [trips, setTrips] = useState([]);

// //   useEffect(() => {
// //     fetchTrips();
// //   }, []);

// //   const fetchTrips = async () => {
// //     try {
// //       const data = await getTrips();
// //       setTrips(data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow">

// //       <h3 className="text-lg font-semibold mb-4">My Trips</h3>

// //       {trips.length === 0 ? (
// //         <p className="text-gray-500">No trips yet</p>
// //       ) : (
// //         trips.map((trip) => (
// //           <div
// //             key={trip._id}
// //             className="border p-3 rounded mb-3"
// //           >
// //             <h4 className="font-bold">{trip.destination}</h4>
// //             <p className="text-gray-600">
// //               {trip.days} days • ₹{trip.budget}
// //             </p>
// //           </div>
// //         ))
// //       )}

// //     </div>
// //   );
// // }

// // export default TripList;

// const TripList = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">My Trips</h2>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="p-4 bg-gray-100 rounded-lg shadow">
//           <h3 className="font-bold">Goa Trip</h3>
//           <p>3 Days • ₹5000</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TripList;



import { useEffect, useState } from "react";
import { getTrips } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";





const TripList = () => {
  const [trips, setTrips] = useState([]);

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

  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Trips</h2>

      {trips.length === 0 ? (
        <p className="text-gray-500">No trips yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              onClick={() => navigate(`/dashboard/trip/${trip._id}`)}
              className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >

              {/* 🖼 Image */}
              <img
                src={`https://source.unsplash.com/400x300/?${trip.destination}`}
                alt="trip"
                className="w-full h-40 object-cover rounded-lg mb-2"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
                }}
              />
              <p className="text-xs text-gray-400 mb-1">
                Image may vary based on location
              </p>

              {/* 📍 Content */}
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