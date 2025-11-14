import axios from "axios";

const API_URL = "http://localhost:5000/api/schedules";

export const getSchedule = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

export const addScheduleEntry = async (entry) => {
  const res = await axios.post(`${API_URL}/add`, entry);
  return res.data;
};

export const updateScheduleEntry = async (entryId, entry) => {
  const res = await axios.put(`${API_URL}/update/${entryId}`, entry);
  return res.data;
};

export const deleteScheduleEntry = async (entryId) => {
  const res = await axios.delete(`${API_URL}/delete/${entryId}`);
  return res.data;
};
