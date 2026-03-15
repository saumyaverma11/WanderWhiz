// src/routes/ai.routes.js
import express from "express";
import { generateTripItinerary } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate/:tripId", authMiddleware, generateTripItinerary);

export default router;