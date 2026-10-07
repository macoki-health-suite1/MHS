import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, createPatient } from "../../services/api";
import type { NewPatient } from "../../types";
import { validatePatient, type FieldErrors } from "../../utils/validators";

const EMPTY: NewPatient = {
  first_name: "",
  last_name: "",
  sex: "female",
  date_of_birth: null,
  phone: "",
  address: "",
};

/** Flow: form -> frontend validation -> API request -> database -> back to list (re-fetched). */
export default function PatientRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState<NewPatient>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof NewPatient>(key: K, value: NewPatient[K]) => setForm((f) => ({ ...f, [key]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const found = validatePatient(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSaving(true);
    setServerError("");
    try {
      await createPatient(form);
      navigate("/patients");
    } catch (err) {
      setServerError(err instanceof ApiError ? "The server rejected this record. Check the fields." : "Could not reach the server. Nothing was saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h2>Register patient</h2>
      <form className="card form" onSubmit={submit}>
        <label>First name<input value={form.first_name} onChange={(e) => set("first_name", e.target.value)} />
          {errors.first_name && <span className="error">{errors.first_name}</span>}</label>
        <label>Last name<input value={form.last_name} onChange={(e) => set("last_name", e.target.value)} />
          {errors.last_name && <span className="error">{errors.last_name}</span>}</label>
        <label>Sex
          <select value={form.sex} onChange={(e) => set("sex", e.target.value as NewPatient["sex"])}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>Date of birth<input type="date" value={form.date_of_birth ?? ""} onChange={(e) => set("date_of_birth", e.target.value || null)} />
          {errors.date_of_birth && <span className="error">{errors.date_of_birth}</span>}</label>
        <label>Phone<input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          {errors.phone && <span className="error">{errors.phone}</span>}</label>
        <label>Address<textarea value={form.address} onChange={(e) => set("address", e.target.value)} /></label>
        {serverError && <p className="error">{serverError}</p>}
        <button disabled={saving}>{saving ? "Saving…" : "Save patient"}</button>
      </form>
    </>
  );
}
