import { assessmentService } from "../services/assessmentService.js";

export const assessmentController = {
  submitAssessment: async (req, res) => {
    try {
      const { assessmentId, studentId, answers } = req.body;
      const result = await assessmentService.submitAssessment(assessmentId, studentId, answers);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
