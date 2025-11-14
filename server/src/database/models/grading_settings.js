export const gradingSettingsTable = `
CREATE TABLE IF NOT EXISTS grading_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_weight FLOAT,
  activity_weight FLOAT,
  quiz_weight FLOAT,
  exercise_weight FLOAT,
  behavior_weight FLOAT,
  updated_at DATETIME
);
`;
