import API from "./api";

export const getProfile = async () => {
  const res = await API.get("/auth/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/auth/profile", data);
  return res.data;
};

export const updatePreferences = async (data) => {
  const res = await API.put("/auth/preferences", data);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await API.delete("/auth/delete-account");
  return res.data;
};

export const uploadImage = async (formData) => {
  const res = await API.post("/auth/upload-image", formData);
  return res.data;
};