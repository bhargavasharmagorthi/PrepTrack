// backend/controllers/topicController.js
import Topic from "../models/Topic.js";
import Chapter from "../models/Chapters.js";

// Get all topics
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("chapter", "name");
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a topic
export const createTopic = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a topic
export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a topic ✅ make sure this exists
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json({ message: "Topic deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
