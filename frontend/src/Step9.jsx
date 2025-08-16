import React from "react";
import { useNavigate } from "react-router-dom";

export default function Step9() {
  const navigate = useNavigate();

  // Helper للقراءة من LocalStorage
  const get = (k) => localStorage.getItem(k) || "";

  // بيانات مختارة من الخطوات السابقة
  let chosen = {};
  try {
    chosen = JSON.parse(localStorage.getItem("chosenSlot") || "{}");
  } catch {}

  const date = chosen.date || get("date");
  const time = chosen.time || get("time");
  const treatment = get("treatment") || get("treatment_type");
  const fullName =
    get("name") ||
    [get("first_name"), get("last_name")].filter(Boolean).join(" ");
  const email = get("email");
  const phone = get("phone");
  const address = get("address");
  const note = get("note");

  const deDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  const handleBack = () => navigate("/step6");
  const handleNext = () => {
    // لو حابة تبعتي للباك-إند، ضيفي الطلب هون قبل الانتقال
    navigate("/step8");
  };

  return (
    <div className="step9 page">
      <header className="header">
        {/* لو عندك صورة هيدر فعّلي السطر التالي */}
        {/* <img src="/images/header.jpg" alt="Header" className="header-image" /> */}
        <h1>Terminbuchung – Laser Couture Hamburg</h1>
      </header>

             {/* Steps Navigation */}
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
      {/* بطاقة الشرح */}
      <section className="card card--primary">
        <h2 className="card__title">7. Prüfen &amp; Buchen</h2>
        <p className="card__text">
          Bitte prüfen Sie Ihre Angaben und klicken Sie dann auf „Weiter“.<br />
          Anschließend erhalten Sie eine Bestätigungsmail. Der Versand der
          E-Mail erfolgt unverschlüsselt.
        </p>
      </section>

      {/* الملخص */}
      <section className="summary">
        <h3>Übersicht</h3>
        <dl>
          <dt>Termin:</dt>
          <dd>
            {deDate} {time || ""}
          </dd>

          <dt>Behandlung:</dt>
          <dd>{treatment || "—"}</dd>

          <dt>Kunde:</dt>
          <dd>{fullName || "—"}</dd>

          <dt>E-Mail:</dt>
          <dd>{email || "—"}</dd>

          <dt>Telefon:</dt>
          <dd>{phone || "—"}</dd>

          <dt>Adresse:</dt>
          <dd>{address || "—"}</dd>

          <dt>Bemerkung:</dt>
          <dd>{note || "—"}</dd>
        </dl>
      </section>

    <div className="button-row">
     <button type="button" className="btn btn-light" onClick={() => navigate("/step8")}>
         « Zurück
     </button>
    <button type="button" className="btn btn-light" onClick={() => navigate("/step10")}>
        Weiter »
     </button>
     </div>
    </div>
  );
}