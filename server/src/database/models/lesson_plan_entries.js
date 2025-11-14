export const lessonPlanEntriesTable = `
CREATE TABLE IF NOT EXISTS lesson_plan_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_id INT,
  day_of_week ENUM('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
  topic VARCHAR(255),
  content TEXT,
  materials TEXT,
  assessment_plan TEXT,
  FOREIGN KEY (plan_id) REFERENCES lesson_plans(id)
);
`;
