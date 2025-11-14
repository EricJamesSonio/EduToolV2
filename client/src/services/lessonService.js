import { lessonApi } from "../api/lessonApi";

export const lessonService = {
  createPlan: async (data, token) => {
    const res = await lessonApi.createPlan(data, token);
    return res.data;
  },

  editEntry: async (id, data, token) => {
    const res = await lessonApi.updateEntry(id, data, token);
    return res.data;
  },

  removeEntry: async (id, token) => {
    const res = await lessonApi.deleteEntry(id, token);
    return res.data;
  },

    fetchWeeklyPlans: async (weekNumber, year, token) => {
    const res = await lessonApi.getWeeklyPlans(weekNumber, year, token);
    return res.data; // now it contains entries, week_number, year
    },


  fetchMonthlyPlans: async (month, year, token) => {
    const res = await lessonApi.getMonthlyPlans(month, year, token);
    return res.data;
  },
};
