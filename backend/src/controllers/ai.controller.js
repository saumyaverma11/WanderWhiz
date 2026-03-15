// // src/controllers/ai.controller.js
// import Trip from "../models/Trip.model.js";
// import { generateAIItinerary } from "../services/ai.service.js";
// import { getWeatherForecast } from "../services/weather.service.js";
// import { getPlaceDetails } from "../services/maps.service.js";
// import { getNearbyPlaces } from "../services/nearby.service.js";



// export const generateTripItinerary = async (req, res) => {
//   try {
//     const { tripId } = req.params;

//     const trip = await Trip.findById(tripId);

//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     if (trip.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized access" });
//     }

//     // 🔥 WEATHER (Optional)
//     let weatherData = [];
//     try {
//       weatherData = await getWeatherForecast(trip.destination);
//     } catch (err) {
//       console.log("Weather failed, continuing...");
//     }

//     const tripWithWeather = {
//       ...trip.toObject(),
//       weather: weatherData,
//     };

//     // 🔥 AI GENERATION (Core)
//     const aiResponse = await generateAIItinerary(tripWithWeather);

//     const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error("Invalid JSON from AI");
//     }

//     const itineraryJSON = JSON.parse(jsonMatch[0]);

//     // 🔥 MAP ENRICHMENT (Optional)
//     try {
//       if (itineraryJSON.itinerary && Array.isArray(itineraryJSON.itinerary)) {

//         for (const day of itineraryJSON.itinerary) {

//           if (day.recommended_places && Array.isArray(day.recommended_places)) {

//             for (const place of day.recommended_places) {

//               const details = await getPlaceDetails(
//                 place.name,
//                 trip.destination
//               );

//               if (details) {
//                 place.location = details;
//               }
//             }
//           }
//         }
//       }
//     } catch (err) {
//       console.log("Map enrichment failed. Continuing without coordinates.");
//     }


//     // 🔥 NEARBY PLACES (Optional)
//     try {
//       if (itineraryJSON.itinerary && Array.isArray(itineraryJSON.itinerary)) {

//         for (const day of itineraryJSON.itinerary) {

//           if (day.recommended_places && day.recommended_places.length > 0) {

//             const firstPlace = day.recommended_places[0];

//             if (firstPlace.location) {

//               const { lat, lng } = firstPlace.location;

//               const nearbyRestaurants = await getNearbyPlaces(lat, lng, "restaurant");
//               const nearbyHotels = await getNearbyPlaces(lat, lng, "hotel");

//               day.nearby = {
//                 restaurants: nearbyRestaurants,
//                 hotels: nearbyHotels,
//               };
//             }
//           }
//         }
//       }
//     } catch (err) {
//       console.log("Nearby enrichment failed. Continuing...");
//     }

//     // 🔥 SAVE ALWAYS
//     trip.itinerary = itineraryJSON;
//     await trip.save();

//     res.status(200).json({
//       message: "Itinerary generated successfully",
//       weather: weatherData,
//       itinerary: itineraryJSON,
//     });

//   } catch (error) {
//     console.error("AI Controller Error:", error.message);

//     res.status(500).json({
//       message: "AI generation failed",
//       error: error.message,
//     });
//   }
// };





// src/controllers/ai.controller.js
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

    // 🌦 WEATHER (Optional)
    let weatherData = [];
    try {
      weatherData = await getWeatherForecast(trip.destination);
    } catch (err) {
      console.log("Weather failed, continuing...");
    }

    const tripWithWeather = {
      ...trip.toObject(),
      weather: weatherData,
    };

    // 🤖 AI GENERATION
    const aiResponse = await generateAIItinerary(tripWithWeather);

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON from AI");
    }

    const itineraryJSON = JSON.parse(jsonMatch[0]);

    // 🔥 Detect correct itinerary array
    const itineraryArray =
      itineraryJSON.itinerary ||
      itineraryJSON.travel_itinerary ||
      [];

    // 🗺 MAP ENRICHMENT + NEARBY (Optional)
    try {
      if (Array.isArray(itineraryArray)) {

        for (const day of itineraryArray) {

          // Collect recommended places from morning/afternoon/evening
          const allPlaces = [];

          if (day.morning?.recommended_places)
            allPlaces.push(...day.morning.recommended_places);

          if (day.afternoon?.recommended_places)
            allPlaces.push(...day.afternoon.recommended_places);

          if (day.evening?.recommended_places)
            allPlaces.push(...day.evening.recommended_places);

          for (const place of allPlaces) {

            // 📍 Add Coordinates
            const details = await getPlaceDetails(
              place.name,
              trip.destination
            );

            if (details) {
              place.location = details;

              // 🍽 Add Nearby Only If Location Exists
              const nearbyRestaurants = await getNearbyPlaces(details.lat, details.lng, "restaurant");
              const nearbyHotels = await getNearbyPlaces(details.lat, details.lng, "hotel");

              place.nearby = {
                restaurants: nearbyRestaurants,
                hotels: nearbyHotels,
              };
            }
          }
        }
      }
    } catch (err) {
      console.log("Map/Nearby enrichment failed.");
    }

    // 💾 SAVE
    trip.itinerary = itineraryJSON;
    await trip.save();

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