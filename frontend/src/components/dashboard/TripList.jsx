// import { useEffect, useState } from "react";
// import { getTrips, deleteTrip } from "../../services/trip.service";
// import { useNavigate } from "react-router-dom";
// import { FaTrash, FaArrowRight } from "react-icons/fa";

// const TripList = ({ title = "✈️ Your Planned Journeys" }) => {
//   const [trips, setTrips] = useState([]);
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     destination: "",
//     travelType: ""
//   });
//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   const fetchTrips = async () => {
//     try {
//       const data = await getTrips();
//       setTrips(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id, e) => {
//     e.stopPropagation();

//     try {
//       await deleteTrip(id);

//       setTrips((prev) => prev.filter((trip) => trip._id !== id));
//     } catch (err) {
//       console.error("Delete failed");
//     }
//   };

//   const getDays = (start, end) => {
//     const s = new Date(start);
//     const e = new Date(end);
//     return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
//   };

//   const getImage = (destination) => {
//     return `https://picsum.photos/seed/${destination}/800/600`;
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//         {title}
//       </h2>
//       <div className="flex flex-col md:flex-row gap-3 mb-5">

//         <input
//           type="text"
//           placeholder="Search destination..."
//           value={filters.destination}
//           onChange={(e) =>
//             setFilters({ ...filters, destination: e.target.value })
//           }
//           className="border px-3 py-2 rounded-lg w-full md:w-1/3"
//         />

//         <select
//           value={filters.travelType}
//           onChange={(e) =>
//             setFilters({ ...filters, travelType: e.target.value })
//           }
//           className="border px-3 py-2 rounded-lg w-full md:w-1/4"
//         >
//           <option value="">All Types</option>
//           <option value="solo">Solo</option>
//           <option value="family">Family</option>
//           <option value="couple">Couple</option>
//           <option value="friends">Friends</option>
//         </select>

//       </div>

//       {trips.length === 0 ? (
//         <p>No trips yet</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {trips.map((trip) => (
//             <div
//               key={trip._id}
//               onClick={() => navigate(`/dashboard/trip/${trip._id}`)}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
//             >
//               {/* IMAGE */}
//               <div className="relative h-52">
//                 <img
//                   src={getImage(trip.destination)}
//                   className="w-full h-full object-cover"
//                 />

//                 {/* DELETE */}
//                 <button
//                   onClick={(e) => handleDelete(trip._id, e)}
//                   className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
//                 >
//                   🗑
//                 </button>

//                 {/* TITLE */}
//                 <div className="absolute bottom-3 left-4 text-white">
//                   <h3 className="text-xl font-bold drop-shadow-lg">
//                     {trip.destination}
//                   </h3>
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5">
//                 <p className="text-sm text-gray-500 mb-2">
//                   📅 {new Date(trip.startDate).toDateString()} –{" "}
//                   {new Date(trip.endDate).toDateString()}
//                 </p>

//                 {/* BADGES */}
//                 <div className="flex gap-2 mb-4">
//                   <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs capitalize">
//                     {trip.travelType}
//                   </span>

//                   <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
//                     {getDays(trip.startDate, trip.endDate)} Days
//                   </span>
//                 </div>

//                 {/* BUTTON */}
//                 <div className="border-t pt-4 flex justify-between items-center">
//                   <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition flex items-center gap-2">
//                     View Itinerary →
//                   </button>
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

const TripList = ({ title = "✈️ Your Planned Journeys" }) => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    destination: "",
    travelType: ""
  });

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

  // ✅ 🔥 STEP 4: FILTER LOGIC (IMPORTANT)
  const filteredTrips = trips.filter((trip) => {
    return (
      trip.destination.toLowerCase().includes(filters.destination.toLowerCase()) &&
      (filters.travelType ? trip.travelType === filters.travelType : true)
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {title}
      </h2>

      {/* 🔥 FILTER UI */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">

        <input
          type="text"
          placeholder="Search destination..."
          value={filters.destination}
          onChange={(e) =>
            setFilters({ ...filters, destination: e.target.value })
          }
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
        />

        <select
          value={filters.travelType}
          onChange={(e) =>
            setFilters({ ...filters, travelType: e.target.value })
          }
          className="border px-3 py-2 rounded-lg w-full md:w-1/4"
        >
          <option value="">All Types</option>
          <option value="solo">Solo</option>
          <option value="family">Family</option>
          <option value="couple">Couple</option>
          <option value="friends">Friends</option>
        </select>

        {/* 🔥 CLEAR BUTTON */}
        <button
          onClick={() =>
            setFilters({ destination: "", travelType: "" })
          }
          className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>

      </div>

      {/* ✅ IMPORTANT CHANGE HERE */}
      {filteredTrips.length === 0 ? (
        <p>No trips found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 🔥 STEP 5: USE filteredTrips */}
          {filteredTrips.map((trip) => (
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

                <div className="flex gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs capitalize">
                    {trip.travelType}
                  </span>

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    {getDays(trip.startDate, trip.endDate)} Days
                  </span>
                </div>

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