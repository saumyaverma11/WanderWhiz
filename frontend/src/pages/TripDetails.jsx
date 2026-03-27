// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../services/api";
// import { FaDownload, FaShareAlt } from "react-icons/fa";

// const TripDetails = () => {
//     const { id } = useParams();
//     const [trip, setTrip] = useState(null);

//     useEffect(() => {
//         fetchTrip();
//     }, []);

//     const fetchTrip = async () => {
//         try {
//             const res = await API.get(`/trip/${id}`);
//             setTrip(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     // 📄 PDF DOWNLOAD
//     const downloadPDF = () => {
//         window.print(); // simple version (we upgrade later)
//     };

//     // 🔗 SHARE
//     const shareTrip = () => {
//         navigator.clipboard.writeText(window.location.href);
//         alert("Link copied!");
//     };

//     if (!trip) return <p className="p-6">Loading...</p>;

//     const itinerary =
//         (trip?.itinerary?.itinerary) ||
//         (trip?.itinerary?.day_wise_itinerary) ||
//         (trip?.itinerary?.days) ||
//         [];

//     return (
//         <div className="p-6">

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
//             {itinerary.length === 0 ? (
//                 <p>No itinerary found</p>
//             ) : (
//                 itinerary.map((day, index) => (
//                     <div
//                         key={index}
//                         className="bg-white p-5 rounded-xl shadow mb-6"
//                     >
//                         <h2 className="text-xl font-bold mb-2">
//                             Day {day.day}
//                         </h2>

//                         <img
//                             src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//                             className="w-full h-48 object-cover rounded mb-4"
//                         />

//                         <p><b>Morning:</b> {JSON.stringify(day.morning)}</p>
//                         <p><b>Afternoon:</b> {JSON.stringify(day.afternoon)}</p>
//                         <p><b>Evening:</b> {JSON.stringify(day.evening)}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default TripDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { FaDownload, FaShareAlt } from "react-icons/fa";

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrip();
    }, []);

    const fetchTrip = async () => {
        try {
            const res = await API.get(`/trip/${id}`);
            console.log("TRIP DATA:", res.data); // 🔥 debug
            setTrip(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 📄 PDF DOWNLOAD
    const downloadPDF = () => {
        window.print();
    };

    // 🔗 SHARE
    const shareTrip = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (!trip) return <p className="p-6">Trip not found</p>;

    // ✅ SAFE itinerary extraction
    const itinerary =
        trip?.itinerary?.itinerary ||
        trip?.itinerary?.day_wise_itinerary ||
        trip?.itinerary?.days ||
        trip?.itinerary ||
        [];

    return (
        <div className="p-6 max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    {trip.destination} Trip
                </h1>

                <div className="flex gap-3">
                    <button
                        onClick={downloadPDF}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaDownload /> PDF
                    </button>

                    <button
                        onClick={shareTrip}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaShareAlt /> Share
                    </button>
                </div>
            </div>

            {/* ITINERARY */}
            {!Array.isArray(itinerary) || itinerary.length === 0 ? (
                <p>No itinerary found</p>
            ) : (
                itinerary.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow mb-6"
                    >
                        <h2 className="text-xl font-bold mb-2">
                            Day {day?.day || index + 1}
                        </h2>

                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            alt="trip"
                            className="w-full h-48 object-cover rounded mb-4"
                        />

                        {/* ✅ CLEAN DISPLAY */}
                        <p>
                            <b>Morning:</b>{" "}
                            {formatData(day?.morning)}
                        </p>

                        <p>
                            <b>Afternoon:</b>{" "}
                            {formatData(day?.afternoon)}
                        </p>

                        <p>
                            <b>Evening:</b>{" "}
                            {formatData(day?.evening)}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

// ✅ HELPER FUNCTION (VERY IMPORTANT)
const formatData = (data) => {
    if (!data) return "Not available";

    if (typeof data === "string") return data;

    if (Array.isArray(data)) return data.join(", ");

    if (typeof data === "object") {
        return `${data.title || ""} ${data.description || ""}`;
    }

    return "Not available";
};

export default TripDetails;