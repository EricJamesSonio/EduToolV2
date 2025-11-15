import { studentsRepository } from "../repositories/studentsRepository.js";

export const studentsController = {
  getAllStudents: async (req, res) => {
    try {
      const students = await studentsRepository.getAllStudents();
      res.json({ success: true, students });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  },
};
