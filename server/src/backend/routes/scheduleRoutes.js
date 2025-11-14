import express from "express";
import { scheduleController } from "../controllers/scheduleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get schedule for a semester
router.get("/:semesterId", authMiddleware.verifyToken, scheduleController.getSemesterSchedule);

// Add, update, delete schedule entries
router.post("/entry", authMiddleware.verifyToken, scheduleController.addEntry);
router.put("/entry", authMiddleware.verifyToken, scheduleController.updateEntry);
router.delete("/entry", authMiddleware.verifyToken, scheduleController.deleteEntry);

export default router;
