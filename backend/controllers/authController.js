// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";
import { generateCustomId } from "../utils/idGenerator.js"; // Must generate unique IDs

// ---------------- SIGNUP ----------------
export const signupUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      secretQuestion,
      secretAnswer,
      phone,
      class: className,
      state,
      city,
      cityOther,
      school,
      darkMode,
      notificationsEnabled,
      emailNotifications,
      whatsappNotifications,
    } = req.body;

    if (!secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Security question and answer required!" });

    // Check for existing email
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);

    const userId = await generateCustomId("ST"); // e.g., ST202511160001
    const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

    const newUser = new User({
      userId,
      name,
      email,
      phone: phone || "",
      class: className || "",
      state: state || "",
      city: city || "",
      cityOther: cityOther || "",
      school: school || "",
      passwordHash: hashedPassword,
      secretQuestion,
      secretAnswer: hashedAnswer,
      avatar,
      darkMode: darkMode !== undefined ? darkMode : true,
      notificationsEnabled: notificationsEnabled !== undefined ? notificationsEnabled : true,
      emailNotifications: emailNotifications !== undefined ? emailNotifications : false,
      whatsappNotifications: whatsappNotifications !== undefined ? whatsappNotifications : false,
      preferences: {},
      marketingOptIn: { email: false, whatsapp: false },
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", userId });
  } catch (err) {
    console.error("Signup User Error:", err);
    res.status(500).json({ message: "Server error!" });
  }
};

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer, subject } = req.body;

    if (!secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Security question and answer required!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);

    const adminId = await generateCustomId("AD");

    const newAdmin = new Admin({
      adminId,
      name,
      email,
      passwordHash: hashedPassword,
      secretQuestion,
      secretAnswer: hashedAnswer,
      subject,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully!", adminId });
  } catch (err) {
    console.error("Signup Admin Error:", err);
    res.status(500).json({ message: "Server error!" });
  }
};

export const signupAgent = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer, phone } = req.body;

    if (!secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Security question and answer required!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);

    const agentId = await generateCustomId("AG");

    const newAgent = new Agent({
      agentId,
      name,
      email,
      phone: phone || "",
      passwordHash: hashedPassword,
      secretQuestion,
      secretAnswer: hashedAnswer,
    });

    await newAgent.save();
    res.status(201).json({ message: "Agent registered successfully!", agentId });
  } catch (err) {
    console.error("Signup Agent Error:", err);
    res.status(500).json({ message: "Server error!" });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    let user = await User.findOne({ userId });
    let role = "user";

    if (!user) {
      user = await Admin.findOne({ adminId: userId });
      if (user) role = "admin";
    }

    if (!user) {
      user = await Agent.findOne({ agentId: userId });
      if (user) role = "agent";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1d" });

    res.status(200).json({ token, name: user.name, role, userId: user.userId || user.adminId || user.agentId });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- PASSWORD RECOVERY ----------------
export const forgotPassword = async (req, res) => {
  try {
    const { userId } = req.body;

    const user =
      (await User.findOne({ userId })) ||
      (await Admin.findOne({ adminId: userId })) ||
      (await Agent.findOne({ agentId: userId }));

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ secretQuestion: user.secretQuestion });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyAnswer = async (req, res) => {
  try {
    const { userId, answer } = req.body;

    const user =
      (await User.findOne({ userId })) ||
      (await Admin.findOne({ adminId: userId })) ||
      (await Agent.findOne({ agentId: userId }));

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(answer, user.secretAnswer);
    if (!isMatch) return res.status(400).json({ message: "Incorrect security answer" });

    res.status(200).json({ message: "Answer verified" });
  } catch (err) {
    console.error("Verify Answer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user =
      (await User.findOne({ userId })) ||
      (await Admin.findOne({ adminId: userId })) ||
      (await Agent.findOne({ agentId: userId }));

    if (!user) return res.status(404).json({ message: "User not found" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};