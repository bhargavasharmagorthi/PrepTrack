import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import chapterRoutes from "./routes/chapterRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ---------- GLOBAL MIDDLEWARE ----------
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ✅ MUST be BEFORE app.listen
app.use("/api/chapters", chapterRoutes);
app.use("/auth", authRoutes);

// ---------- TEST ROUTES ----------
app.get("/", (req, res) =>
  res.send("PrepTrack backend running...")
);
app.get("/api/test", (req, res) =>
  res.json({ message: "Backend connection successful!" })
);

// ---------- DB CONNECTION ----------
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });