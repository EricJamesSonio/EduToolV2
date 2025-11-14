import { assessmentRepository } from "../repositories/assessmentRepository.js";

export const assessmentService = {
  submitAssessment: async (assessmentId, studentId, submittedAnswers) => {
    // Fetch correct answers from DB
    const items = await assessmentRepository.getAssessmentItems(assessmentId);

    if (!items.length) {
      throw new Error("This assessment has no questions.");
    }

    let score = 0;
    const answersToInsert = [];

    for (const item of items) {
      const studentAnswer = submittedAnswers.find(a => a.item_id === item.id);
      const isCorrect = studentAnswer?.chosen_answer === item.correct_answer;
      if (isCorrect) score += 1;

      answersToInsert.push({
        item_id: item.id,
        chosen_answer: studentAnswer?.chosen_answer || null,
        is_correct: isCorrect
      });
    }

    // Safe calculation
    const totalScore = (score / items.length) * 100;

    // Save submission and answers
    const submissionId = await assessmentRepository.createSubmission(
      assessmentId,
      studentId,
      totalScore
    );

    await assessmentRepository.createSubmissionAnswers(submissionId, answersToInsert);

    return { submissionId, totalScore };
  }
};
