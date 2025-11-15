// server/src/database/seeds/seed_schedule_versions.js
export const seedScheduleVersions = [
  `INSERT INTO schedule_versions (semester_id, version_number, updated_at)
   VALUES (1, 1, NOW());`,
  `INSERT INTO schedule_versions (semester_id, version_number, updated_at)
   VALUES (1, 2, NOW());`
];
