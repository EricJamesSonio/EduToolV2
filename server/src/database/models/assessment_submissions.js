export const assessmentSubmissionsTable = `
CREATE TABLE IF NOT EXISTS assessment_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT,
  student_id INT,
  score FLOAT,
  submitted_at DATETIME,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
`;
