import { useAuth } from "../../services/auth/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <>
      <h2>Settings</h2>
      <section className="card">
        <h3>Account</h3>
        <p>User: {user?.username}</p>
        <p>Role: {user?.role}</p>
        <p>Organisation: {user?.organisation_name ?? "—"}</p>
      </section>
    </>
  );
}
