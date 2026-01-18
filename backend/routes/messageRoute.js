import express from "express";
import { getMessage, sendMessage, deleteMessageForMe ,editMessage,reactToMessage} from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);
router.route("/delete-for-me/:id").delete(isAuthenticated, deleteMessageForMe);
router.route("/edit/:id").put(isAuthenticated, editMessage);
router.route("/react/:id").post(isAuthenticated, reactToMessage);

export default router;