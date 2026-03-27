import {
  FaSun,
  FaCloudSun,
  FaMoon,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getLocation, getNearby } from "../../services/location.service";

const AIResult = ({ data }) => {
  const [extraData, setExtraData] = useState({});

  // ✅ SAFE NORMALIZATION FUNCTION
  const normalizeItinerary = (data) => {
    const raw = data?.itinerary;

    if (Array.isArray(raw)) return raw;

    if (Array.isArray(raw?.itinerary)) return raw.itinerary;

    if (Array.isArray(raw?.day_wise_itinerary))
      return raw.day_wise_itinerary;

    if (Array.isArray(data?.day_wise_itinerary))
      return data.day_wise_itinerary;

    return [];
  };

  const itinerary = normalizeItinerary(data);

  console.log("FINAL ITINERARY:", itinerary);

  // 🔥 FETCH LOCATION + NEARBY
  useEffect(() => {
    if (!Array.isArray(itinerary) || itinerary.length === 0) return;

    const fetchExtra = async () => {
      let temp = {};

      for (let day of itinerary) {
        const places = [
          ...(day.morning?.recommended_places || []),
          ...(day.afternoon?.recommended_places || []),
          ...(day.evening?.recommended_places || []),
          ...(day.recommended_places || []), // fallback
        ];

        for (let place of places) {
          if (!temp[place.name]) {
            try {
              const loc = await getLocation(place.name, "India");

              if (loc) {
                const restaurants = await getNearby(
                  loc.lat,
                  loc.lng,
                  "restaurant"
                );
                const hotels = await getNearby(
                  loc.lat,
                  loc.lng,
                  "hotel"
                );

                temp[place.name] = {
                  location: loc,
                  restaurants,
                  hotels,
                };
              }
            } catch (err) {
              console.log("Location fetch failed:", place.name);
            }
          }
        }
      }

      setExtraData(temp);
    };

    fetchExtra();
  }, [data]);

  // ❌ NO DATA
  if (!data) return null;

  // ❌ EMPTY ITINERARY
  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No itinerary generated yet 🚫
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {itinerary.map((day, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          {/* 🔥 HEADER */}
          <div className="p-5 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Day {day.day || index + 1}
            </h2>

            {data.weather && data.weather[index] && (
              <div className="text-sm bg-blue-100 px-3 py-1 rounded-full">
                🌤 {data.weather[index].condition} •{" "}
                {data.weather[index].temperature}°C
              </div>
            )}
          </div>

          {/* 🖼 DYNAMIC IMAGE */}
          <img
            src={
              day.recommended_places?.[0]?.name
                ? `https://source.unsplash.com/featured/1200x400/?${day.recommended_places[0].name}`
                : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            }
            alt="travel"
            className="w-full h-56 object-cover"
          />

          <div className="p-6 space-y-6">
            <Section
              title="Morning"
              icon={<FaSun />}
              color="text-orange-500"
              places={day.morning?.recommended_places}
              extraData={extraData}
            />

            <Section
              title="Afternoon"
              icon={<FaCloudSun />}
              color="text-blue-500"
              places={day.afternoon?.recommended_places}
              extraData={extraData}
            />

            <Section
              title="Evening"
              icon={<FaMoon />}
              color="text-purple-500"
              places={day.evening?.recommended_places}
              extraData={extraData}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// 🔥 REUSABLE SECTION
const Section = ({ title, icon, color, places = [], extraData }) => {
  if (!places || places.length === 0) return null;

  return (
    <div>
      <h3 className={`font-semibold flex items-center gap-2 ${color}`}>
        {icon} {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mt-3">
        {places.map((place, i) => {
          const extra = extraData[place.name];

          return (
            <div
              key={i}
              className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition"
            >
              <h4 className="font-bold text-gray-800">
                {place.name}
              </h4>

              <p className="text-sm text-gray-500 mb-2">
                {place.description}
              </p>

              {/* 📍 LOCATION */}
              {extra?.location && (
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {extra.location.address}
                </div>
              )}

              {/* 🍽 NEARBY */}
              {extra && (
                <div className="text-xs mt-2 text-gray-500">
                  🍽 {extra.restaurants?.length || 0} Restaurants • 🏨{" "}
                  {extra.hotels?.length || 0} Hotels
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIResult;