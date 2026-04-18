import API from "./api";

// ✅ CREATE TRIP
export const createTrip = async (data) => {
  const res = await API.post("/trip", data);
  return res.data;
};

// ✅ GET ALL USER TRIPS
export const getTrips = async () => {
  const res = await API.get("/trip");
  return res.data;
};

// ✅ DELETE TRIP
export const deleteTrip = async (id) => {
  const res = await API.delete(`/trip/${id}`);
  return res.data;
};