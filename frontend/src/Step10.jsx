import React, { useEffect, useState } from "react";
import "./style-step7.css";

export default function Step10() {
  const [data, setData] = useState({
    appointment_date: "",
    appointment_time: "",
    service: "",
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("booking_preview") || "{}");
      setData({
        appointment_date:
          saved.appointment_date || localStorage.getItem("date") || "",
        appointment_time:
          saved.appointment_time || localStorage.getItem("time") || "",
        service:
          saved.service ||
          localStorage.getItem("treatment_type") ||
          localStorage.getItem("treatment") ||
          "",
      });
    } catch {}
  }, []);

  const deDate = data.appointment_date
    ? new Date(data.appointment_date + "T00:00:00").toLocaleDateString(
        "de-DE",
        { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
      )
    : "—";

  
  const prettyTime = (data.appointment_time || "")
    .toString()
    .trim()
    .replace(/\s*Uhr$/i, "")
    .replace(/:00$/, ""); 

  return (
    <div className="step10">
      <header className="header">
        <img
          src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Header"
          className="header-image"
        />
      </header>

      <div className="confirm-box">
        <h1>Terminbuchung – Laser Couture Hamburg</h1>

        <div className="steps-wrapper">
          <div className="step-circle completed"><i className="fas fa-question" /></div>
          <div className="line" />
          <div className="step-circle completed"><i className="fas fa-calendar-alt" /></div>
          <div className="line" />
          <div className="step-circle completed"><i className="fas fa-pen" /></div>
          <div className="line" />
          <div className="step-circle completed"><i className="fas fa-eye" /></div>
          <div className="line" />
          <div className="step-circle active"><i className="fas fa-check" /></div>
        </div>

        <h2>Vielen Dank für Terminbuchung</h2>

        
        <p className="step-box" style={{ fontWeight: 600 }}>
          <strong>Termin:</strong> {deDate}
        </p>
        
        {prettyTime && (
          <p className="step-box time">{prettyTime} Uhr</p>
        )}

           
      
        <p className="step-box"><strong>bei</strong></p>
        <p className="step-box">Laser Couture Hamburg</p>
        <p className="step-box">
          Frickestraße 49<br />20251 Hamburg (Eppendorf)
        </p>
        <p className="step-box">
          <a
            href="mailto:lasercouturehamburg@gmail.com"
            className="link-plain"
          >
            ✉️ lasercouturehamburg@gmail.com
          </a><br />
          <strong>Eppendorf:</strong> 040 50691193<br />
          <strong>Wandsbek:</strong> 040 37085159
           
        </p>

        <hr />
        <div className="step-box">
          <strong>
            Bitte erscheinen Sie pünktlich zu Ihrem Termin, nicht zu früh und nicht zu spät.
            Bei größerer Verspätung können wir die Behandlung nicht mehr durchführen.
            Bitte bringen Sie keine Begleitpersonen mit.
          </strong>
        </div>
      </div>
    </div>
  );
}