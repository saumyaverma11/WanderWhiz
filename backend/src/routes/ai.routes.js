// src/routes/ai.routes.js
import express from "express";
import { generateTripItinerary } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/ai/:tripId
router.get("/:tripId", protect, generateTripItinerary);

export default router;