// backend/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String, // renamed to match hashed password
  subject: String,
  secretQuestion: String,
  secretAnswer: String,
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;