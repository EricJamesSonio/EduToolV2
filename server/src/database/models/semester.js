export const semesterTable = `
CREATE TABLE IF NOT EXISTS semester (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  start_date DATE,
  end_date DATE
);
`;
