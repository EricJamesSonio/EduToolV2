import { assessmentRepository } from "../repositories/assessmentRepository.js";

export const assessmentService = {

  // Submit assessment answers
  submitAssessment: async (assessmentId, studentId, submittedAnswers) => {
    const already = await assessmentRepository.hasSubmitted(assessmentId, studentId);
    if (already) throw new Error("You already submitted this assessment.");

    const items = await assessmentRepository.getAssessmentItemsWithOptions(assessmentId);
    if (!items.length) throw new Error("Assessment has no questions.");

    let score = 0;
    const answersToInsert = [];

    for (const item of items) {
      const studentAns = submittedAnswers.find(a => a.item_id === item.id);
      const isCorrect = studentAns?.chosen_answer === item.correct_answer;
      if (isCorrect) score++;

      answersToInsert.push({
        item_id: item.id,
        chosen_answer: studentAns?.chosen_answer || null,
        is_correct: isCorrect
      });
    }

    const totalScore = (score / items.length) * 100;

    const submissionId = await assessmentRepository.createSubmission(
      assessmentId,
      studentId,
      totalScore
    );

    await assessmentRepository.createSubmissionAnswers(submissionId, answersToInsert);
    await assessmentRepository.markSubmitted(assessmentId, studentId);

    return { submissionId, totalScore };
  },

  // Get assessment for a student via token
  getAssessmentForStudent: async (token) => {
    const access = await assessmentRepository.getAssessmentByToken(token);
    if (!access) throw new Error("Invalid or expired token.");

    // mark opened
    await assessmentRepository.markAssessmentOpened(access.assessment_id, access.student_id);

    // fetch items with options
    const items = await assessmentRepository.getAssessmentItemsWithOptions(access.assessment_id);

    return {
      student_id: access.student_id,
      assessment_id: access.assessment_id,
      items
    };
  }

};
