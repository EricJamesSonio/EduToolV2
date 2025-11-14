import express from "express";
import { assessmentController } from "../controllers/assessmentController.js";

const router = express.Router();

// POST /api/assessments/submit
router.post("/submit", assessmentController.submitAssessment);

export default router;
