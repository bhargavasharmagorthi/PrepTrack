import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,      // ✅ use passwordHash
    subject: { type: String, enum: ["MAT", "PHY", "CHE"], required: true },
    secretQuestion: String,
    secretAnswer: String,
    createdAt: { type: Date, default: Date.now },
  });  

export default mongoose.model("Admin", adminSchema);