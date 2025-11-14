import express from "express";
import { finalGradesController } from "../controllers/finalGradesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route
router.get("/:studentId", authMiddleware.verifyToken, finalGradesController.getStudentGrades);

export default router;
