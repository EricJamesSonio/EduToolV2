import { finalGradesService } from "../services/finalGradesService.js";

export const finalGradesController = {
  getStudentGrades: async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const { periodStart, periodEnd } = req.query; // optional query params
      const grades = await finalGradesService.calculateFinalGrade(
        studentId,
        periodStart || undefined,
        periodEnd || undefined
      );
      res.json({ success: true, final_grade: grades });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
