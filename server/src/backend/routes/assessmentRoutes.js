import express from "express";
import { assessmentController } from "../controllers/assessmentController.js";
import { assessmentRepository } from "../repositories/assessmentRepository.js";
const router = express.Router();



// POST /api/assessments/submit
router.post("/submit", assessmentController.submitAssessment);
router.get("/open/:token", assessmentController.openAssessment);
router.post("/generate-link", async (req, res) => {
  try {
    const { assessmentId, studentId } = req.body;

    if (!assessmentId || !studentId) {
      return res.status(400).json({ error: "assessmentId and studentId required" });
    }

    const token = await assessmentRepository.createAccessLink(
      assessmentId,
      studentId
    );

    res.json({
      success: true,
      token,
      url: `http://localhost:5173/quiz/${token}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
