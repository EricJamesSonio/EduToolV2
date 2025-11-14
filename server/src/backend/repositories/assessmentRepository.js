import { db } from "../../database/db.js";

export const assessmentRepository = {
  // Get all assessments
  getAllAssessments: async () => {
    const [rows] = await db.query("SELECT * FROM assessments");
    return rows;
  },

  // Get a specific assessment by ID
  getAssessmentById: async (id) => {
    const [rows] = await db.query("SELECT * FROM assessments WHERE id = ?", [id]);
    return rows[0];
  },

  // Get all items/questions for an assessment
  getAssessmentItems: async (assessmentId) => {
    const [rows] = await db.query(
      "SELECT * FROM assessment_items WHERE assessment_id = ?",
      [assessmentId]
    );
    return rows;
  },

  // Record a student submission
  createSubmission: async (assessmentId, studentId, score) => {
    const [result] = await db.query(
      "INSERT INTO assessment_submissions (assessment_id, student_id, score, submitted_at) VALUES (?, ?, ?, NOW())",
      [assessmentId, studentId, score]
    );
    return result.insertId;
  },

  // Record answers for a submission
  createSubmissionAnswers: async (submissionId, answers) => {
    // answers = [{ item_id, chosen_answer, is_correct }, ...]
    const values = answers.map(a => [submissionId, a.item_id, a.chosen_answer, a.is_correct]);
    await db.query(
      "INSERT INTO assessment_answers (submission_id, item_id, chosen_answer, is_correct) VALUES ?",
      [values]
    );
  },

    getStudentScores: async (studentId) => {
    const [rows] = await db.query(
      `SELECT s.score, a.type
       FROM assessment_submissions s
       JOIN assessments a ON s.assessment_id = a.id
       WHERE s.student_id = ?`,
      [studentId]
    );
    return rows;
  },

  createAccessLink: async (assessmentId, studentId) => {
    const token = crypto.randomBytes(20).toString("hex");

    await db.query(
    `INSERT INTO assessment_access_links (assessment_id, student_id, token, expires_at)
    VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY))`,
    [assessmentId, studentId, token]
    );


    return token;
  },

  getAssessmentByToken: async (token) => {
    const [rows] = await db.query(
      `SELECT * FROM assessment_access_links WHERE token = ? AND used = 0`,
      [token]
    );
    return rows[0];
  },

  markLinkAsUsed: async (token) => {
    await db.query(
      `UPDATE assessment_access_links SET used = 1 WHERE token = ?`,
      [token]
    );
  },

  markAssessmentOpened: async (assessmentId, studentId) => {
    await db.query(
      `INSERT INTO assessment_student_access (assessment_id, student_id, opened_at)
       VALUES (?, ?, NOW())
       ON DUPLICATE KEY UPDATE opened_at = NOW()`
      ,
      [assessmentId, studentId]
    );
  },

  hasSubmitted: async (assessmentId, studentId) => {
    const [rows] = await db.query(
      `SELECT submitted FROM assessment_student_access
       WHERE assessment_id = ? AND student_id = ?`,
      [assessmentId, studentId]
    );
    return rows[0]?.submitted === 1;
  },

  markSubmitted: async (assessmentId, studentId) => {
    await db.query(
      `UPDATE assessment_student_access
       SET submitted = 1, submitted_at = NOW()
       WHERE assessment_id = ? AND student_id = ?`,
      [assessmentId, studentId]
    );
  },

  getAssessmentItemsWithOptions: async (assessmentId) => {
    const [items] = await db.query(
      `SELECT * FROM assessment_items WHERE assessment_id = ?`,
      [assessmentId]
    );

    for (const item of items) {
      const [options] = await db.query(
        `SELECT id, option_text FROM assessment_item_options WHERE item_id = ?`,
        [item.id]
      );
      item.options = options;
    }

    // shuffle questions
    items.sort(() => Math.random() - 0.5);

    return items;
  }

};

