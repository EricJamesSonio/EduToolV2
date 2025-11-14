export const behaviorScoresTable = `
CREATE TABLE IF NOT EXISTS behavior_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  score FLOAT,
  date DATE,
  remarks TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
`;
