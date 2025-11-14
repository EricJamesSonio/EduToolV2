import express from "express";
import { behaviorService } from "../services/behaviorService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware.verifyToken, async (req, res) => {
  try {
    const { studentId, score, date, remarks } = req.body;
    if (!studentId || score == null || !date) {
      return res.status(400).json({ error: "studentId, score, and date are required" });
    }

    const result = await behaviorService.addBehavior(studentId, score, date, remarks || "");
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
