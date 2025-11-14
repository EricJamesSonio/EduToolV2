import { attendanceService } from "../services/attendanceService.js";

export const attendanceController = {
  markManual: async (req, res) => {
    try {
      const { studentId, status, remarks } = req.body;
      const result = await attendanceService.markManualAttendance(studentId, status, remarks);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByStudent: async (req, res) => {
    try {
      const { studentId } = req.params;
      const result = await attendanceService.getStudentAttendance(studentId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const result = await attendanceService.getAttendanceForDate(date);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
