export const seedGradingSettings = `
INSERT INTO grading_settings (
  exam_weight, activity_weight, quiz_weight, exercise_weight, behavior_weight, updated_at
)
VALUES (30, 30, 15, 15, 10, NOW());
`;
