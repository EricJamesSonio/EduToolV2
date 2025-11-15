import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { gradesService } from "../services/gradesService";
import PeriodFilter from "../components/Grades/PeriodFilter";
import GradesTable from "../components/Grades/GradesTable";
import "../styles/Grades.css";

export default function Grades() {
  const { user, token } = useContext(AuthContext);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ start: "", end: "" });

  const fetchGrades = async (periodStart, periodEnd) => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await gradesService.fetchStudentGrades(
        user.id,
        token,
        periodStart,
        periodEnd
      );
      setGrades({
        exam: data?.exam ?? 0,
        activity: data?.activity ?? 0,
        quiz: data?.quiz ?? 0,
        exercise: data?.exercise ?? 0,
        behavior: data?.behavior ?? 0,
        final: data?.final ?? 0,
      });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load grades");
      setGrades(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades(filter.start, filter.end);
  }, [user, token, filter]);

  const handleFilter = (start, end) => {
    setFilter({ start, end });
  };

  return (
    <div className="grades-page">
      <h2>{user.first_name} {user.last_name} - Final Grades</h2>

      <PeriodFilter onFilter={handleFilter} />

      {loading && <div>Loading grades...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && !error && <GradesTable grades={grades} />}
    </div>
  );
}
