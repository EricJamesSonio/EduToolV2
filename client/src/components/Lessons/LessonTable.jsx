const DAYS = [
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
];

export default function LessonTable({ lessons, onEdit, onDelete }) {
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Topic</th>
          <th>Content</th>
          <th>Materials</th>
          <th>Assessment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td>{DAYS.find((d) => d.value === lesson.day_of_week)?.label || lesson.day_of_week}</td>
              <td>{lesson.topic}</td>
              <td>{lesson.content}</td>
              <td>{lesson.materials}</td>
              <td>{lesson.assessment_plan}</td>
              <td>
                <button onClick={() => onEdit(lesson)}>Edit</button>
                <button onClick={() => onDelete(lesson.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No lessons yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
