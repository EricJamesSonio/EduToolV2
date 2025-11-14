import { lessonPlanService } from "../services/lessonPlanService.js";

export const lessonPlanController = {
  createPlan: async (req, res) => {
    try {
      const teacher_id = req.user.id;
      const planId = await lessonPlanService.createPlanWithEntries({ ...req.body, teacher_id });
      res.json({ success: true, planId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateEntry: async (req, res) => {
    try {
      const updated = await lessonPlanService.updateEntry(req.params.id, req.body);
      res.json({ success: true, updated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteEntry: async (req, res) => {
    try {
      const deleted = await lessonPlanService.deleteEntry(req.params.id);
      res.json({ success: true, deleted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getWeeklyPlans: async (req, res) => {
    try {
      const teacher_id = req.user.id;
      const { weekNumber, year } = req.params;
      const plans = await lessonPlanService.getWeeklyPlans(teacher_id, weekNumber, year);
      res.json({ success: true, plans });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getMonthlyPlans: async (req, res) => {
    try {
      const teacher_id = req.user.id;
      const { month, year } = req.params;
      const plans = await lessonPlanService.getMonthlyPlans(teacher_id, month, year);
      res.json({ success: true, plans });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
