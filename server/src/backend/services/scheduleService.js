import { scheduleRepository } from "../repositories/scheduleRepository.js";

export const scheduleService = {
  getSemesterSchedule: async (semesterId) => {
    const version = await scheduleRepository.getLatestVersionBySemester(semesterId);
    if (!version) return { version: null, entries: [] };

    const entries = await scheduleRepository.getEntriesByVersion(version.id);
    return { version, entries };
  },

  addScheduleEntry: async (semesterId, dayOfWeek, subject, startTime, endTime, room) => {
    let version = await scheduleRepository.getLatestVersionBySemester(semesterId);
    if (!version) {
      const versionId = await scheduleRepository.createVersion(semesterId, 1);
      version = { id: versionId, version_number: 1 };
    }
    const entryId = await scheduleRepository.addEntry(version.id, dayOfWeek, subject, startTime, endTime, room);
    return { entryId, version };
  },

  updateScheduleEntry: async (entryId, dayOfWeek, subject, startTime, endTime, room) => {
    await scheduleRepository.updateEntry(entryId, dayOfWeek, subject, startTime, endTime, room);
  },

  deleteScheduleEntry: async (entryId) => {
    await scheduleRepository.deleteEntry(entryId);
  },
};
