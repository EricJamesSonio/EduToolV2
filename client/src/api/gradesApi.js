import axios from "axios";

const API_URL = "http://localhost:5000/api/grades";

export const gradesApi = {
  getStudentGrades: (studentId, token, periodStart, periodEnd) => {
    const params = {};
    if (periodStart) params.periodStart = periodStart;
    if (periodEnd) params.periodEnd = periodEnd;

    return axios.get(`${API_URL}/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
  },
};
