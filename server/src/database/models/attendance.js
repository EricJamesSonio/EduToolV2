export const attendanceTable = `
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  date DATE,
  status ENUM('present','absent','late'),
  source ENUM('auto_from_assessment','manual'),
  remarks TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
`;
