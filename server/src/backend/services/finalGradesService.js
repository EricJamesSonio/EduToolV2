import { finalGradesRepository } from "../repositories/finalGradesRepository.js";
import { db } from "../../database/db.js";

export const finalGradesService = {
  calculateFinalGrade: async (studentId, periodStart = "1970-01-01", periodEnd = "2099-12-31") => {
    // 1️⃣ Fetch grading weights
    const [settingsRows] = await db.query(
      `SELECT * FROM grading_settings ORDER BY id DESC LIMIT 1`
    );
    if (!settingsRows.length) throw new Error("Grading settings not found");
    const weights = settingsRows[0];

    // 2️⃣ Aggregate assessment averages by type
    const [assessmentRows] = await db.query(
      `SELECT a.type, AVG(s.score) as avg_score
       FROM assessment_submissions s
       JOIN assessments a ON s.assessment_id = a.id
       WHERE s.student_id = ? AND s.submitted_at BETWEEN ? AND ?
       GROUP BY a.type`,
      [studentId, periodStart, periodEnd]
    );

    // Initialize all types to 0
    const typeAverages = { exam: 0, activity: 0, quiz: 0, exercise: 0 };
    assessmentRows.forEach(row => {
      typeAverages[row.type] = parseFloat(row.avg_score) || 0;
    });

    // 3️⃣ Get behavior score average
    const [behaviorRows] = await db.query(
      `SELECT AVG(score) as behavior_avg
       FROM behavior_scores
       WHERE student_id = ? AND date BETWEEN ? AND ?`,
      [studentId, periodStart, periodEnd]
    );
    const behaviorAvg = behaviorRows[0]?.behavior_avg || 0;

    // 4️⃣ Compute weighted final grade
    const totalWeight =
      (weights.exam_weight || 0) +
      (weights.activity_weight || 0) +
      (weights.quiz_weight || 0) +
      (weights.exercise_weight || 0) +
      (weights.behavior_weight || 0);

    const finalGrade = (
      (typeAverages.exam * (weights.exam_weight || 0)) +
      (typeAverages.activity * (weights.activity_weight || 0)) +
      (typeAverages.quiz * (weights.quiz_weight || 0)) +
      (typeAverages.exercise * (weights.exercise_weight || 0)) +
      (behaviorAvg * (weights.behavior_weight || 0))
    ) / (totalWeight || 1); // avoid division by zero

    // 5️⃣ Persist final grade
    await finalGradesRepository.upsertFinalGrade({
      student_id: studentId,
      period: `${periodStart} to ${periodEnd}`,
      exam_grade: typeAverages.exam,
      activity_grade: typeAverages.activity,
      quiz_grade: typeAverages.quiz,
      exercise_grade: typeAverages.exercise,
      behavior_grade: behaviorAvg,
      final_grade: finalGrade,
    });

    return {
      exam: typeAverages.exam,
      activity: typeAverages.activity,
      quiz: typeAverages.quiz,
      exercise: typeAverages.exercise,
      behavior: behaviorAvg,
      final: finalGrade,
    };
  },
};
