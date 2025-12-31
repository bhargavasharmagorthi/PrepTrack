import express from "express";
import {
  createChapter,
  getAllChapters,
  updateChapter,
  deleteChapter,
} from "../controllers/chapterController.js";

import {
  verifyToken,
  authorizeRoles,
  attachAdminDetails,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * CREATE CHAPTER
 * POST /api/chapters/create
 */
router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  attachAdminDetails,
  createChapter
);

/**
 * GET ALL CHAPTERS
 * GET /api/chapters
 */
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllChapters
);

/**
 * UPDATE CHAPTER
 * PUT /api/chapters/:id
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  attachAdminDetails,
  updateChapter
);

/**
 * DELETE CHAPTER
 * DELETE /api/chapters/:id
 */
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  attachAdminDetails,
  deleteChapter
);

export default router;