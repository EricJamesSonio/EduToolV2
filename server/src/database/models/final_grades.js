export const finalGradesTable = `
CREATE TABLE IF NOT EXISTS final_grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  period VARCHAR(255),
  exam_grade FLOAT,
  activity_grade FLOAT,
  quiz_grade FLOAT,
  exercise_grade FLOAT,
  behavior_grade FLOAT,
  final_grade FLOAT,
  updated_at DATETIME,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
`;
