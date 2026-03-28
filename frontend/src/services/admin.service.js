import API from "./api";

// 👤 GET ALL USERS
export const getAllUsers = async () => {
  const res = await API.get("/admin/users");
  return res.data;
};

// 🗑 DELETE USER
export const deleteUser = async (id) => {
  const res = await API.delete(`/admin/users/${id}`);
  return res.data;
};

// ✏️ UPDATE USER ROLE
export const updateUserRole = async (id, role) => {
  const res = await API.put(`/admin/users/${id}`, { role });
  return res.data;
};

// ✈️ GET ALL TRIPS
export const getAllTrips = async () => {
  const res = await API.get("/admin/trips");
  return res.data;
};

// 🗑 DELETE TRIP
export const deleteTrip = async (id) => {
  const res = await API.delete(`/admin/trips/${id}`);
  return res.data;
};