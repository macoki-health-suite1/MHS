import { useState } from "react";
import ResourceTable from "../../components/ResourceTable";
import { ancColumns, labColumns, visitColumns } from "../../modules/clinical";

const TABS = [
  { key: "visits", label: "Consultations", endpoint: "/visits/", columns: visitColumns },
  { key: "anc", label: "ANC / Maternal Care", endpoint: "/anc-records/", columns: ancColumns },
  { key: "lab", label: "Laboratory", endpoint: "/lab-tests/", columns: labColumns },
];

export default function ClinicalPage() {
  const [tab, setTab] = useState(TABS[0].key);
  const active = TABS.find((t) => t.key === tab)!;
  return (
    <>
      <h2>Clinical</h2>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={t.key === tab ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>
      <ResourceTable key={active.key} title={active.label} endpoint={active.endpoint} columns={active.columns} />
    </>
  );
}
