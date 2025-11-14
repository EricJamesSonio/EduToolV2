export const assessmentsTable = `
CREATE TABLE IF NOT EXISTS assessments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  type ENUM('quiz','exam','activity','exercise'),
  date DATE
);
`;
