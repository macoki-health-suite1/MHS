import { useEffect, useState } from "react";
import { api } from "../services/api/client";
import { cacheGet, cacheSet } from "../storage/cache";
import type { Column } from "../types";

interface Props {
  title: string;
  endpoint: string; // e.g. "/medicines/"
  columns: Column[];
}

type Row = Record<string, unknown>;

/** Generic read-only list backed by the API, with optional offline cache fallback. */
export default function ResourceTable({ title, endpoint, columns }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api<Row[]>(endpoint)
      .then((data) => {
        if (!active) return;
        setRows(data);
        setOffline(false);
        cacheSet(endpoint, data);
      })
      .catch(() => {
        if (!active) return;
        const cached = cacheGet<Row[]>(endpoint);
        if (cached) {
          setRows(cached.value);
          setOffline(true);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [endpoint]);

  return (
    <section className="card">
      <h3>{title}</h3>
      {offline && <p className="banner">Offline: showing last saved copy.</p>}
      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p className="muted">No records yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={String(r.id ?? i)}>
                  {columns.map((c) => <td key={c.key}>{String(r[c.key] ?? "—")}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
