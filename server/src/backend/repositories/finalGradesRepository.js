// finalGradesRepository.js
import { db } from "../../database/db.js";

export const finalGradesRepository = {
  getGradesByStudent: async (studentId, period) => {
    const [rows] = await db.query(
      `SELECT * FROM final_grades 
       WHERE student_id = ? ${period ? 'AND period = ?' : ''}
       ORDER BY FIELD(quarter,'Prelim','Midterm','Pre-Finals','Finals')`,
      period ? [studentId, period] : [studentId]
    );
    return rows;
  },

  upsertFinalGrade: async ({
    student_id,
    period,
    quarter,
    exam_grade,
    activity_grade,
    quiz_grade,
    exercise_grade,
    behavior_grade,
    final_grade,
  }) => {
    const [rows] = await db.query(
      `INSERT INTO final_grades
        (student_id, period, quarter, exam_grade, activity_grade, quiz_grade, exercise_grade, behavior_grade, final_grade, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
        exam_grade=VALUES(exam_grade),
        activity_grade=VALUES(activity_grade),
        quiz_grade=VALUES(quiz_grade),
        exercise_grade=VALUES(exercise_grade),
        behavior_grade=VALUES(behavior_grade),
        final_grade=VALUES(final_grade),
        updated_at=NOW()`,
      [student_id, period, quarter, exam_grade, activity_grade, quiz_grade, exercise_grade, behavior_grade, final_grade]
    );
    return rows;
  },
};
