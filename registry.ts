import { clinicalModule } from "./clinical";
import { pharmacyModule } from "./pharmacy";
import { inventoryModule } from "./inventory";
import { procurementModule } from "./procurement";
import { amarakingsModule } from "./amarakings";

export interface ModuleMeta {
  key: string;
  label: string;
  path: string;
}

/** Sidebar order. Modules can be switched off per organisation via `enabled_modules`. */
export const MODULES: ModuleMeta[] = [
  { key: "dashboard", label: "Dashboard", path: "/" },
  { key: "patients", label: "Patients", path: "/patients" },
  clinicalModule,
  pharmacyModule,
  inventoryModule,
  procurementModule,
  amarakingsModule,
  { key: "reports", label: "Reports", path: "/reports" },
  { key: "settings", label: "Settings", path: "/settings" },
];

/** A module is on unless the organisation explicitly disabled it. */
export const isEnabled = (enabled: Record<string, boolean>, key: string) => enabled[key] !== false;
