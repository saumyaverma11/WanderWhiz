import API from "./api";

// ✅ CREATE TRIP
export const createTrip = async (data) => {
  const res = await API.post("/api/trip", data);
  return res.data;
};

// ✅ GET ALL USER TRIPS
export const getTrips = async () => {
  const res = await API.get("/api/trip");
  return res.data;
};

// ✅ DELETE TRIP
export const deleteTrip = async (id) => {
  const res = await API.delete(`/api/trip/${id}`);
  return res.data;
};