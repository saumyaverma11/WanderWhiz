import API from "./api";

// 👤 GET ALL USERS
export const getAllUsers = async () => {
  const res = await API.get("/admin/users"); // ✅ FIXED
  return res.data;
};

// 🗑 DELETE USER
export const deleteUser = async (id) => {
  const res = await API.delete(`/admin/users/${id}`); // ✅ FIXED
  return res.data;
};

// ✏️ UPDATE USER ROLE
export const updateUserRole = async (id, role) => {
  const res = await API.put(`/admin/users/${id}`, { role }); // ✅ FIXED
  return res.data;
};

// ✈️ GET ALL TRIPS
export const getAllTrips = async () => {
  const res = await API.get("/admin/trips"); // ✅ FIXED
  return res.data;
};

// 🗑 DELETE TRIP
export const deleteTrip = async (id) => {
  const res = await API.delete(`/admin/trips/${id}`); // ✅ FIXED
  return res.data;
};