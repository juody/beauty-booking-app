
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Step9() {
  const navigate = useNavigate();

  
  const get = (k) => localStorage.getItem(k) || "";

  
  const data = useMemo(() => {
    let preview = {};
    try { preview = JSON.parse(localStorage.getItem("booking_preview") || "{}"); } catch {}

    let chosen = {};
    try { chosen = JSON.parse(localStorage.getItem("chosenSlot") || "{}"); } catch {}

    
    const date =
      preview.appointment_date || chosen.date || get("date") || "";
    const timeRaw =
      preview.appointment_time || chosen.time || get("time") || "";
    const time = timeRaw.toString().trim().replace(/\s*Uhr$/i, "");

    const service =
      preview.service_label || preview.service ||
      get("service_label") || get("treatment_type") || get("treatment") || "";

    const first = preview.first_name || get("first_name") || "";
    const last  = preview.last_name  || get("last_name")  || "";
    const fullName =
      preview.full_name || get("name") || [first, last].filter(Boolean).join(" ");

    const email = preview.email || get("email") || "";
    const phone = preview.phone || get("phone") || "";

    const address =
      preview.address ||
      get("address") ||
      [preview.street || get("street"),
       [preview.zip || get("zip"), preview.city || get("city")].filter(Boolean).join(" ")
      ].filter(Boolean).join(", ");

    const note = preview.note || get("note") || "";

    return { date, time, service, fullName, email, phone, address, note };
  }, []);


  const deDate = data.date
    ? new Date(`${data.date}T00:00:00`).toLocaleDateString("de-DE", {
        weekday: "long", day: "2-digit", month: "long", year: "numeric",
      })
    : "—";
  const prettyTime = data.time
    ? data.time.replace(/:00$/, "") + " Uhr"
    : "";

  return (
    <div className="step9 page">
      <header className="header">
        <h1>Terminbuchung – Laser Couture Hamburg</h1>
      </header>

    
      <div className="steps-wrapper">
        <div className="step-circle completed"><i className="fas fa-question" /></div>
        <div className="line" />
        <div className="step-circle completed"><i className="fas fa-calendar-alt" /></div>
        <div className="line" />
        <div className="step-circle completed"><i className="fas fa-pen" /></div>
        <div className="line" />
        <div className="step-circle active"><i className="fas fa-eye" /></div>
        <div className="line" />
        <div className="step-circle"><i className="fas fa-check" /></div>
      </div>

      <h2 className="card__title">9. Prüfen &amp; Buchen</h2>

      <section className="step-box">
        <p className="card__text">
          Bitte prüfen Sie Ihre Angaben und klicken Sie dann auf „Weiter“. <br />
          Anschließend erhalten Sie eine Bestätigungsmail. Der Versand der E-Mail erfolgt unverschlüsselt.
        </p>
      </section>

      <section className="step-box">
        <h3>Übersicht</h3>
        <dl>
          <dt>Termin:</dt>
          <dd>
            {deDate} {prettyTime}
          </dd>

          <dt>Behandlung:</dt>
          <dd>{data.service || "—"}</dd>

          <dt>Kunde:</dt>
          <dd>{data.fullName || "—"}</dd>

          <dt>E-Mail:</dt>
          <dd>{data.email || "—"}</dd>

          <dt>Telefon:</dt>
          <dd>{data.phone || "—"}</dd>

          <dt>Adresse:</dt>
          <dd>{data.address || "—"}</dd>

          <dt>Bemerkung:</dt>
          <dd>{data.note || "—"}</dd>
        </dl>
        <div className="button-row">
          <button type="button" className="btn btn-light" onClick={() => navigate("/step8")}>
            « Zurück
          </button>
          <button type="button" className="btn btn-light" onClick={() => navigate("/step10")}>
            Weiter »
          </button>
        </div>
      </section>

      
    </div>
  );
}