export const lessonPlansTable = `
CREATE TABLE IF NOT EXISTS lesson_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  period_type ENUM('week','month'),
  week_number INT,
  month INT,
  year INT,
  created_at DATETIME
);
`;
