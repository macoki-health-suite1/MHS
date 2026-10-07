import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPatients } from "../../services/api";
import { cacheGet, cacheSet } from "../../storage/cache";
import type { Patient } from "../../types";
import { formatDate, fullName } from "../../utils/format";

const CACHE_KEY = "patients";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [query, setQuery] = useState("");

  // Always re-fetch from the API on mount: the database is the source of truth,
  // so a patient saved on the registration page appears here.
  useEffect(() => {
    let active = true;
    listPatients()
      .then((data) => {
        if (!active) return;
        setPatients(data);
        setOffline(false);
        cacheSet(CACHE_KEY, data);
      })
      .catch(() => {
        if (!active) return;
        const cached = cacheGet<Patient[]>(CACHE_KEY);
        if (cached) {
          setPatients(cached.value);
          setOffline(true);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const q = query.trim().toLowerCase();
  const shown = q
    ? patients.filter((p) => fullName(p).toLowerCase().includes(q) || p.patient_number.toLowerCase().includes(q) || p.phone.includes(q))
    : patients;

  return (
    <>
      <div className="page-head">
        <h2>Patients</h2>
        <Link className="btn" to="/patients/new">+ Register patient</Link>
      </div>
      <input className="search" placeholder="Search name, number or phone" value={query} onChange={(e) => setQuery(e.target.value)} />
      {offline && <p className="banner">Offline: showing last saved copy.</p>}
      <section className="card">
        {loading ? (
          <p>Loading…</p>
        ) : shown.length === 0 ? (
          <p className="muted">No patients found.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>No.</th><th>Name</th><th>Sex</th><th>Date of birth</th><th>Phone</th></tr>
              </thead>
              <tbody>
                {shown.map((p) => (
                  <tr key={p.id}>
                    <td>{p.patient_number}</td>
                    <td>{fullName(p)}</td>
                    <td>{p.sex}</td>
                    <td>{formatDate(p.date_of_birth)}</td>
                    <td>{p.phone || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
