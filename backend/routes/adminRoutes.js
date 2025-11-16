import express from "express";
import { signupAdmin } from "../controllers/adminController.js";

const router = express.Router();

// ---------- ADMIN SIGNUP ----------
router.post("/signup", signupAdmin);

export default router;