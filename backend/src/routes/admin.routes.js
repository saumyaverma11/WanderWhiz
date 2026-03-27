// import express from "express";
// import User from "../models/User.model.js";
// import Trip from "../models/Trip.model.js";
// import authMiddleware from "../middleware/auth.middleware.js";

// const router = express.Router();


// // GET ALL USERS
// router.get("/users", authMiddleware, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // UPDATE USER ROLE (ADMIN / USER)
// router.put("/users/:id", authMiddleware, async (req, res) => {
//   try {
//     const { role } = req.body;

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.role = role || user.role;

//     const updatedUser = await user.save();

//     res.json({
//       message: "User updated",
//       user: updatedUser,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // DELETE USER
// router.delete("/users/:id", authMiddleware, async (req, res) => {
//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await user.deleteOne();

//     res.json({
//       message: "User deleted successfully",
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // GET ALL TRIPS
// router.get("/trips", authMiddleware, async (req, res) => {
//   try {

//     const trips = await Trip.find().populate("user", "name email");

//     res.json(trips);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // DELETE TRIP
// router.delete("/trips/:id", authMiddleware, async (req, res) => {
//   try {

//     const trip = await Trip.findById(req.params.id);

//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     await trip.deleteOne();

//     res.json({
//       message: "Trip deleted successfully",
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
// import express from "express";
// import User from "../models/User.model.js";
// import Trip from "../models/Trip.model.js";
// import {protect} from "../middleware/auth.middleware.js";
// import adminMiddleware from "../middleware/admin.middleware.js"; // 🔥 NEW

// const router = express.Router();


// // ================= GET ALL USERS =================
// router.get(
//   "/users",
//   authMiddleware,
//   adminMiddleware, // 🔥 ADMIN CHECK
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
//   authMiddleware,
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
//   authMiddleware,
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
//   authMiddleware,
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
//   authMiddleware,
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





import express from "express";
import User from "../models/User.model.js";
import Trip from "../models/Trip.model.js";
import { protect } from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// ================= GET ALL USERS =================
router.get(
  "/users",
  protect, // ✅ FIXED
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ================= UPDATE USER ROLE =================
router.put(
  "/users/:id",
  protect, // ✅ FIXED
  adminMiddleware,
  async (req, res) => {
    try {
      const { role } = req.body;

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = role || user.role;

      const updatedUser = await user.save();

      res.json({
        message: "User updated successfully",
        user: updatedUser,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ================= DELETE USER =================
router.delete(
  "/users/:id",
  protect, // ✅ FIXED
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.deleteOne();

      res.json({
        message: "User deleted successfully",
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ================= GET ALL TRIPS =================
router.get(
  "/trips",
  protect, // ✅ FIXED
  adminMiddleware,
  async (req, res) => {
    try {
      const trips = await Trip.find().populate("user", "name email");
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ================= DELETE TRIP =================
router.delete(
  "/trips/:id",
  protect, // ✅ FIXED
  adminMiddleware,
  async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);

      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      await trip.deleteOne();

      res.json({
        message: "Trip deleted successfully",
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;