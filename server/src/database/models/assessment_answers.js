export const assessmentAnswersTable = `
CREATE TABLE IF NOT EXISTS assessment_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id INT,
  item_id INT,
  chosen_answer CHAR(1),
  is_correct BOOLEAN,
  FOREIGN KEY (submission_id) REFERENCES assessment_submissions(id),
  FOREIGN KEY (item_id) REFERENCES assessment_items(id)
);
`;
