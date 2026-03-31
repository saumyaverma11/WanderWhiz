import express from "express";
import { protect } from "../middleware/auth.middleware.js";



import {
  register,
  login,
  getProfile,
  updateProfile,
  updatePreferences,
  deleteAccount,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// router.get("/verify-email/:token", verifyEmail);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/preferences", protect, updatePreferences);
router.delete("/delete-account", protect, deleteAccount);

export default router;