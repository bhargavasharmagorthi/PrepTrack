// backend/routes/topicRoutes.js
import express from "express";
import {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllTopics);
router.post("/create", protect, createTopic);
router.put("/:id", protect, updateTopic);
router.delete("/:id", protect, deleteTopic);

export default router;