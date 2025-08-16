import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style-step7.css";

export default function Step7() {
  const navigate = useNavigate();

  // نفس الحقول الموجودة في سكربتك
  const [form, setForm] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
    street: "",
    zip: "",
    city: "",
    phone: "",
    email: "",
    note: "",
    reminder_email: "",
    reminder_sms: "",
    privacy: false,
  });

  const [errors, setErrors] = useState({});
  const [chosenSummary, setChosenSummary] = useState("");

  // قراءة التاريخ/الوقت المختار من step6 (تمامًا مثل سكربتك)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chosenSlot");
      if (!saved) return;
      const { date, time } = JSON.parse(saved);
      if (date && time) {
        const d = new Date(date + "T00:00:00");
        const de = d.toLocaleDateString("de-DE", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        setChosenSummary(`Freie Termine für ${de} – gewählte Uhrzeit: ${time}`);
      }
    } catch {}
    // تحميل بيانات محفوظة لو موجودة
    try {
      const savedForm = localStorage.getItem("personalData");
      if (savedForm) setForm((p) => ({ ...p, ...JSON.parse(savedForm) }));
    } catch {}
  }, []);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  // فاليديشن مطابقة لسكربت JS
  const validate = () => {
    const e = {};
    const err = (key, msg) => (e[key] = msg);

    if (!form.first_name.trim()) err("first_name", "Pflichtfeld.");
    if (!form.last_name.trim()) err("last_name", "Pflichtfeld.");
    if (!form.street.trim()) err("street", "Pflichtfeld.");
    if (!/^\d{5}$/.test(form.zip)) err("zip", "Bitte 5-stellige PLZ eingeben.");
    if (!form.city.trim()) err("city", "Pflichtfeld.");
    if (!form.phone.trim()) err("phone", "Pflichtfeld.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err("email", "Ungültige E-Mail.");
    if (!form.reminder_email) err("reminder_email", "Bitte wählen.");
    if (!form.reminder_sms) err("reminder_sms", "Bitte wählen.");
    if (!form.privacy) err("privacy", "Bitte bestätigen.");

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // كوّني الـ payload بنفس الصياغة
    let chosen = {};
    try {
      chosen = JSON.parse(localStorage.getItem("chosenSlot") || "{}");
    } catch {}

    const payload = {
      full_name: `${form.first_name} ${form.last_name}`.trim(),
      email: form.email,
      phone: form.phone,
      date: chosen.date || "",
      time: chosen.time || "",
      treatment_type: localStorage.getItem("treatment_type") || "",
      address: { street: form.street, zip: form.zip, city: form.city },
      salutation: form.salutation,
      note: form.note,
      reminder_email: form.reminder_email,
      reminder_sms: form.reminder_sms,
    };

    // خزّني البيانات محليًا (مثل ما عملنا بالخطوات السابقة)
    localStorage.setItem("personalData", JSON.stringify(form));

    try {
      // لو بدك ترسلي للسيرفر الآن، شيّلي التعليق:
      // const res = await fetch("http://localhost:3000/api/appointments", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // const out = await res.json();
      // if (!out.success) throw new Error("Serverfehler");

      navigate("/step8"); // نجاح
    } catch (err) {
      alert("Es gab einen Fehler beim Senden. Bitte erneut versuchen.");
      console.error(err);
    }
  };

  return (
    <div className="step7-wrap">
      <header className="header">
        <img src="/images/header.jpg" alt="Header Image" className="header-image" />
      </header>

      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>

        <div className="steps-wrapper">
        <div className="step-circle">?<i className="fas fa-question" /></div>
        <div className="line" />
        <div className="step-circle active">📅<i className="fas fa-calendar-alt" /></div>
        <div className="line" />
        <div className="step-circle">✏️<i className="fas fa-pen" /></div>
        <div className="line" />
        <div className="step-circle">👁<i className="fas fa-eye" /></div>
        <div className="line" />
        <div className="step-circle">✔<i className="fas fa-check" /></div>
      </div>

      {/* ممكن تتركي ProgressBar العام تبعك فوق الصفحة هنا */}

      <main className="container">
        <section className="panel">
          <div className="panel-title">
            <span>6. Persönliche Daten</span>
          </div>
          <p className="panel-hint">
            Die mit einem <strong>*</strong> gekennzeichneten Felder sind Pflicht.
          </p>

          {chosenSummary && (
            <div id="chosen-summary" className="mini-summary" aria-live="polite">
              {chosenSummary}
            </div>
          )}

          <form id="personal-form" className="personal-form" noValidate onSubmit={onSubmit}>
            <div className="form-row">
              <label htmlFor="salutation">Anrede</label>
              <select id="salutation" name="salutation" value={form.salutation} onChange={onChange}>
                <option value="">bitte wählen</option>
                <option value="Frau">Frau</option>
                <option value="Herr">Herr</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="first_name">Vorname *</label>
              <input id="first_name" name="first_name" value={form.first_name} onChange={onChange} />
              {errors.first_name && <span className="error">{errors.first_name}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="last_name">Nachname *</label>
              <input id="last_name" name="last_name" value={form.last_name} onChange={onChange} />
              {errors.last_name && <span className="error">{errors.last_name}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="street">Straße *</label>
              <input id="street" name="street" value={form.street} onChange={onChange} />
              {errors.street && <span className="error">{errors.street}</span>}
            </div>

            <div className="form-row two">
              <div>
                <label htmlFor="zip">PLZ *</label>
                <input id="zip" name="zip" maxLength={5} inputMode="numeric" value={form.zip} onChange={onChange} />
                {errors.zip && <span className="error">{errors.zip}</span>}
              </div>
              <div>
                <label htmlFor="city">Ort *</label>
                <input id="city" name="city" value={form.city} onChange={onChange} />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="phone">Telefon *</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="email">E‑Mail Adresse *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="note">Bemerkung</label>
              <textarea id="note" name="note" rows={4} value={form.note} onChange={onChange} />
            </div>

            <div className="form-row">
              <label htmlFor="reminder_email">Terminerinnerung per E‑Mail *</label>
              <select
                id="reminder_email"
                name="reminder_email"
                value={form.reminder_email}
                onChange={onChange}
              >
                <option value="">bitte wählen</option>
                <option value="ja">Ja</option>
                <option value="nein">Nein</option>
              </select>
              {errors.reminder_email && <span className="error">{errors.reminder_email}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="reminder_sms">Terminerinnerung per SMS *</label>
              <select
                id="reminder_sms"
                name="reminder_sms"
                value={form.reminder_sms}
                onChange={onChange}
              >
                <option value="">bitte wählen</option>
                <option value="ja">Ja</option>
                <option value="nein">Nein</option>
              </select>
              {errors.reminder_sms && <span className="error">{errors.reminder_sms}</span>}
            </div>

            <div className="form-row checkbox-row">
              <label>
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={form.privacy}
                  onChange={onChange}
                />
                {" "}Ich akzeptiere die Datenschutzhinweise. *
              </label>
              {errors.privacy && <span className="error">{errors.privacy}</span>}
            </div>

            <div className="button-row">
              <button type="button" className="btn btn-light" onClick={() => navigate("/step7")}>
                « Zurück
              </button>
              <button type="button" className="btn btn-light" onClick={() => navigate("/step9")}>
                Weiter »
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
} 