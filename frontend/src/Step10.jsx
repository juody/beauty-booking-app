import React, { useEffect, useState } from "react";
import "./style-step7.css";

export default function Step10() {
  const [summary, setSummary] = useState({ date: "", time: "" });

  useEffect(() => {
    const get = (k) => localStorage.getItem(k) || "";
    setSummary({ date: get("date"), time: get("time") });
  }, []);

  return (
    
    <div className="step10">
      <div className="confirm-box"> 

       <h1>Terminbuchung – Laser Couture Hamburg</h1>

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
      
      <h2>Vielen Dank für Terminbuchung</h2>
        
        <h2>Termin:</h2>
        <p className="term">
          <strong>
            {summary.date} {summary.time}
          </strong>
        </p>
        <p className="studio">bei</p>
        <h3>Laser Couture Hamburg</h3>
        <p className="addr">
          Frickestraße 49
          <br />
          20251 Hamburg (Eppendorf)
        </p>

        <p className="contact">
          <a href="mailto:lasercouturehamburg@gmail.com">
            lasercouturehamburg@gmail.com
          </a>
          <br />
          <strong>Eppendorf:</strong> 040 50691193
          <br />
          <strong>Wandsbek:</strong> 040 37085159
        </p>

        <div className="note">
          <strong> Bitte erscheinen Sie pünktlich 
            zu Ihrem Termin, nicht zu früh und nicht zu spät. 
            Bei größerer Verspätung können wir die Behandlung nicht mehr durchführen.
             Bitte bringen sie keine Begleitpersonen mit.</strong>
          <br />

        </div>
      </div>
    </div>
  );
}