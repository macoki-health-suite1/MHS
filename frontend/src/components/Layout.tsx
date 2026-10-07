import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";
import { MODULES, isEnabled } from "../modules/registry";

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const enabled = user?.enabled_modules ?? {};

  return (
    <div className="shell">
      <aside className="sidebar">
        <h1 className="brand">MaCoKi</h1>
        <p className="org">{user?.organisation_name ?? "No organisation"}</p>
        <nav>
          {MODULES.filter((m) => isEnabled(enabled, m.key)).map((m) => (
            <NavLink key={m.key} to={m.path} end={m.path === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
              {m.label}
            </NavLink>
          ))}
        </nav>
        <button className="link-btn" onClick={logout}>Sign out ({user?.username})</button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
