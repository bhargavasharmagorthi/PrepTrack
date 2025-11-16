// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// ✅ Route files
import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";   // future
// import agentRoutes from "./routes/agentRoutes.js";   // future

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ❌ Stop server if no MongoDB URL
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env file!");
  process.exit(1);
}

// ---------- GLOBAL MIDDLEWARE ----------
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ---------- BASIC TEST ROUTES (should work even if DB down) ----------
app.get("/", (req, res) => res.send("PrepTrack backend running..."));
app.get("/api/test", (req, res) =>
  res.json({ message: "Backend connection successful!" })
);

// ---------- MONGODB CONNECTION ----------
console.log("⏳ Connecting to MongoDB...");

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000, // optional
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    // ---------- AUTH ROUTES ----------
    app.use("/auth", authRoutes);

    // ---------- FUTURE ROUTES ----------
    // app.use("/admin", authMiddleware, adminRoutes);
    // app.use("/agent", authMiddleware, agentRoutes);

    // ---------- START SERVER ----------
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ---------- OPTIONAL: GLOBAL ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});