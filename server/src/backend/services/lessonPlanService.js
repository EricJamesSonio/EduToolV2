import { lessonPlanRepository } from "../repositories/lessonPlanRepository.js";

export const lessonPlanService = {
  createPlanWithEntries: async ({ period_type, week_number, month, year, teacher_id, entries = [] }) => {
    const planId = await lessonPlanRepository.createPlan({ period_type, week_number, month, year, teacher_id });

    for (let entry of entries) {
      await lessonPlanRepository.addPlanEntry({ plan_id: planId, ...entry });
    }

    return planId;
  },

  updateEntry: async (id, data) => {
    return await lessonPlanRepository.updatePlanEntry(id, data);
  },

  deleteEntry: async (id) => {
    return await lessonPlanRepository.deletePlanEntry(id);
  },

  getWeeklyPlans: async (teacher_id, week_number, year) => {
    return await lessonPlanRepository.getWeeklyPlans(teacher_id, week_number, year);
  },

  getMonthlyPlans: async (teacher_id, month, year) => {
    return await lessonPlanRepository.getMonthlyPlans(teacher_id, month, year);
  }
};
