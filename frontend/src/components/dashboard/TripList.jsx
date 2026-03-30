// // import { useEffect, useState } from "react";
// // import { getTrips } from "../../services/trip.service";
// // import { useNavigate } from "react-router-dom";

// // const TripList = () => {
// //   const [trips, setTrips] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchTrips();
// //   }, []);

// //   const fetchTrips = async () => {
// //     try {
// //       const data = await getTrips();
// //       setTrips(data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-xl font-semibold mb-4">My Trips</h2>

// //       {trips.length === 0 ? (
// //         <p className="text-gray-500">No trips yet</p>
// //       ) : (
// //         <div className="grid md:grid-cols-3 gap-4">
// //           {trips.map((trip) => (
// //             <div
// //               key={trip._id}
// //               onClick={() => navigate(`/dashboard/trip/${trip._id}`)}
// //               className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
// //             >
// //               <img
// //                 src={`https://source.unsplash.com/400x300/?${trip.destination}`}
// //                 alt="trip"
// //                 className="w-full h-40 object-cover rounded-lg mb-2"
// //               />

// //               <h3 className="font-bold text-lg">{trip.destination}</h3>

// //               <p className="text-sm text-gray-500 capitalize">
// //                 {trip.travelType}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default TripList;



// import { useEffect, useState } from "react";
// import { getTrips, deleteTrip } from "../../services/trip.service";
// import { useNavigate } from "react-router-dom";
// import { FaTrash, FaArrowRight } from "react-icons/fa";
// import axios from "axios";

// const UNSPLASH_KEY = "YOUR_UNSPLASH_ACCESS_KEY"; // 🔥 put your key here

// const TripList = () => {
//   const [trips, setTrips] = useState([]);
//   const [images, setImages] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   const fetchTrips = async () => {
//     try {
//       const data = await getTrips();
//       setTrips(data);

//       // 🔥 Fetch images for each trip
//       data.forEach((trip) => fetchImage(trip.destination));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 UNSPLASH IMAGE FETCH
//   const fetchImage = async (query) => {
//     if (images[query]) return;

//     try {
//       const res = await axios.get(
//         `https://api.unsplash.com/search/photos`,
//         {
//           params: { query, per_page: 1 },
//           headers: {
//             Authorization: `Client-ID ${UNSPLASH_KEY}`,
//           },
//         }
//       );

//       const url =
//         res.data.results[0]?.urls?.regular ||
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

//       setImages((prev) => ({ ...prev, [query]: url }));
//     } catch (err) {
//       console.log("Image fetch failed");
//     }
//   };

//   // 🔥 DELETE TRIP
//   const handleDelete = async (id, e) => {
//     e.stopPropagation();

//     try {
//       await deleteTrip(id);

//       // remove from UI
//       setTrips((prev) => prev.filter((trip) => trip._id !== id));
//     } catch (err) {
//       console.error("Delete failed");
//     }
//   };

//   // 🔥 DAYS CALCULATION
//   const getDays = (start, end) => {
//     const s = new Date(start);
//     const e = new Date(end);
//     return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//         ✈️ Your Planned Journeys
//       </h2>

//       {trips.length === 0 ? (
//         <p className="text-gray-500">No trips yet</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {trips.map((trip) => (
//             <div
//               key={trip._id}
//               onClick={() => navigate(`/dashboard/trip/${trip._id}`)}
//               className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow hover:shadow-2xl transition duration-300 group"
//             >
//               {/* IMAGE */}
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={
//                     images[trip.destination] ||
//                     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//                   }
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />

//                 {/* DELETE BUTTON */}
//                 <button
//                   onClick={(e) => handleDelete(trip._id, e)}
//                   className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
//                 >
//                   <FaTrash size={14} />
//                 </button>

//                 {/* TITLE OVERLAY */}
//                 <div className="absolute bottom-3 left-4 text-white">
//                   <h3 className="text-xl font-bold">
//                     {trip.destination}
//                   </h3>
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-4 space-y-3">
//                 {/* DATE */}
//                 <p className="text-sm text-gray-500">
//                   📅{" "}
//                   {new Date(trip.startDate).toDateString()} –{" "}
//                   {new Date(trip.endDate).toDateString()}
//                 </p>

//                 {/* BADGES */}
//                 <div className="flex gap-2">
//                   <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
//                     {trip.travelType}
//                   </span>

//                   <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
//                     {getDays(trip.startDate, trip.endDate)} Days
//                   </span>
//                 </div>

//                 {/* BUTTON */}
//                 <div className="flex justify-between items-center pt-3">
//                   <span className="text-orange-500 font-medium flex items-center gap-2">
//                     View Itinerary <FaArrowRight />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TripList;




import { useEffect, useState } from "react";
import { getTrips, deleteTrip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowRight } from "react-icons/fa";

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

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    try {
      await deleteTrip(id);

      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const getDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  };

  const getImage = (destination) => {
    return `https://picsum.photos/seed/${destination}/800/600`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        ✈️ Your Planned Journeys
      </h2>

      {trips.length === 0 ? (
        <p>No trips yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => navigate(`/dashboard/trip/${trip._id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-52">
                <img
                  src={getImage(trip.destination)}
                  className="w-full h-full object-cover"
                />

                {/* DELETE */}
                <button
                  onClick={(e) => handleDelete(trip._id, e)}
                  className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                >
                  🗑
                </button>

                {/* TITLE */}
                <div className="absolute bottom-3 left-4 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">
                    {trip.destination}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">
                  📅 {new Date(trip.startDate).toDateString()} –{" "}
                  {new Date(trip.endDate).toDateString()}
                </p>

                {/* BADGES */}
                <div className="flex gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs capitalize">
                    {trip.travelType}
                  </span>

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    {getDays(trip.startDate, trip.endDate)} Days
                  </span>
                </div>

                {/* BUTTON */}
                <div className="border-t pt-4 flex justify-between items-center">
                  <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition flex items-center gap-2">
                    View Itinerary →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;