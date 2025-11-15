export const seedFinalGrades = `
INSERT INTO final_grades 
(student_id, period, quarter, exam_grade, activity_grade, quiz_grade, exercise_grade, behavior_grade, final_grade, updated_at)
VALUES
-- Juan Dela Cruz
(1, '2025-2026', 'Prelim', 85, 80, 90, 75, 88, 83.6, NOW()),
(1, '2025-2026', 'Midterm', 78, 82, 85, 80, 90, 82.0, NOW()),
(1, '2025-2026', 'Pre-Finals', 88, 85, 87, 82, 85, 85.4, NOW()),
(1, '2025-2026', 'Finals', 90, 88, 92, 85, 90, 89.0, NOW()),

-- Maria Santos
(2, '2025-2026', 'Prelim', 92, 90, 88, 85, 95, 90.0, NOW()),
(2, '2025-2026', 'Midterm', 85, 88, 90, 82, 87, 86.4, NOW()),
(2, '2025-2026', 'Pre-Finals', 88, 85, 87, 80, 90, 86.0, NOW()),
(2, '2025-2026', 'Finals', 95, 92, 94, 88, 93, 92.4, NOW());
`;
