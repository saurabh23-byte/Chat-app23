import express from "express";
import { getMessage, sendMessage, deleteMessageForMe } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);
router.route("/delete-for-me/:messageId").delete(isAuthenticated, deleteMessageForMe);

export default router;