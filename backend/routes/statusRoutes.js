import express from "express";
import {
    createStatus, getStatuses, viewStatus
} from "../controllers/statusController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Create new status
router.route("/").post(isAuthenticated, createStatus);

// Get all active statuses
router.route("/").get(isAuthenticated, getStatuses);

// Mark status as viewed
router.route("/view/:id").post(isAuthenticated, viewStatus);

// Yes, authentication verifies the request first,
// and based on that verification it either sends a response back to the frontend
// or allows the request to continue.

export default router;
