// server/src/database/seeds/seed_lesson_plan_entries.js
export const seedLessonPlanEntries = [
  `INSERT INTO lesson_plan_entries (plan_id, day_of_week, topic, content, materials, assessment_plan)
   VALUES (1, 'Mon', 'Math Algebra', 'Introduction to Algebra', 'Textbook', 'Quiz 1');`,
  `INSERT INTO lesson_plan_entries (plan_id, day_of_week, topic, content, materials, assessment_plan)
   VALUES (1, 'Tue', 'Physics', 'Newton Laws', 'Slides', 'Lab 1');`,
  `INSERT INTO lesson_plan_entries (plan_id, day_of_week, topic, content, materials, assessment_plan)
   VALUES (2, 'Mon', 'Chemistry Basics', 'Atoms & Molecules', 'Workbook', 'Quiz 1');`,
  `INSERT INTO lesson_plan_entries (plan_id, day_of_week, topic, content, materials, assessment_plan)
   VALUES (2, 'Tue', 'Biology', 'Cell Structure', 'Slides', 'Lab 1');`
];
