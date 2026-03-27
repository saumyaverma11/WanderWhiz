import Trip from "../models/Trip.model.js";
import { generateAIItinerary } from "../services/ai.service.js";
import { getWeatherForecast } from "../services/weather.service.js";
import { getPlaceDetails } from "../services/maps.service.js";
import { getNearbyPlaces } from "../services/nearby.service.js";

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


    let itineraryJSON;

    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("No JSON found in AI response");
      }
      console.log("AI FULL RESPONSE:", itineraryJSON);

      itineraryJSON = JSON.parse(jsonMatch[0]);

    } catch (err) {
      console.log("❌ AI JSON PARSE FAILED");
      console.log("RAW AI RESPONSE:", aiResponse);

      return res.status(500).json({
        message: "AI returned invalid format. Try again.",
      });
    }


    // ================= 🔥 FIXED ARRAY DETECTION =================
    // const itineraryArray =
    //   itineraryJSON?.itinerary ||
    //   itineraryJSON?.day_wise_itinerary ||
    //   itineraryJSON?.trip?.itinerary ||
    //   [];

    let itineraryArray = [];

    if (Array.isArray(itineraryJSON.itinerary)) {
      itineraryArray = itineraryJSON.itinerary;

    } else if (Array.isArray(itineraryJSON.day_wise_itinerary)) {
      itineraryArray = itineraryJSON.day_wise_itinerary;

    } else if (Array.isArray(itineraryJSON.days)) {
      itineraryArray = itineraryJSON.days;

    } else if (itineraryJSON.trip?.itinerary) {
      itineraryArray = itineraryJSON.trip.itinerary;

    } else {
      console.log("❌ UNKNOWN AI FORMAT:", itineraryJSON);
    }


    console.log("✅ FINAL ARRAY LENGTH:", itineraryArray.length);

    // ================= MAP + NEARBY =================
    for (const day of itineraryArray) {

      let allPlaces = [];

      // ✅ recommended_places (MOST IMPORTANT)
      if (Array.isArray(day.recommended_places)) {
        allPlaces.push(...day.recommended_places);
      }

      // ✅ fallback for other formats
      if (Array.isArray(day.morning)) {
        day.morning.forEach(item => {
          if (item.places) allPlaces.push(...item.places);
        });
      }

      if (Array.isArray(day.afternoon)) {
        day.afternoon.forEach(item => {
          if (item.places) allPlaces.push(...item.places);
        });
      }

      if (Array.isArray(day.evening)) {
        day.evening.forEach(item => {
          if (item.places) allPlaces.push(...item.places);
        });
      }

      console.log("🔥 Extracted Places:", allPlaces);

      for (const place of allPlaces) {

        console.log("➡ Processing:", place.name);

        const details = await getPlaceDetails(
          place.name,
          trip.destination
        );

        if (details) {
          console.log("📍 Found Location:", details);

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
          console.log("❌ Location not found:", place.name);

          // ✅ fallback so UI doesn't break
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

    // ================= SAVE =================
    trip.itinerary = {
      ...itineraryJSON,
      weather: weatherData,
    };

    await trip.save();

    // ================= RESPONSE =================
    res.status(200).json({
      message: "Itinerary generated successfully",
      weather: weatherData,
      itinerary: itineraryJSON,
    });

  } catch (error) {
    console.error("AI Controller Error:", error.message);

    res.status(500).json({
      message: "AI generation failed",
      error: error.message,
    });
  }
};