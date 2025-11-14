import { db } from "../../database/db.js";

export const behaviorRepository = {
  // Get total behavior score for a student for a given period
  getBehaviorScore: async (studentId, periodStart, periodEnd) => {
    const [rows] = await db.query(
      `SELECT SUM(score) as total_score 
       FROM behavior_scores 
       WHERE student_id = ? AND date BETWEEN ? AND ?`,
      [studentId, periodStart, periodEnd]
    );
    return rows[0]?.total_score || 0;
  },

  // Add or update a behavior score
  upsertBehaviorScore: async (studentId, score, date, remarks = "") => {
    await db.query(
      `INSERT INTO behavior_scores (student_id, score, date, remarks)
       VALUES (?, ?, ?, ?)`,
      [studentId, score, date, remarks]
    );
  }
};
