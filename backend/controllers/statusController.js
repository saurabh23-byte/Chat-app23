import mongoose from "mongoose";
import { Status } from "../models/statusModel.js";

/**
 * @desc    Create new status
 * @route   POST /api/status
 * @access  Private
 */
export const createStatus = async (req, res) => {
  try {
    const { type, text, mediaUrl, backgroundColor } = req.body;

    // 1️⃣ Validate type
    if (!type || !["text", "image"].includes(type)) {
      return res.status(400).json({ message: "Invalid status type" });
    }

    // 2️⃣ Validate text status
    if (type === "text" && (!text || text.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Text content is required for text status" });
    }

    // 3️⃣ Validate image status
    if (type === "image" && (!mediaUrl || mediaUrl.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Media URL is required for image status" });
    }

    // 4️⃣ Create status
    const status = await Status.create({
      userId: req.user._id,
      type,
      text,
      mediaUrl,
      backgroundColor,
    });

    res.status(201).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create status" });
  }
};

/**
 * @desc    Get active statuses
 * @route   GET /api/status
 * @access  Private
 */
export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find({
      expiresAt: { $gt: new Date() },
    })
      .populate("userId", "fullName profilePhoto")
      .sort({ createdAt: -1 });

    res.status(200).json(statuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch statuses" });
  }
};

/**
 * @desc    Mark status as viewed
 * @route   POST /api/status/view/:id
 * @access  Private
 */
export const viewStatus = async (req, res) => {
  try {
    const statusId = req.params.id;

    // 1️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(statusId)) {
      return res.status(400).json({ message: "Invalid status ID" });
    }

    // 2️⃣ Find status first
    const status = await Status.findOne({
      _id: statusId,
      expiresAt: { $gt: new Date() },
    });

    if (!status) {
      return res.status(404).json({ message: "Status expired or not found" });
    }

    // 3️⃣ Ignore owner view
    if (status.userId.toString() === req.user._id.toString()) {
      return res.status(200).json({ message: "Owner view ignored" });
    }

    // 4️⃣ Add viewer (unique)
    status.viewers.addToSet(req.user._id);
    await status.save();

    res.status(200).json({
      message: "Status viewed",
      viewersCount: status.viewers.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update status view" });
  }
};
