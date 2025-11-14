import * as scheduleApi from "../api/scheduleApi";

export const scheduleService = {
  fetchSchedule: () => scheduleApi.getSchedule(),
  createEntry: (entry) => scheduleApi.addScheduleEntry(entry),
  editEntry: (entryId, entry) => scheduleApi.updateScheduleEntry(entryId, entry),
  removeEntry: (entryId) => scheduleApi.deleteScheduleEntry(entryId),
};
