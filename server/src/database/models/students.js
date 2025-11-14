export const studentsTable = `
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  student_number VARCHAR(255),
  class_section VARCHAR(255)
);
`;
