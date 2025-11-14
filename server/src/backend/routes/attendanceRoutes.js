import express from "express";
import { attendanceController } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/mark", authMiddleware.verifyToken, attendanceController.markManual);
router.get("/student/:studentId", authMiddleware.verifyToken, attendanceController.getByStudent);
router.get("/date/:date", authMiddleware.verifyToken, attendanceController.getByDate);

export default router;
