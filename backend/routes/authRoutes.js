import express from "express";
import {
  signupUser,
  signupAdmin,
  signupAgent,
  login,
  forgotPassword,
  verifyAnswer,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ------------------ Signup ------------------
router.post("/signup-user", signupUser);
router.post("/signup-admin", signupAdmin);
router.post("/signup-agent", signupAgent);

// ------------------ Login ------------------
router.post("/login", login);

// ------------------ Forgot / Reset Password ------------------
router.post("/forgot-password", forgotPassword);        // Get user's security question
router.post("/verify-answer", verifyAnswer);           // Verify answer to security question
router.post("/reset-password", resetPassword);         // Reset password after verification

export default router;