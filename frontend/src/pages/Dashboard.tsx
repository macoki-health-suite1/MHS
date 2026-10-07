import { useEffect, useState } from "react";
import { getSummary } from "../../services/api";
import type { Summary } from "../../types";

export default function Dashboard() {
  const [s, setS] = useState<Summary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSummary().then(setS).catch(() => setError(true));
  }, []);

  const cards: [string, number | undefined][] = [
    ["Patients", s?.patients],
    ["Visits", s?.visits],
    ["Pending prescriptions", s?.pending_prescriptions],
    ["Low-stock items", s?.low_stock_items],
  ];

  return (
    <>
      <h2>Dashboard</h2>
      {error && <p className="error">Could not reach the server.</p>}
      <div className="stat-grid">
        {cards.map(([label, value]) => (
          <div className="card stat" key={label}>
            <span className="stat-value">{value ?? "—"}</span>
            <span className="muted">{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
