import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import crypto from "crypto";


export const register = async (req, res) => {

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken
  });

  const verifyLink =
    `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

  res.status(201).json({
    message: "User registered. Verify email.",
    verifyLink
  });

};
export const verifyEmail = async (req, res) => {

  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.isVerified = true;
  user.verificationToken = null;

  await user.save();

  res.json({ message: "Email verified successfully" });

};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  if (!user.isVerified)
    return res.status(403).json({ message: "Please verify your email first" });

  if (await bcrypt.compare(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user)
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
