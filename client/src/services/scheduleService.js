import * as scheduleApi from "../api/scheduleApi";

export const scheduleService = {
  fetchSchedule: (semesterId, token) => scheduleApi.getSchedule(semesterId, token),
  createEntry: (entry, token) => scheduleApi.addScheduleEntry(entry, token),
  editEntry: (entry, token) => scheduleApi.updateScheduleEntry(entry, token),
  removeEntry: (entry, token) => scheduleApi.deleteScheduleEntry(entry, token),
};
