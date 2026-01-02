import express from "express";
import { signupAgent } from "../controllers/agentController.js";

const router = express.Router();

// ---------- AGENT SIGNUP ----------
router.post("/signup", signupAgent);

export default router;