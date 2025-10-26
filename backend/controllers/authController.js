import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";
import { generateCustomId } from "../utils/idGenerator.js";
import jwt from "jsonwebtoken";

// ---------------- Signup ----------------
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer } = req.body;

    if (!secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Security question and answer are required!" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);
    const userId = await generateCustomId("ST", User);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      userId,
      secretQuestion,
      secretAnswer: hashedAnswer
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password, subject, secretQuestion, secretAnswer } = req.body;

    if (!subject || !secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Subject, security question, and answer are required!" });

    // Validate subject against allowed values
    const allowedSubjects = ["MAT", "PHY", "CHE"];
    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({ message: "Invalid subject selected." });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);
    const adminId = await generateCustomId("AD", Admin);

    const newAdmin = new Admin({
      name,
      email,
      passwordHash: hashedPassword,
      subject,
      adminId,
      secretQuestion,
      secretAnswer: hashedAnswer
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!", adminId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

export const signupAgent = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer } = req.body;

    if (!secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Security question and answer are required!" });

    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);
    const agentId = await generateCustomId("AG", Agent);

    const newAgent = new Agent({
      name,
      email,
      passwordHash: hashedPassword,
      agentId,
      secretQuestion,
      secretAnswer: hashedAnswer
    });
    await newAgent.save();

    res.status(201).json({ message: "Agent registered successfully!", agentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

// ---------------- Login ----------------
export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    let user = await User.findOne({ userId });
    let role = "user";

    if (!user) {
      user = await Admin.findOne({ adminId: userId });
      role = "admin";
    }
    if (!user) {
      user = await Agent.findOne({ agentId: userId });
      role = "agent";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, name: user.name, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Forgot / Reset Password ----------------
export const forgotPassword = async (req, res) => {
  try {
    const { userId } = req.body;

    let user = await User.findOne({ userId });
    if (!user) user = await Admin.findOne({ adminId: userId });
    if (!user) user = await Agent.findOne({ agentId: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ question: user.secretQuestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyAnswer = async (req, res) => {
  try {
    const { userId, answer } = req.body;

    let user = await User.findOne({ userId });
    if (!user) user = await Admin.findOne({ adminId: userId });
    if (!user) user = await Agent.findOne({ agentId: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(answer, user.secretAnswer);
    if (!isMatch) return res.status(400).json({ message: "Incorrect answer" });

    res.status(200).json({ message: "Answer verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    let user = await User.findOne({ userId });
    if (!user) user = await Admin.findOne({ adminId: userId });
    if (!user) user = await Agent.findOne({ agentId: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};