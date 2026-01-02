import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    chapterId: {
      type: String,
      required: true,
      unique: true,
    },

    subject: {
      type: String,
      enum: ["PHY", "CHE", "MAT"],
      required: true,
    },

    chapterNumber: {
      type: Number,
      required: true,
    },

    chapterName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    prerequisites: {
      type: [String],
      default: [],
    },

    jeeMainWeightage: {
      min: Number,
      max: Number,
    },

    jeeAdvancedWeightage: {
      min: Number,
      max: Number,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Easy to Moderate", "Moderate","Moderate to Difficult", "Hard"],
      default: "Moderate",
    },

    adminId: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
