import axios from "axios";

// 📍 Get coordinates
export const getLocation = async (place, city) => {
  try {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${place} ${city}`,
          format: "json",
          limit: 1,
        },
      }
    );

    const data = res.data[0];

    return data
      ? {
          lat: data.lat,
          lng: data.lon,
        }
      : null;
  } catch (err) {
    console.error("Location error", err);
    return null;
  }
};

// 🍽 Get nearby places
export const getNearby = async (lat, lng, type) => {
  try {
    const query = `
      [out:json];
      (
        node["amenity"="${type}"](around:1000,${lat},${lng});
      );
      out;
    `;

    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query
    );

    return res.data.elements.slice(0, 5);
  } catch (err) {
    console.error("Nearby error", err);
    return [];
  }
};