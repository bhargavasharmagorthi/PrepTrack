// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String, // renamed to match hashed password
  phone: String,
  class: String,
  state: String,
  city: String,
  cityOther: String,
  school: String,
  secretQuestion: String,
  secretAnswer: String,
  darkMode: { type: Boolean, default: false },
  notificationsEnabled: { type: Boolean, default: true },
  emailNotifications: { type: Boolean, default: true },
  whatsappNotifications: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);
export default User;