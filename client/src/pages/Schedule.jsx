import { useContext, useEffect, useState } from "react";
import { scheduleService } from "../services/scheduleService";
import AuthContext from "../context/AuthContext";
import ScheduleTable from "../components/Schedule/ScheduleTable";
import ScheduleForm from "../components/Schedule/ScheduleForm";
import "../styles/Schedule.css";

export default function Schedule() {
  const { token } = useContext(AuthContext);
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

  useEffect(() => {
    if (token) fetchSchedule();
  }, [semesterId, token]);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await scheduleService.fetchSchedule(semesterId, token);
      if (res?.schedule?.entries) {
        const normalized = res.schedule.entries.map((entry) => ({
          id: entry.id,
          dayOfWeek: entry.day_of_week || "Mon",
          subject: entry.subject || "",
          startTime: entry.start_time || "",
          endTime: entry.end_time || "",
          room: entry.room || "",
        }));
        setSchedule(normalized);
      } else {
        setSchedule([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEntryId) {
        await scheduleService.editEntry({ entryId: editingEntryId, ...form }, token);
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
    setForm({ ...entry });
  };

  const handleCancel = () => {
    setEditingEntryId(null);
    setForm({ dayOfWeek: "", subject: "", startTime: "", endTime: "", room: "" });
  };

  const handleDelete = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await scheduleService.removeEntry({ entryId }, token);
      fetchSchedule();
    }
  };

  return (
    <div className="schedule-page">
      <h2>Semester Schedule</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ScheduleTable schedule={schedule} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <h3>{editingEntryId ? "Edit Entry" : "Add Entry"}</h3>
      <ScheduleForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editing={!!editingEntryId}
        onCancel={handleCancel} // <-- pass cancel handler
      />
    </div>
  );
}
