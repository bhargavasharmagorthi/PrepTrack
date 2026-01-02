// backend/controllers/agentController.js
import bcrypt from "bcryptjs";
import Agent from "../models/Agent.js";
import { generateCustomId } from "../utils/idGenerator.js";

// ---------------- Agent Signup ----------------
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