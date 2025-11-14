export const assessmentItemOptionsTable = `
CREATE TABLE IF NOT EXISTS assessment_item_options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  option_text VARCHAR(255) NOT NULL,
  is_correct TINYINT DEFAULT 0,
  FOREIGN KEY (item_id) REFERENCES assessment_items(id)
);
`;
