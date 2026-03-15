import dotenv from "dotenv"; 
dotenv.config();
 //for loaded .env files 
 console.log("ENV CHECK:", process.env.GROQ_API_KEY);
import connectDB from "./config/db.js";
import app from "./app.js";




// connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {      //starts express server 
  console.log(`Server running on port ${PORT}`);
});