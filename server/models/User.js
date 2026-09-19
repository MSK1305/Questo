const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    stats: {
      strength: { type: Number, default: 1 },
      stamina: { type: Number, default: 1 },
      endurance: { type: Number, default: 1 },
      intelligence: { type: Number, default: 1 },
      mana: { type: Number, default: 1 },
      spirit: { type: Number, default: 1 },
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    achievements: [
      {
        achievementId: {
          type: String,
          required: true,
        },
        unlockedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
