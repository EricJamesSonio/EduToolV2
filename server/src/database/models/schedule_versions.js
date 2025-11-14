export const scheduleVersionsTable = `
CREATE TABLE IF NOT EXISTS schedule_versions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  semester_id INT,
  version_number INT,
  updated_at DATETIME,
  FOREIGN KEY (semester_id) REFERENCES semester(id)
);
`;
