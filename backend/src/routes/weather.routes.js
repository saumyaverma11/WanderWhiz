import express from "express";
import { getCityWeather } from "../controllers/weather.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:city", protect, getCityWeather);

export default router;