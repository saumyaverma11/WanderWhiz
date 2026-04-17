import dotenv from "dotenv"; 
dotenv.config();

console.log("ENV CHECK:", process.env.GROQ_API_KEY);


import connectDB from "./config/db.js";
import app from "./app.js";


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});