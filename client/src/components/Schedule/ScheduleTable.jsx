import React from "react";
import { DAYS, formatTime } from "../../utils/helpers";

export default function ScheduleTable({ schedule, onEdit, onDelete }) {
  return (
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
            <td>{DAYS.find((d) => d.value === entry.dayOfWeek)?.label || entry.dayOfWeek}</td>
            <td>{entry.subject}</td>
            <td>{formatTime(entry.startTime)}</td>
            <td>{formatTime(entry.endTime)}</td>
            <td>{entry.room}</td>
            <td>
              <button onClick={() => onEdit(entry)}>Edit</button>
              <button onClick={() => onDelete(entry.id)}>Delete</button>
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
  );
}
