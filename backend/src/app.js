import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";    ///allos frontend to talk with backend
import tripRoutes from "./routes/trip.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import aiRoutes from "./routes/ai.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
import passwordRoutes from "./routes/password.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use(cors());

app.use(express.json());  // used for extracting request body

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
// app.use(errorMiddleware);
app.use("/api/ai", aiRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/admin", adminRoutes);
export default app;