import { useEffect, useState } from "react";
import { getSummary } from "../../services/api";
import type { Summary } from "../../types";

export default function ReportsPage() {
  const [s, setS] = useState<Summary | null>(null);
  useEffect(() => {
    getSummary().then(setS).catch(() => setS(null));
  }, []);

  return (
    <>
      <h2>Reports</h2>
      <section className="card">
        <h3>Summary</h3>
        {s ? (
          <ul>
            <li>Patients registered: {s.patients}</li>
            <li>Visits recorded: {s.visits}</li>
            <li>Pending prescriptions: {s.pending_prescriptions}</li>
            <li>Items at or below reorder level: {s.low_stock_items}</li>
          </ul>
        ) : (
          <p className="muted">No data available.</p>
        )}
        <p className="muted">Clinical, pharmacy, inventory and administrative reports will be added here.</p>
      </section>
    </>
  );
}
