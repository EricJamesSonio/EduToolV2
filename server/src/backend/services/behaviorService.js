import { behaviorRepository } from "../repositories/behaviorRepository.js";
import { finalGradesService } from "./finalGradesService.js";

export const behaviorService = {
  addBehavior: async (studentId, score, date, remarks) => {
    // Save behavior
    await behaviorRepository.upsertBehaviorScore(studentId, score, date, remarks);

    // Recalculate final grade automatically
    // periodStart defaulted so it includes all previous grades
    const finalGrade = await finalGradesService.calculateFinalGrade(studentId);

    return finalGrade;
  }
};
