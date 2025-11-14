export const lessonPlanEntriesTable = `
CREATE TABLE IF NOT EXISTS lesson_plan_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_id INT NOT NULL,
  day_of_week ENUM('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NULL,
  topic VARCHAR(255) NULL,
  content TEXT NULL,
  materials TEXT NULL,
  assessment_plan TEXT NULL,
  FOREIGN KEY (plan_id) REFERENCES lesson_plans(id)
);
`;
