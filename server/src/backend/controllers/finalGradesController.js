// finalGradesController.js
import { finalGradesService } from "../services/finalGradesService.js";

export const finalGradesController = {
  getStudentGrades: async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const { period } = req.query; // semester/period

      const grades = await finalGradesService.getStudentGrades(studentId, period);
      res.json({ success: true, grades });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
