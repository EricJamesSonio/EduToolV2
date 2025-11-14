export const assessmentStudentAccessTable = `
CREATE TABLE IF NOT EXISTS assessment_student_access (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT NOT NULL,
  student_id INT NOT NULL,
  opened_at DATETIME DEFAULT NULL,
  submitted TINYINT DEFAULT 0,
  submitted_at DATETIME DEFAULT NULL,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
`;
