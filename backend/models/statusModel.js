import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },

    text: {
      type: String,
    },

    mediaUrl: {
      type: String,
    },

    backgroundColor: {
      type: String,
      default: "#25D366",
    },

    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    expiresAt: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    },
  },
  { timestamps: true }
);

export const Status = mongoose.model("Status", statusSchema);
