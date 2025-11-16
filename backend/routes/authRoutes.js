// backend/routes/authRoutes.js
import express from "express";

// Signup controllers
import { signupUser } from "../controllers/userController.js";
import { signupAdmin } from "../controllers/adminController.js";
import { signupAgent } from "../controllers/agentController.js";

// Auth controllers
import { login, forgotPassword, verifyAnswer, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// -------- SIGNUP ROUTES --------
router.post("/signup-user", signupUser);
router.post("/signup-admin", signupAdmin);
router.post("/signup-agent", signupAgent);

// -------- LOGIN ROUTES --------
router.post("/login", login);

// -------- PASSWORD RECOVERY --------
router.post("/forgot-password", forgotPassword);
router.post("/verify-answer", verifyAnswer);
router.post("/reset-password", resetPassword);

export default router;