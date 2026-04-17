import API from "./api";

// 🔐 LOGIN
export const loginUser = async (data) => {
  const res = await API.post("/api/auth/login", data);  // ✅ FIXED
  return res.data;
};

// 📝 REGISTER
export const registerUser = async (data) => {
  const res = await API.post("/api/auth/register", data); // ✅ FIXED
  return res.data;
};