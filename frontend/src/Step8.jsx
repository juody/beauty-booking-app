import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style-step7.css";
import axios from "axios";
import { useBooking } from "./context/BookingContext.js";

export default function Step8() {
  const navigate = useNavigate();
  const { data } = useBooking(); 

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

  
  useEffect(() => {
    try {
      const savedSlot = localStorage.getItem("chosenSlot"); 
      if (savedSlot) {
        const { date, time } = JSON.parse(savedSlot);
        if (date && time) {
          const d = new Date(date + "T00:00:00");
          const pretty = d.toLocaleDateString("de-DE", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
          setChosenSummary(
            `Freie Termine für ${pretty} – gewählte Uhrzeit: ${time}`
          );
        }
      }
    } catch {}

    try {
      const savedForm = localStorage.getItem("personalData");
      if (savedForm) setForm((p) => ({ ...p, ...JSON.parse(savedForm) }));
    } catch {}
  }, []);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = {};
    const err = (k, m) => (e[k] = m);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    
    let chosen = {};
    try {
      chosen = JSON.parse(localStorage.getItem("chosenSlot") || "{}");
    } catch {}

    
    const cleanTime = (chosen.time || "")
      .toString()
      .trim()
      .replace(/\s*Uhr$/i, "");

    
    const serviceValue =
      data?.service ||
      localStorage.getItem("service") ||
      localStorage.getItem("treatment_type") ||
      "";

    const serviceLabel =
      data?.service_label || localStorage.getItem("service_label") || "";

    const payload = {
      full_name: `${form.first_name} ${form.last_name}`.trim(),
      email: form.email || null,
      phone: form.phone || null,
      service: serviceValue,
      appointment_date: chosen.date || null, 
      appointment_time: cleanTime || null, 
      note: form.note || null,
    };

    
    if (!payload.appointment_date || !payload.appointment_time) {
      alert("Bitte wählen Sie Datum und Uhrzeit im Schritt 7.");
      navigate("/step7");
      return;
    }
    if (!payload.full_name || !payload.phone) {
      alert("Bitte füllen Sie Name und Telefon aus.");
      return;
    }

    
    const address = [
      form.street,
      [form.zip, form.city].filter(Boolean).join(" "),
    ]
      .filter(Boolean)
      .join(", ");

    localStorage.setItem("personalData", JSON.stringify(form));
    localStorage.setItem(
      "booking_preview",
      JSON.stringify({
        ...payload,
        first_name: form.first_name,
        last_name: form.last_name,
        street: form.street,
        zip: form.zip,
        city: form.city,
        address,
        service_label: serviceLabel,
      })
    );

    
    try {
      const api = import.meta.env.VITE_API_URL || "http://localhost:4000";
      console.log("Submitting booking payload:", payload);

      const { data: res } = await axios.post(
        `${api}/api/appointments`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res?.success) {
        navigate("/step9", { state: { bookingId: res.bookingId } });
      } else {
        console.error("Server not success:", res);
        alert(res?.error || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error saving appointment:", error?.response?.data || error);
      alert(error?.response?.data?.error || "Failed to book appointment.");
    }
  };

  return (
    <div className="step step8">
      <header className="header">
        <img
          src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Header"
          className="header-image"
        />
      </header>

      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>

      <div className="steps-wrapper">
        <div className="step-circle completed">
          <i className="fas fa-question" />
        </div>
        <div className="line" />
        <div className="step-circle completed">
          <i className="fas fa-calendar-alt" />
        </div>
        <div className="line" />
        <div className="step-circle active">
          <i className="fas fa-pen" />
        </div>
        <div className="line" />
        <div className="step-circle">
          <i className="fas fa-eye" />
        </div>
        <div className="line" />
        <div className="step-circle">
          <i className="fas fa-check" />
        </div>
      </div>

      <main className="container">
        <section className="panel">
          <div className="panel-title">
            <span>8. Persönliche Daten</span>
          </div>
          <p className="panel-hint">
            Die mit einem <strong>*</strong> gekennzeichneten Felder sind
            Pflicht.
          </p>

          {chosenSummary && (
            <div id="chosen-summary" className="mini-summary" aria-live="polite">
              {chosenSummary}
            </div>
          )}

          
          <form
            id="personal-form"
            className="personal-form"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <label htmlFor="salutation">Anrede</label>
              <select
                id="salutation"
                name="salutation"
                value={form.salutation}
                onChange={onChange}
              >
                <option value="">bitte wählen</option>
                <option value="Frau">Frau</option>
                <option value="Herr">Herr</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="first_name">Vorname *</label>
              <input
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={onChange}
              />
              {errors.first_name && (
                <span className="error">{errors.first_name}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="last_name">Nachname *</label>
              <input
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={onChange}
              />
              {errors.last_name && (
                <span className="error">{errors.last_name}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="street">Straße *</label>
              <input
                id="street"
                name="street"
                value={form.street}
                onChange={onChange}
              />
              {errors.street && (
                <span className="error">{errors.street}</span>
              )}
            </div>

            <div className="form-row two">
              <div>
                <label htmlFor="zip">PLZ *</label>
                <input
                  id="zip"
                  name="zip"
                  maxLength={5}
                  inputMode="numeric"
                  value={form.zip}
                  onChange={onChange}
                />
                {errors.zip && <span className="error">{errors.zip}</span>}
              </div>
              <div>
                <label htmlFor="city">Ort *</label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={onChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="phone">Telefon *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="email">E-Mail Adresse *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="note">Bemerkung</label>
              <textarea
                id="note"
                name="note"
                rows={4}
                value={form.note}
                onChange={onChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="reminder_email">
                Terminerinnerung per E-Mail *
              </label>
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
              {errors.reminder_email && (
                <span className="error">{errors.reminder_email}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="reminder_sms">
                Terminerinnerung per SMS *
              </label>
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
              {errors.reminder_sms && (
                <span className="error">{errors.reminder_sms}</span>
              )}
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
                {" "}
                Ich akzeptiere die Datenschutzhinweise.
              </label>
              {errors.privacy && (
                <span className="error">{errors.privacy}</span>
              )}
            </div>

            <div className="button-row">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => navigate("/step7")}
              >
                « Zurück
              </button>
              <button type="submit" className="btn btn-light">
                Weiter »
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}