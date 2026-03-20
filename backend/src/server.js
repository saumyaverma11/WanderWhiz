import dotenv from "dotenv"; 
dotenv.config();

console.log("ENV CHECK:", process.env.GROQ_API_KEY);


// import { transporter } from "./config/mailer.js"; // 👈 added
import connectDB from "./config/db.js";
import app from "./app.js";

// 🔥 TEMP TEST
// (async () => {
//   try {
//     await transporter.sendMail({
//       from: "saumya.work84@gmail.com",
//       to: "saumya.work84@gmail.com",
//       subject: "Test Email",
//       text: "If you see this, Brevo is working",
//     });

//     console.log("✅ EMAIL SENT SUCCESS");
//   } catch (error) {
//     console.log("❌ EMAIL ERROR:", error);
//   }
// })();

// connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});