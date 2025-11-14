export default function LessonForm({ form, onChange, onSubmit, onCancel, editing }) {
  return (
    <form className="schedule-form" onSubmit={onSubmit}>
      <select name="day_of_week" value={form.day_of_week} onChange={onChange} required>
        <option value="">Select Day</option>
        <option value="Mon">Monday</option>
        <option value="Tue">Tuesday</option>
        <option value="Wed">Wednesday</option>
        <option value="Thu">Thursday</option>
        <option value="Fri">Friday</option>
        <option value="Sat">Saturday</option>
        <option value="Sun">Sunday</option>
      </select>

      <input type="text" name="topic" placeholder="Topic" value={form.topic} onChange={onChange} required />
      <textarea name="content" placeholder="Content" value={form.content} onChange={onChange} />
      <textarea name="materials" placeholder="Materials" value={form.materials} onChange={onChange} />
      <textarea name="assessment_plan" placeholder="Assessment Plan" value={form.assessment_plan} onChange={onChange} />

      <button type="submit">{editing ? "Update" : "Add"}</button>
      {editing && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
