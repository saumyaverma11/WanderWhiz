// src/services/maps.service.js
import axios from "axios";

export const getPlaceDetails = async (placeName, city) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${placeName} ${city}`,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "wanderwhiz-app", // required by Nominatim
        },
      }
    );

    const place = response.data[0];

    if (!place) return null;

    return {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      address: place.display_name,
    };

  } catch (error) {
    console.log("OSM API Error:", error.message);
    return null;
  }
};