// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, default: "" },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    avatar: { type: String, default: "" },
    class: { type: String, default: "" },
    subscription: {
      plan: { type: String, enum: ["free", "premium"], default: "free" },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    preferences: {
      darkMode: { type: Boolean, default: false },
      notificationsEnabled: { type: Boolean, default: true },
    },
    performanceSummary: {
      Math: {
        testsTaken: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        weakTopics: [{ type: String }],
      },
      Physics: {
        testsTaken: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        weakTopics: [{ type: String }],
      },
      Chemistry: {
        testsTaken: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        weakTopics: [{ type: String }],
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;