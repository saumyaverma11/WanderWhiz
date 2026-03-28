import Trip from "../models/Trip.model.js";
import { generateAIItinerary } from "../services/ai.service.js";
import { getWeatherForecast } from "../services/weather.service.js";
import { getPlaceDetails } from "../services/maps.service.js";
import { getNearbyPlaces } from "../services/nearby.service.js";

// ================= FORMAT FUNCTION =================
const formatSection = (section) => {
  if (!section) return "No data";

  if (typeof section === "string") return section;

  if (typeof section === "object") {
    return (
      section.activity ||
      section.morning_plans ||
      section.afternoon_plans ||
      section.evening_plans ||
      section.morning_activities ||
      section.afternoon_activities ||
      section.evening_activities ||
      "No data"
    );
  }

  return "No data";
};

// ================= NORMALIZE FUNCTION =================
const normalizeItinerary = (data) => {
  const days = data?.days || [];

  return days.map((day, index) => ({
    day: index + 1,
    date: day?.date || "",

    morning: formatSection(day?.morning),
    afternoon: formatSection(day?.afternoon),
    evening: formatSection(day?.evening),

    places: [
      ...(day?.morning?.recommended_places || []),
      ...(day?.afternoon?.recommended_places || []),
      ...(day?.evening?.recommended_places || [])
    ].map((p) => ({
      name: p.name,
      description: p.description,

      location: {
        lat: p.location?.lat || null,
        lng: p.location?.lng || null,
        address: p.location?.address || ""
      },

      nearby: {
        restaurants: p.nearby?.restaurants || [],
        hotels: p.nearby?.hotels || []
      }
    })),

    weather: day?.weather || null
  }));
};

// ================= MAIN CONTROLLER =================
export const generateTripItinerary = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // ================= WEATHER =================
    let weatherData = [];
    try {
      weatherData = await getWeatherForecast(trip.destination);
    } catch (err) {
      console.log("Weather failed");
    }

    const tripWithWeather = {
      ...trip.toObject(),
      weather: weatherData,
    };

    // ================= AI =================
    const aiResponse = await generateAIItinerary(tripWithWeather);

    console.log("AI FULL RESPONSE:", aiResponse);

    // ================= EXTRACT CORRECT DATA =================
    let itineraryArray = [];

    if (Array.isArray(aiResponse.day_wise_itinerary)) {
      itineraryArray = aiResponse.day_wise_itinerary;

    } else if (Array.isArray(aiResponse.days)) {
      itineraryArray = aiResponse.days;

    } else if (Array.isArray(aiResponse.day)) {
      itineraryArray = aiResponse.day;

    } else if (Array.isArray(aiResponse.itinerary)) {
      itineraryArray = aiResponse.itinerary;

    } else {
      console.log("❌ UNKNOWN AI FORMAT:", aiResponse);
    }

    console.log("✅ FINAL ARRAY LENGTH:", itineraryArray.length);

    // ================= MAP + NEARBY =================
    for (const day of itineraryArray) {

      let allPlaces = [
        ...(day?.morning?.recommended_places || []),
        ...(day?.afternoon?.recommended_places || []),
        ...(day?.evening?.recommended_places || [])
      ];

      console.log("🔥 Extracted Places:", allPlaces);

      for (const place of allPlaces) {

        const details = await getPlaceDetails(
          place.name,
          trip.destination
        );

        if (details) {
          place.location = details;

          const nearbyRestaurants = await getNearbyPlaces(
            details.lat,
            details.lng,
            "restaurant"
          );

          const nearbyHotels = await getNearbyPlaces(
            details.lat,
            details.lng,
            "hotel"
          );

          place.nearby = {
            restaurants: nearbyRestaurants,
            hotels: nearbyHotels,
          };

        } else {
          place.location = {
            lat: null,
            lng: null,
            address: "Not found",
          };

          place.nearby = {
            restaurants: [],
            hotels: [],
          };
        }
      }
    }

    // ================= NORMALIZE + SAVE =================
    const cleanItinerary = normalizeItinerary({
      days: itineraryArray   // ✅ MOST IMPORTANT FIX
    });

    trip.itinerary = cleanItinerary;

    await trip.save();

    // ================= RESPONSE =================
    res.status(200).json({
      message: "Itinerary generated successfully",
      weather: weatherData,
      itinerary: cleanItinerary,
    });

  } catch (error) {
    console.error("AI Controller Error:", error.message);

    res.status(500).json({
      message: "AI generation failed",
      error: error.message,
    });
  }
};