export const assessmentItemsTable = `
CREATE TABLE IF NOT EXISTS assessment_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT,
  question TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer CHAR(1),
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);
`;
