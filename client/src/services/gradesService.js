import { gradesApi } from "../api/gradesApi";

export const gradesService = {
  fetchStudentGrades: async (studentId, token, periodStart, periodEnd) => {
    try {
      const res = await gradesApi.getStudentGrades(studentId, token, periodStart, periodEnd);
      return res.data.final_grade;
    } catch (err) {
      console.error("Failed to fetch grades:", err);
      throw err;
    }
  },
};
