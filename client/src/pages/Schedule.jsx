import React, { useEffect, useState } from "react";
import { scheduleService } from "../services/scheduleService";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    scheduleService.fetchSchedule().then((data) => {
      setSchedule(data.schedule.entries);
    });
  }, []);

  return (
    <div>
      <h1>Weekly Schedule</h1>
      {schedule.length === 0 ? (
        <p>No schedule yet.</p>
      ) : (
        <ul>
          {schedule.map((entry) => (
            <li key={entry.id}>
              {entry.day_of_week}: {entry.subject} ({entry.start_time} - {entry.end_time})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedule;
