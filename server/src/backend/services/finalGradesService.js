import { finalGradesRepository } from "../repositories/finalGradesRepository.js";
import { assessmentRepository } from "../repositories/assessmentRepository.js";
import { behaviorRepository } from "../repositories/behaviorRepository.js";
import { db } from "../../database/db.js";

export const finalGradesService = {
  calculateFinalGrade: async (studentId, periodStart = "1970-01-01", periodEnd = "2099-12-31") => {
    // 1. Fetch grading weights
    const [settings] = await db.query(`SELECT * FROM grading_settings ORDER BY id DESC LIMIT 1`);
    if (!settings.length) throw new Error("Grading settings not found");
    const weights = settings[0];

    // 2. Get student assessment scores (if any)
    const assessments = await assessmentRepository.getStudentScores(studentId);

    let exam = 0, activity = 0, quiz = 0, exercise = 0;
    let examCount = 0, activityCount = 0, quizCount = 0, exerciseCount = 0;

    assessments.forEach(a => {
      switch(a.type) {
        case "exam": exam += a.score; examCount++; break;
        case "activity": activity += a.score; activityCount++; break;
        case "quiz": quiz += a.score; quizCount++; break;
        case "exercise": exercise += a.score; exerciseCount++; break;
      }
    });

    // Normalize scores to average if multiple or 0 if none
    exam = examCount ? exam / examCount : 0;
    activity = activityCount ? activity / activityCount : 0;
    quiz = quizCount ? quiz / quizCount : 0;
    exercise = exerciseCount ? exercise / exerciseCount : 0;

    // 3. Get behavior score (0 if not yet added)
    const behavior = await behaviorRepository.getBehaviorScore(studentId, periodStart, periodEnd);

    // 4. Compute weighted final grade
    const finalGrade = (
      exam * weights.exam_weight +
      activity * weights.activity_weight +
      quiz * weights.quiz_weight +
      exercise * weights.exercise_weight +
      behavior * weights.behavior_weight
    ) / (
      weights.exam_weight +
      weights.activity_weight +
      weights.quiz_weight +
      weights.exercise_weight +
      weights.behavior_weight
    );

    // 5. Save or update final grade
    await finalGradesRepository.upsertFinalGrade({
      student_id: studentId,
      period: `${periodStart} to ${periodEnd}`,
      exam_grade: exam,
      activity_grade: activity,
      quiz_grade: quiz,
      exercise_grade: exercise,
      behavior_grade: behavior,
      final_grade: finalGrade
    });

    return { finalGrade, behavior };
  }
};
