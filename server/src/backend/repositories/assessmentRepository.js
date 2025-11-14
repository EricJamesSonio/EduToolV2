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
  }
};

