// import express from "express";
// import { createTrip, getUserTrips } from "../controllers/trip.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/", authMiddleware, createTrip);
// router.get("/", authMiddleware, getUserTrips);

// export default router;

import express from "express";
import { createTrip, getUserTrips } from "../controllers/trip.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { getTripById } from "../controllers/trip.controller.js";
const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getUserTrips);
router.get("/:id", protect, getTripById);


export default router;