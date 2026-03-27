// import jwt from "jsonwebtoken";
// import { authMiddleware } from "../middleware/auth.middleware.js";

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;

// import jwt from "jsonwebtoken";
// import User from "../models/User.model.js";

// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } else {
//       res.status(401).json({ message: "Not authorized, no token" });
//     }

//   } catch (error) {
//     res.status(401).json({ message: "Token failed" });
//   }
// };


// import express from "express";
// import User from "../models/User.model.js";
// import Trip from "../models/Trip.model.js";
// import adminMiddleware from "../middleware/admin.middleware.js";

// const router = express.Router();

// // ================= GET ALL USERS =================
// router.get(
//   "/users",
//   protect, // ✅ FIXED
//   adminMiddleware,
//   async (req, res) => {
//     try {
//       const users = await User.find().select("-password");
//       res.json(users);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // ================= UPDATE USER ROLE =================
// router.put(
//   "/users/:id",
//   protect, // ✅ FIXED
//   adminMiddleware,
//   async (req, res) => {
//     try {
//       const { role } = req.body;

//       const user = await User.findById(req.params.id);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       user.role = role || user.role;

//       const updatedUser = await user.save();

//       res.json({
//         message: "User updated successfully",
//         user: updatedUser,
//       });

//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // ================= DELETE USER =================
// router.delete(
//   "/users/:id",
//   protect, // ✅ FIXED
//   adminMiddleware,
//   async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       await user.deleteOne();

//       res.json({
//         message: "User deleted successfully",
//       });

//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // ================= GET ALL TRIPS =================
// router.get(
//   "/trips",
//   protect, // ✅ FIXED
//   adminMiddleware,
//   async (req, res) => {
//     try {
//       const trips = await Trip.find().populate("user", "name email");
//       res.json(trips);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // ================= DELETE TRIP =================
// router.delete(
//   "/trips/:id",
//   protect, // ✅ FIXED
//   adminMiddleware,
//   async (req, res) => {
//     try {
//       const trip = await Trip.findById(req.params.id);

//       if (!trip) {
//         return res.status(404).json({ message: "Trip not found" });
//       }

//       await trip.deleteOne();

//       res.json({
//         message: "Trip deleted successfully",
//       });

//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// export default router;




import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

  } catch (error) {
    return res.status(401).json({
      message: "Token failed",
    });
  }
};