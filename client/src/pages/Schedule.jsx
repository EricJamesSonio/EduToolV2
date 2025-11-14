import { useContext, useEffect, useState } from "react";
import { scheduleService } from "../services/scheduleService";
import AuthContext from "../context/AuthContext";
//import "../styles/Schedule.css"; // optional CSS for table/form styling

export default function Schedule() {
  const { token } = useContext(AuthContext); // get JWT token
  const [schedule, setSchedule] = useState([]);
  const [semesterId, setSemesterId] = useState(1); 
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    dayOfWeek: "",
    subject: "",
    startTime: "",
    endTime: "",
    room: "",
  });
  const [editingEntryId, setEditingEntryId] = useState(null);

  // Fetch schedule when semesterId or token changes
  useEffect(() => {
    if (token) fetchSchedule();
  }, [semesterId, token]);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await scheduleService.fetchSchedule(semesterId, token);
      if (res?.schedule?.entries) setSchedule(res.schedule.entries);
      else setSchedule([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEntryId) {
        await scheduleService.editEntry({ id: editingEntryId, ...form }, token);
        setEditingEntryId(null);
      } else {
        await scheduleService.createEntry({ semesterId, ...form }, token);
      }
      setForm({ dayOfWeek: "", subject: "", startTime: "", endTime: "", room: "" });
      fetchSchedule();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntryId(entry.id);
    setForm({
      dayOfWeek: entry.dayOfWeek,
      subject: entry.subject,
      startTime: entry.startTime,
      endTime: entry.endTime,
      room: entry.room,
    });
  };

  const handleDelete = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await scheduleService.removeEntry({ id: entryId }, token);
      fetchSchedule();
    }
  };

  return (
    <div className="schedule-page">
      <h2>Semester Schedule</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Subject</th>
              <th>Start</th>
              <th>End</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.dayOfWeek}</td>
                <td>{entry.subject}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.room}</td>
                <td>
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {schedule.length === 0 && (
              <tr>
                <td colSpan="6">No entries yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <h3>{editingEntryId ? "Edit Entry" : "Add Entry"}</h3>
      <form onSubmit={handleSubmit} className="schedule-form">
        <input
          type="text"
          name="dayOfWeek"
          placeholder="Day of Week"
          value={form.dayOfWeek}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="room"
          placeholder="Room"
          value={form.room}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingEntryId ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}
