
import express from "express";
import { lessonPlanController } from "../controllers/lessonPlanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.post("/", lessonPlanController.createPlan);
router.put("/entry/:id", lessonPlanController.updateEntry);
router.delete("/entry/:id", lessonPlanController.deleteEntry);

router.get("/week/:weekNumber/:year", lessonPlanController.getWeeklyPlans);
router.get("/month/:month/:year", lessonPlanController.getMonthlyPlans);

export default router;
