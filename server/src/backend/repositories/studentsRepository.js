import { db } from "../../database/db.js";

export const studentsRepository = {
  getAllStudents: async () => {
    const [rows] = await db.query(
      `SELECT id, first_name, last_name, student_number, class_section FROM students ORDER BY last_name, first_name`
    );
    return rows;
  },

  getStudentById: async (id) => {
    const [rows] = await db.query(
      `SELECT id, first_name, last_name, student_number, class_section FROM students WHERE id = ?`,
      [id]
    );
    return rows[0];
  },
};
