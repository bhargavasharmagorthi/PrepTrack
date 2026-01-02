import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // UUID from frontend
  title: { type: String, required: true },
});

const topicSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      enum: ["MAT", "PHY", "CHE"],
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    topicNumber: {
      type: Number,
      required: true,
    },
    topicName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    difficulty: {
      type: String,
      enum: [
        "Easy",
        "Easy to Moderate",
        "Moderate",
        "Moderate to Tough",
        "Tough",
      ],
      default: "Easy to Moderate",
    },
    createdBy: {
      type: String,
      default: "Admin",
    },
    subtopics: [subtopicSchema], // ✅ store subtopics in order
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);