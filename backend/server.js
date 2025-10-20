import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// --- Environment Variables ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env file!");
  process.exit(1);
}

// --- Middleware ---
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// --- MongoDB Connection ---
console.log("⏳ Connecting to MongoDB...");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // ⏰ 10 seconds timeout
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// --- Routes ---
app.get("/", (req, res) => {
  res.send("PrepTrack backend running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connection successful!" });
});