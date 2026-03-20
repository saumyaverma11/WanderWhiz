import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

let resetTokens = {}; // temporary in-memory store

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  resetTokens[token] = {
    userId: user._id,
    expires: Date.now() + 15 * 60 * 1000
  };

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  res.json({
    message: "Reset link generated",
    resetLink
  });
};


// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const stored = resetTokens[token];

  if (!stored) {
    return res.status(400).json({ message: "Invalid token" });
  }

  if (Date.now() > stored.expires) {
    delete resetTokens[token];
    return res.status(400).json({ message: "Token expired" });
  }

  const user = await User.findById(stored.userId);

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;

  await user.save();

  delete resetTokens[token];

  res.json({ message: "Password updated successfully" });
};