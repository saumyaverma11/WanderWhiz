import API from "./api";

// 🚀 GENERATE AI TRIP
export const generateAITrip = async (tripId) => {
  try {
    const res = await API.get(`/api/ai/${tripId}`); // ✅ FIXED
    return res.data;
  } catch (error) {
    console.error("AI Trip Error:", error);
    throw error;
  }
};