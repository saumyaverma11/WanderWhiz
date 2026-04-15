
import Trip from "../models/Trip.model.js";
import { generateAIItinerary } from "../services/ai.service.js";
import { getWeatherForecast } from "../services/weather.service.js";
import { getPlaceDetails } from "../services/maps.service.js";
import { getNearbyPlaces } from "../services/nearby.service.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* ================= FORMAT FUNCTION (FIXED) ================= */
const formatSection = (section) => {
  if (!section) {
    return { activity: "No data", places: [] };
  }

  // ✅ If AI sends object
  if (typeof section === "object") {
    return {
      activity: section.activity || "No data",
      places: section.recommended_places || [],
    };
  }

  // ✅ If AI sends string
  if (typeof section === "string") {
    return {
      activity: section,
      places: [],
    };
  }

  return { activity: "No data", places: [] };
};

/* ================= NORMALIZE FUNCTION (FIXED) ================= */
const normalizeItinerary = (data) => {
  const days = data?.days || [];

  return days.map((day, index) => {
    const morning = formatSection(day?.morning);
    const afternoon = formatSection(day?.afternoon);
    const evening = formatSection(day?.evening);

    return {
      day: index + 1,
      date: day?.date || "",

      // ✅ ALWAYS STRING NOW (NO BUG)
      morning: morning.activity,
      afternoon: afternoon.activity,
      evening: evening.activity,

      // ✅ COMBINED PLACES
      places: [
        ...morning.places,
        ...afternoon.places,
        ...evening.places,
      ].map((p) => ({
        name: p.name,
        description: p.description,
        location: {
          lat: p.location?.lat || null,
          lng: p.location?.lng || null,
          address: p.location?.address || "",
        },
        nearby: {
          restaurants: p.nearby?.restaurants || [],
          hotels: p.nearby?.hotels || [],
        },
      })),

      weather: day?.weather || null,
    };
  });
};

/* ================= MAIN CONTROLLER ================= */
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

    /* ================= WEATHER ================= */
    let weatherData = [];
    try {
      weatherData = await getWeatherForecast(trip.destination);
    } catch {
      console.log("Weather failed");
    }

    const tripWithWeather = {
      ...trip.toObject(),
      weather: weatherData,
    };

    /* ================= AI ================= */
    const aiResponse = await generateAIItinerary(tripWithWeather);

    console.log("🔥 FINAL AI RESPONSE:", JSON.stringify(aiResponse, null, 2));

    /* ================= EXTRACT ARRAY ================= */
    let itineraryArray = [];

    if (Array.isArray(aiResponse?.days)) {
      itineraryArray = aiResponse.days;
    } else if (Array.isArray(aiResponse?.itinerary)) {
      itineraryArray = aiResponse.itinerary;
    } else {
      console.log("❌ Unknown AI format");
    }

    /* ================= MAP + NEARBY ================= */
    for (const day of itineraryArray) {
      const MAX_PLACES = 3;

      let allPlaces = [
        ...(day?.morning?.recommended_places || []),
        ...(day?.afternoon?.recommended_places || []),
        ...(day?.evening?.recommended_places || []),
      ].slice(0, MAX_PLACES);

      await Promise.all(
        allPlaces.map(async (place) => {
          try {
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

              place.nearby = {
                restaurants: nearbyRestaurants,
                hotels: [],
              };
            } else {
              place.location = { lat: null, lng: null };
              place.nearby = { restaurants: [], hotels: [] };
            }

            await delay(300); // ✅ rate limit fix
          } catch {
            console.log("⚠️ Skipping place:", place.name);
          }
        })
      );
    }

    /* ================= NORMALIZE ================= */
    const cleanItinerary = normalizeItinerary({
      days: itineraryArray,
    });

    /* ================= SAVE ================= */
    trip.itinerary = cleanItinerary;
    await trip.save();
    console.log("Trip is ", trip);

    /* ================= RESPONSE ================= */
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