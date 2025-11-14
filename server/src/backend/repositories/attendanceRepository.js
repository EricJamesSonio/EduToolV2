import { db } from "../../database/db.js";

export const attendanceRepository = {
  markAttendance: async (studentId, date, status, source, remarks) => {
    const query = `
      INSERT INTO attendance (student_id, date, status, source, remarks)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = ?, source = ?, remarks = ?;
    `;
    const params = [studentId, date, status, source, remarks, status, source, remarks];
    await db.query(query, params);
    return { studentId, date, status, source, remarks };
  },

  getAttendanceByStudent: async (studentId) => {
    const query = `SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC`;
    const [rows] = await db.query(query, [studentId]);
    return rows;
  },

  getAttendanceByDate: async (date) => {
    const query = `SELECT * FROM attendance WHERE date = ?`;
    const [rows] = await db.query(query, [date]);
    return rows;
  },

  getAllAttendance: async () => {
    const query = `SELECT * FROM attendance ORDER BY date DESC`;
    const [rows] = await db.query(query);
    return rows;
  }
};
