import Chapter from "../models/Chapters.js";
import { generateCustomId } from "../utils/idGenerator.js";

/**
 * CREATE CHAPTER
 */
export const createChapter = async (req, res) => {
  try {
    const {
      subject,
      chapterNumber,
      chapterName,
      description,
      prerequisites,
      jeeMainWeightage,
      jeeAdvancedWeightage,
      difficulty,
    } = req.body;

    if (!subject || !chapterNumber || !chapterName) {
      return res.status(400).json({
        message: "Subject, chapter number and name are required",
      });
    }

    const { adminId, name: adminName } = req.admin;
    const chapterId = await generateCustomId("CH");

    const chapter = new Chapter({
      chapterId,
      subject,
      chapterNumber,
      chapterName,
      description,
      prerequisites,
      jeeMainWeightage,
      jeeAdvancedWeightage,
      difficulty,
      adminId,
      createdBy: adminName,
    });

    await chapter.save();

    res.status(201).json(chapter);
  } catch (err) {
    console.error("Create Chapter Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL CHAPTERS
 */
export const getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ chapterNumber: 1 }); // ascending
    res.status(200).json(chapters);
  } catch (err) {
    console.error("Get Chapters Error:", err);
    res.status(500).json({ message: "Failed to fetch chapters" });
  }
};

/**
 * UPDATE CHAPTER
 */
export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Chapter.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Chapter Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE CHAPTER
 */
export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Chapter.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (err) {
    console.error("Delete Chapter Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};