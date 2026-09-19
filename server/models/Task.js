const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    status: {
      type: String,
      enum: ["issued", "ongoing", "completed"],
      default: "issued",
    },
  },
  {
    timestamps: true,
  },
);

// Compound index: highly recommended if you frequently query tasks by user AND date (e.g., calendar views)
taskSchema.index({ user: 1, date: 1 });

// Optional: Compound index if you frequently filter by user and campaign
taskSchema.index({ user: 1, campaign: 1 });

module.exports = mongoose.model("Task", taskSchema);
