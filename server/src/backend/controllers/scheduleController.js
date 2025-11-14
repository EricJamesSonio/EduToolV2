import { scheduleService } from "../services/scheduleService.js";

export const scheduleController = {
  getSemesterSchedule: async (req, res) => {
    try {
      const semesterId = req.params.semesterId;
      const schedule = await scheduleService.getSemesterSchedule(semesterId);
      res.json({ success: true, schedule });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  addEntry: async (req, res) => {
    try {
      const { semesterId, dayOfWeek, subject, startTime, endTime, room } = req.body;
      const result = await scheduleService.addScheduleEntry(semesterId, dayOfWeek, subject, startTime, endTime, room);
      res.json({ success: true, result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateEntry: async (req, res) => {
    try {
      const { entryId, dayOfWeek, subject, startTime, endTime, room } = req.body;
      await scheduleService.updateScheduleEntry(entryId, dayOfWeek, subject, startTime, endTime, room);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteEntry: async (req, res) => {
    try {
      const { entryId } = req.body;
      await scheduleService.deleteScheduleEntry(entryId);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
