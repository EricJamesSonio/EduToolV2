import { attendanceRepository } from "../repositories/attendanceRepository.js";
import { db } from "../../database/db.js";

export const attendanceService = {
  markManualAttendance: async (studentId, status, remarks = "") => {
    const date = new Date().toISOString().split("T")[0];
    return await attendanceRepository.markAttendance(studentId, date, status, "manual", remarks);
  },

  markAutoAttendance: async (studentId, date) => {
    return await attendanceRepository.markAttendance(studentId, date, "present", "auto_from_assessment", "Auto-marked from quiz");
  },

  getStudentAttendance: async (studentId) => {
    return await attendanceRepository.getAttendanceByStudent(studentId);
  },

  getAttendanceForDate: async (date) => {
    return await attendanceRepository.getAttendanceByDate(date);
  },

  getAllAttendance: async () => {
    return await attendanceRepository.getAllAttendance();
  }
};
