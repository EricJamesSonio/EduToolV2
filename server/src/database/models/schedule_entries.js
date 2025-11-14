export const scheduleEntriesTable = `
CREATE TABLE IF NOT EXISTS schedule_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  version_id INT,
  day_of_week ENUM('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
  subject VARCHAR(255),
  start_time TIME,
  end_time TIME,
  room VARCHAR(255),
  FOREIGN KEY (version_id) REFERENCES schedule_versions(id)
);
`;
