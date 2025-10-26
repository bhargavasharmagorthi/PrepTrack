import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  agentId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Agent", agentSchema);