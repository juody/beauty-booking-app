
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style-step7.css";
import { useBooking } from "./context/BookingContext.js";

export default function Step3() {
  const navigate = useNavigate();
  const { data, update } = useBooking();

  
  const [service, setService] = useState(
    data.service || localStorage.getItem("service") || ""
  );

  useEffect(() => {
    // لو في قيم محفوظة مسبقاً، عرّضها بالراديو
    if (!data.service && localStorage.getItem("service")) {
      update({
        service: localStorage.getItem("service"),
        service_label: localStorage.getItem("service_label") || "",
      });
    }
  }, []); // مرة واحدة

  const handleSelect = (value, label) => {
    setService(value);
    // خزّن بالسياق
    update({ service: value, service_label: label });
    // خزّن محلياً (لعدم ضياعها عند refresh)
    localStorage.setItem("service", value);
    localStorage.setItem("service_label", label);
  };

  return (
    <div className="step step3">
      {/* Header */}
      <header className="header">
        <img
          src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Header"
          className="header-image"
        />
      </header>

      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>

      {/* شريط الخطوات */}
      <div className="steps-wrapper">
        <div className="step-circle completed"><i className="fas fa-question" /></div>
        <div className="line" />
        <div className="step-circle active"><i className="fas fa-calendar-alt" /></div>
        <div className="line" />
        <div className="step-circle"><i className="fas fa-pen" /></div>
        <div className="line" />
        <div className="step-circle"><i className="fas fa-eye" /></div>
        <div className="line" />
        <div className="step-circle"><i className="fas fa-check" /></div>
      </div>

      
      <div className="step-box">
        <h2>3. Fragen zum Termin</h2>
        <p>Bitte treffen Sie eine Auswahl:</p>
        <p><strong>Welche Behandlung wünschen Sie?</strong></p>

        
        <div className="gender-selection">
          
          <label className="gender-option">
            <img
              src="https://th.bing.com/th?q=Haarentfernung+Laser+Karton+Bilder&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=de-DE&cc=DE&setlang=de&adlt=moderate&t=1&mw=247"
              alt="Laser Haarentfernung"
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="service"
                value="laser"
                checked={service === "laser"}
                onChange={() => handleSelect("laser", "Laser Haarentfernung")}
              />
              <span>Laser Haarentfernung</span>
            </span>
          </label>

          
          <label className="gender-option">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.gs88fSU8lbVG_4hh21vlAgHaE8?pid=ImgDet&w=184&h=122&c=7&dpr=1,3&o=7&rm=3"
              alt="Rubey Air"
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="service"
                value="rubey_air"
                checked={service === "rubey_air"}
                onChange={() => handleSelect("rubey_air", "Rubey Air")}
              />
              <span>Rubey Air</span>
            </span>
          </label>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/step2")}
          >
            « Zurück
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/step4")}
            disabled={!service}
          >
            Weiter »
          </button>
        </div>
      </div>
    </div>
  );
}