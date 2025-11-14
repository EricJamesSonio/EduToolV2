import { db } from "../../database/db.js";

export const scheduleRepository = {
  // Semesters
  getAllSemesters: async () => {
    const [rows] = await db.query(`SELECT * FROM semester ORDER BY start_date`);
    return rows;
  },

  getSemesterById: async (id) => {
    const [rows] = await db.query(`SELECT * FROM semester WHERE id = ?`, [id]);
    return rows[0];
  },

  createSemester: async (name, startDate, endDate) => {
    const [result] = await db.query(
      `INSERT INTO semester (name, start_date, end_date) VALUES (?, ?, ?)`,
      [name, startDate, endDate]
    );
    return result.insertId;
  },

  // Schedule Versions
  createVersion: async (semesterId, versionNumber) => {
    const [result] = await db.query(
      `INSERT INTO schedule_versions (semester_id, version_number, updated_at) VALUES (?, ?, NOW())`,
      [semesterId, versionNumber]
    );
    return result.insertId;
  },

  getLatestVersionBySemester: async (semesterId) => {
    const [rows] = await db.query(
      `SELECT * FROM schedule_versions WHERE semester_id = ? ORDER BY version_number DESC LIMIT 1`,
      [semesterId]
    );
    return rows[0];
  },

  // Schedule Entries
  getEntriesByVersion: async (versionId) => {
    const [rows] = await db.query(
      `SELECT * FROM schedule_entries WHERE version_id = ? ORDER BY FIELD(day_of_week, 'Mon','Tue','Wed','Thu','Fri','Sat','Sun'), start_time`,
      [versionId]
    );
    return rows;
  },

  addEntry: async (versionId, dayOfWeek, subject, startTime, endTime, room) => {
    const [result] = await db.query(
      `INSERT INTO schedule_entries (version_id, day_of_week, subject, start_time, end_time, room)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [versionId, dayOfWeek, subject, startTime, endTime, room]
    );
    return result.insertId;
  },

  updateEntry: async (entryId, dayOfWeek, subject, startTime, endTime, room) => {
    await db.query(
      `UPDATE schedule_entries SET day_of_week=?, subject=?, start_time=?, end_time=?, room=? WHERE id=?`,
      [dayOfWeek, subject, startTime, endTime, room, entryId]
    );
  },

  deleteEntry: async (entryId) => {
    await db.query(`DELETE FROM schedule_entries WHERE id=?`, [entryId]);
  },
};
