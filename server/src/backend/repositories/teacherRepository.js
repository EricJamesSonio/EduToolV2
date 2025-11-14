import { db } from "../../database/db.js";

export const teacherRepository = {
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM teacher WHERE email = ?", [email]);
    return rows[0]; // return single teacher or undefined
  },
};
