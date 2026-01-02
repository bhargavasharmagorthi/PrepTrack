// backend/models/Agent.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  agentId: { type: String, unique: true }, // must exist
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  secretQuestion: String,
  secretAnswer: String,
  phone: String
});

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;