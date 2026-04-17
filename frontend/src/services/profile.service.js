import API from "./api";

export const getProfile = async () => {
  const res = await API.get("/api/auth/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/api/auth/profile", data);
  return res.data;
};

export const updatePreferences = async (data) => {
  const res = await API.put("/api/auth/preferences", data);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await API.delete("/api/auth/delete-account");
  return res.data;
};

export const uploadImage = async (formData) => {
  const res = await API.post("/api/auth/upload-image", formData);
  return res.data;
};