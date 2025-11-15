export default function GradesTable({ grades }) {
  if (!grades) return <div>No grades available</div>;

  return (
    <div className="grades-table">
      <table>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Activity</th>
            <th>Quiz</th>
            <th>Exercise</th>
            <th>Behavior</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{grades.exam.toFixed(2)}</td>
            <td>{grades.activity.toFixed(2)}</td>
            <td>{grades.quiz.toFixed(2)}</td>
            <td>{grades.exercise.toFixed(2)}</td>
            <td>{grades.behavior.toFixed(2)}</td>
            <td>{grades.final.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
