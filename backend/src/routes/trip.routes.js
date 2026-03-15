import express from "express";
import { createTrip, getUserTrips } from "../controllers/trip.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTrip);
router.get("/", authMiddleware, getUserTrips);

export default router;