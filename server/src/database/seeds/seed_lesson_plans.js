// server/src/database/seeds/seed_lesson_plans.js
export const seedLessonPlans = [
  `INSERT INTO lesson_plans (teacher_id, period_type, week_number, month, year)
   VALUES (1, 'week', 1, NULL, 2025);`,
  `INSERT INTO lesson_plans (teacher_id, period_type, week_number, month, year)
   VALUES (1, 'week', 2, NULL, 2025);`
];
