import express from "express";
import { studentsController } from "../controllers/studentsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route
router.get("/", authMiddleware.verifyToken, studentsController.getAllStudents);

export default router;
