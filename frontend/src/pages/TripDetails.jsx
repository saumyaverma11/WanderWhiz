// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../services/api";
// import { FaDownload, FaShareAlt } from "react-icons/fa";

// const TripDetails = () => {
//     const { id } = useParams();
//     const [trip, setTrip] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchTrip();
//     }, []);

//     const fetchTrip = async () => {
//         try {
//             const res = await API.get(`/trip/${id}`);
//             console.log("TRIP DATA:", res.data); // 🔥 debug
//             setTrip(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 📄 PDF DOWNLOAD
//     const downloadPDF = () => {
//         window.print();
//     };

//     // 🔗 SHARE
//     const shareTrip = () => {
//         navigator.clipboard.writeText(window.location.href);
//         alert("Link copied!");
//     };

//     if (loading) return <p className="p-6">Loading...</p>;
//     if (!trip) return <p className="p-6">Trip not found</p>;

//     // ✅ SAFE itinerary extraction
//     const itinerary = Array.isArray(trip?.itinerary)
//         ? trip.itinerary
//         : trip?.itinerary?.itinerary || [];

//     return (
//         <div className="p-6 max-w-5xl mx-auto">

//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">
//                     {trip.destination} Trip
//                 </h1>

//                 <div className="flex gap-3">
//                     <button
//                         onClick={downloadPDF}
//                         className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
//                     >
//                         <FaDownload /> PDF
//                     </button>

//                     <button
//                         onClick={shareTrip}
//                         className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
//                     >
//                         <FaShareAlt /> Share
//                     </button>
//                 </div>
//             </div>

//             {/* ITINERARY */}
//             {!Array.isArray(itinerary) || itinerary.length === 0 ? (
//                 <p>No itinerary found</p>
//             ) : (
//                 itinerary.map((day, index) => (
//                     <div key={index} className="bg-white p-5 rounded-xl shadow mb-6">

//                         <h2 className="text-xl font-bold mb-2">
//                             Day {day.day}
//                         </h2>

//                         <img
//                             src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//                             alt="trip"
//                             className="w-full h-48 object-cover rounded mb-4"
//                         />

//                         {/* ✅ CLEAN DISPLAY */}
//                         <p><b>Morning:</b> {day.morning}</p>
//                         <p><b>Afternoon:</b> {day.afternoon}</p>
//                         <p><b>Evening:</b> {day.evening}</p>

//                         {day.places?.map((place, i) => (
//                             <div key={i} className="mt-2 text-sm text-gray-600">
//                                 📍 {place.name}
//                             </div>
//                         ))}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// // ✅ HELPER FUNCTION (VERY IMPORTANT)
// const formatData = (data) => {
//     if (!data) return "No Data available";

//     if (typeof data === "string") return data;

//     if (Array.isArray(data)) return data.join(", ");

//     if (typeof data === "object") {
//         return data.title || data.description || "No data available";
//     }

//     return "No Data available";
// };

// export default TripDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const TripDetails = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trip/${id}`);
      setTrip(res.data);

      // 🔥 IF NO ITINERARY → GENERATE AI
      if (!res.data.itinerary || res.data.itinerary.length === 0) {
        generateAI();
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateAI = async () => {
    try {
      setAiLoading(true);

      const res = await API.get(`/ai/${id}`);

      // 🔥 UPDATE STATE
      setTrip((prev) => ({
        ...prev,
        itinerary: res.data.itinerary
      }));

    } catch (err) {
      console.error("AI ERROR:", err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">{trip.destination}</h1>

      {/* 🔥 MAP */}
      <div className="mt-6">
        <iframe
          width="100%"
          height="300"
          src={`https://www.google.com/maps?q=${trip.destination}&output=embed`}
        />
      </div>

      {/* 🔥 AI LOADING */}
      {aiLoading && (
        <p className="text-orange-500 mt-4">
          Generating AI itinerary...
        </p>
      )}

      {/* 🔥 ITINERARY */}
      {trip.itinerary?.map((day, index) => (
        <div key={index} className="mt-6 border p-4 rounded">

          <h2 className="font-bold">Day {day.day}</h2>

          <p><b>Morning:</b> {day.morning}</p>
          <p><b>Afternoon:</b> {day.afternoon}</p>
          <p><b>Evening:</b> {day.evening}</p>

          {day.places?.map((place, i) => (
            <div key={i} className="mt-2">
              📍 {place.name}
            </div>
          ))}

        </div>
      ))}

    </div>
  );
};

export default TripDetails;