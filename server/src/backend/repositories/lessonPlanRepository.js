import { db } from "../../database/db.js";

export const lessonPlanRepository = {
  // Create a new lesson plan
  createPlan: async ({ period_type, week_number, month, year, teacher_id }) => {
    const [result] = await db.query(
      `INSERT INTO lesson_plans (period_type, week_number, month, year, created_at, teacher_id)
       VALUES (?, ?, ?, ?, NOW(), ?)`,
      [period_type, week_number, month, year, teacher_id]
    );
    return result.insertId;
  },

  // Add an entry to a lesson plan
  addPlanEntry: async ({ plan_id, day_of_week, topic, content, materials, assessment_plan }) => {
    const [result] = await db.query(
      `INSERT INTO lesson_plan_entries (plan_id, day_of_week, topic, content, materials, assessment_plan)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [plan_id, day_of_week, topic || null, content || null, materials || null, assessment_plan || null]
    );
    return result.insertId;
  },

  // Update a plan entry
  updatePlanEntry: async (id, { day_of_week, topic, content, materials, assessment_plan }) => {
    const [result] = await db.query(
      `UPDATE lesson_plan_entries 
       SET day_of_week=?, topic=?, content=?, materials=?, assessment_plan=?
       WHERE id=?`,
      [day_of_week, topic || null, content || null, materials || null, assessment_plan || null, id]
    );
    return result.affectedRows;
  },

  // Delete a plan entry
  deletePlanEntry: async (id) => {
    const [result] = await db.query(`DELETE FROM lesson_plan_entries WHERE id=?`, [id]);
    return result.affectedRows;
  },

  // Fetch all entries for a week for a teacher
  getWeeklyPlans: async (teacher_id, week_number, year) => {
    const [rows] = await db.query(
      `SELECT lpe.*, lp.week_number, lp.year
       FROM lesson_plan_entries lpe
       JOIN lesson_plans lp ON lpe.plan_id = lp.id
       WHERE lp.teacher_id=? AND lp.week_number=? AND lp.year=?`,
      [teacher_id, week_number, year]
    );
    return rows;
  },

  // Fetch all entries for a month for a teacher
  getMonthlyPlans: async (teacher_id, month, year) => {
    const [rows] = await db.query(
      `SELECT lpe.*, lp.month, lp.year
       FROM lesson_plan_entries lpe
       JOIN lesson_plans lp ON lpe.plan_id = lp.id
       WHERE lp.teacher_id=? AND lp.month=? AND lp.year=?`,
      [teacher_id, month, year]
    );
    return rows;
  }
};
