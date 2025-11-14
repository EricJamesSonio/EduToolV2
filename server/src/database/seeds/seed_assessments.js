export const seedAssessments = [
  `
  INSERT INTO assessments (title, description, type, date)
  VALUES 
  ('Math Quiz 1', 'Basic algebra and addition', 'quiz', '2025-11-14'),
  ('Science Exam 1', 'Intro to biology', 'exam', '2025-11-15')
  `,
  `
  INSERT INTO assessment_items (assessment_id, question, option_a, option_b, option_c, option_d, correct_answer)
  VALUES
  (1, '2 + 2 = ?', '3', '4', '5', '6', 'B'),
  (1, '5 - 3 = ?', '1', '2', '3', '4', 'B'),
  (2, 'What is the powerhouse of the cell?', 'Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast', 'C')
  `
];
