import { useState } from "react";

export default function PeriodFilter({ onFilter }) {
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(periodStart, periodEnd);
  };

  return (
    <form className="period-filter" onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input
          type="date"
          value={periodStart}
          onChange={(e) => setPeriodStart(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={periodEnd}
          onChange={(e) => setPeriodEnd(e.target.value)}
        />
      </label>
      <button type="submit">Filter</button>
    </form>
  );
}
