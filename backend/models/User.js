import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "https://i.pravatar.cc/150?img=3" },
    class: { type: String, enum: ["10th", "11th", "12th"], default: "10th" },
    state: { type: String, enum: ["AP", "TS"], default: "AP" },
    city: { type: String, default: "" },
    school: { type: String, default: "" },
    preferences: {
      darkMode: { type: Boolean, default: true },
      notificationsEnabled: { type: Boolean, default: true },
    },
    secretQuestion: { type: String, default: "" },
    secretAnswer: { type: String, default: "" },
    marketingOptIn: {
      email: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);