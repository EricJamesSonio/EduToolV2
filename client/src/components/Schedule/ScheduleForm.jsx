import React from "react";
import { DAYS } from "../../utils/helpers";

export default function ScheduleForm({ form, onChange, onSubmit, editing, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="schedule-form">
      <select name="dayOfWeek" value={form.dayOfWeek} onChange={onChange} required>
        <option value="">Select Day</option>
        {DAYS.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={onChange}
        required
      />

      <input
        type="time"
        name="startTime"
        value={form.startTime}
        onChange={onChange}
        required
      />
      <input
        type="time"
        name="endTime"
        value={form.endTime}
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="room"
        placeholder="Room"
        value={form.room}
        onChange={onChange}
        required
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && (
          <button type="button" onClick={onCancel} style={{ background: "#ccc" }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
