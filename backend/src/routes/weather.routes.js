import express from "express";
import { getCityWeather } from "../controllers/weather.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:city", authMiddleware, getCityWeather);

export default router;