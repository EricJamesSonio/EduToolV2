import { finalGradesService } from "../services/finalGradesService.js";

export const finalGradesController = {
  getStudentGrades: async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const grades = await finalGradesService.calculateFinalGrade(studentId);
      res.json({ success: true, final_grade: grades });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
