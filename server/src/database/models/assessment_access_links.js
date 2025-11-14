export const assessmentAccessLinksTable = `
CREATE TABLE IF NOT EXISTS assessment_access_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT NOT NULL,
  student_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
`;
