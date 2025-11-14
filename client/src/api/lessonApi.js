import axios from "axios";

const API_URL = "http://localhost:5000/api/lessons";

export const lessonApi = {
  createPlan: (data, token) =>
    axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } }),
  
  updateEntry: (id, data, token) =>
    axios.put(`${API_URL}/entry/${id}`, data, { headers: { Authorization: `Bearer ${token}` } }),
  
  deleteEntry: (id, token) =>
    axios.delete(`${API_URL}/entry/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
  
  getWeeklyPlans: (weekNumber, year, token) =>
    axios.get(`${API_URL}/week/${weekNumber}/${year}`, { headers: { Authorization: `Bearer ${token}` } }),
  
  getMonthlyPlans: (month, year, token) =>
    axios.get(`${API_URL}/month/${month}/${year}`, { headers: { Authorization: `Bearer ${token}` } }),
};
