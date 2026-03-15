// src/services/nearby.service.js
import axios from "axios";

export const getNearbyPlaces = async (lat, lng, type) => {
  try {
    const query = `
      [out:json];
      (
        node["amenity"="${type}"](around:1000,${lat},${lng});
      );
      out body 5;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );

    return response.data.elements.map((place) => ({
      name: place.tags.name || "Unnamed",
      lat: place.lat,
      lng: place.lon,
    }));

  } catch (error) {
    console.log("Nearby API failed:", error.message);
    return [];
  }
};