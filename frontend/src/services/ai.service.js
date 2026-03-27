import API from "./api";

// 🚀 FRONTEND → CALL BACKEND API
export const generateAITrip = async (tripId) => {
  try {
    const res = await API.get(`/ai/${tripId}`);
    return res.data;
  } catch (error) {
    console.error("AI Trip Error:", error);
    throw error;
  }
};