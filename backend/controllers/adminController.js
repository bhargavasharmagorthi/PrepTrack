// backend/controllers/adminController.js
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { generateCustomId } from "../utils/idGenerator.js";

// ---------------- Admin Signup ----------------
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