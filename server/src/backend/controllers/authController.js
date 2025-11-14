import { authService } from "../services/authService.js";

export const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.loginTeacher(email, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};
