import { behaviorService } from "../services/behaviorService.js";

export const behaviorController = {
  addBehavior: async (req, res) => {
    try {
      const { student_id, score, date, remarks } = req.body;
      const finalGrade = await behaviorService.addBehavior(student_id, score, date, remarks);
      res.json({ success: true, final_grade: finalGrade });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
