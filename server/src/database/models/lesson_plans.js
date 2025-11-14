export const lessonPlansTable = `
CREATE TABLE IF NOT EXISTS lesson_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  period_type ENUM('week','month') NOT NULL,
  week_number INT NULL,
  month INT NULL,
  year INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);
`;
