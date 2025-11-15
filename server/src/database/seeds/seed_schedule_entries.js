// server/src/database/seeds/seed_schedule_entries.js
export const seedScheduleEntries = [
  `INSERT INTO schedule_entries (version_id, day_of_week, subject, start_time, end_time, room)
   VALUES (1, 'Mon', 'Math', '08:00:00', '09:30:00', 'Room 101');`,
  `INSERT INTO schedule_entries (version_id, day_of_week, subject, start_time, end_time, room)
   VALUES (1, 'Tue', 'Physics', '09:30:00', '11:00:00', 'Room 102');`,
  `INSERT INTO schedule_entries (version_id, day_of_week, subject, start_time, end_time, room)
   VALUES (2, 'Mon', 'Chemistry', '08:00:00', '09:30:00', 'Room 103');`,
  `INSERT INTO schedule_entries (version_id, day_of_week, subject, start_time, end_time, room)
   VALUES (2, 'Tue', 'Biology', '09:30:00', '11:00:00', 'Room 104');`
];
