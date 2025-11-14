import axios from "axios";

const API_URL = "http://localhost:5000/api/schedules";

// GET schedule for a specific semester
export const getSchedule = async (semesterId, token) => {
  if (!semesterId) throw new Error("semesterId is required");
  const res = await axios.get(`${API_URL}/${semesterId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// POST new schedule entry
export const addScheduleEntry = async (entry, token) => {
  const res = await axios.post(`${API_URL}/entry`, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// PUT update schedule entry
export const updateScheduleEntry = async (entry, token) => {
  const res = await axios.put(`${API_URL}/entry`, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DELETE schedule entry
export const deleteScheduleEntry = async (entry, token) => {
  const res = await axios.delete(`${API_URL}/entry`, {
    headers: { Authorization: `Bearer ${token}` },
    data: entry,
  });
  return res.data;
};
