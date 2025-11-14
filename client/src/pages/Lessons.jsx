import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { lessonService } from "../services/lessonService";
import LessonTable from "../components/Lessons/LessonTable";
import LessonForm from "../components/Lessons/LessonForm";
import "../styles/Lessons.css";

export default function Lessons() {
  const { token } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    day_of_week: "",
    topic: "",
    content: "",
    materials: "",
    assessment_plan: "",
  });
  const [editingId, setEditingId] = useState(null);

  // State for period selection
  const [periodType, setPeriodType] = useState("week"); // "week" or "month"
  const [weekNumber, setWeekNumber] = useState(46);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(2025);

  // Fetch lessons whenever period or token changes
  useEffect(() => {
    if (token) fetchLessons();
  }, [periodType, weekNumber, month, year, token]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      let res;
      if (periodType === "week") {
        res = await lessonService.fetchWeeklyPlans(weekNumber, year, token);
      } else {
        res = await lessonService.fetchMonthlyPlans(month, year, token);
      }
      setLessons(res.entries || []);
    } catch (err) {
      console.error("Fetch lessons error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await lessonService.editEntry(editingId, form, token);
        setEditingId(null);
      } else {
        await lessonService.createPlan(
          {
            period_type: periodType,
            week_number: periodType === "week" ? weekNumber : null,
            month: periodType === "month" ? month : null,
            year,
            entries: [form],
          },
          token
        );
      }

      // Reset form
      setForm({
        day_of_week: "",
        topic: "",
        content: "",
        materials: "",
        assessment_plan: "",
      });
      fetchLessons();
    } catch (err) {
      console.error("Submit lesson error:", err);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setForm({ ...entry });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      day_of_week: "",
      topic: "",
      content: "",
      materials: "",
      assessment_plan: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      await lessonService.removeEntry(id, token);
      fetchLessons();
    }
  };

  return (
    <div className="schedule-page">
      <h2>{periodType === "week" ? "Weekly Lesson Plan" : "Monthly Lesson Plan"}</h2>

      {/* Period selection */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <strong>Period Type:</strong>{" "}
          <select value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </label>

        {periodType === "week" && (
          <label style={{ marginLeft: "1rem" }}>
            Week:{" "}
            <input
              type="number"
              value={weekNumber}
              onChange={(e) => setWeekNumber(parseInt(e.target.value))}
              min="1"
              max="53"
            />
          </label>
        )}

        {periodType === "month" && (
          <label style={{ marginLeft: "1rem" }}>
            Month:{" "}
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              min="1"
              max="12"
            />
          </label>
        )}

        <label style={{ marginLeft: "1rem" }}>
          Year:{" "}
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </label>
      </div>

      {/* Lessons Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LessonTable lessons={lessons} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Form */}
      <h3>{editingId ? "Edit Lesson" : "Add Lesson"}</h3>
      <LessonForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editing={!!editingId}
      />
    </div>
  );
}
