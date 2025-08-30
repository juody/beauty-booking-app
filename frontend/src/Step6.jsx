import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step6() {
  const navigate = useNavigate();

  
  return (
    <div>
      <header className="header">
        <img src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Header Image" className="header-image" />
      </header>

      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>


      <div className="steps-wrapper">
        <div className="step-circle completed">
          <i className="fas fa-question" />
        </div>
        <div className="line" />
        <div className="step-circle active">
          <i className="fas fa-calendar-alt" />
        </div>
        <div className="line" />
        <div className="step-circle">
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

      <div className="step-box">
        <h2>6. Fragen zum Termin</h2>
        <p>Bitte treffen Sie eine Auswahl:</p>
         <p><strong>Bitte wählen Sie Ihren Figur-Typ (dient der Berechnung der Behandlungszeit):</strong></p>


        <label><input type="radio" name="visited" value="" /> Korpulent</label>
        <br />
        <label><input type="radio" name="visited" value="" /> Normal</label>

        <div className='button-row'>
          <button type="button" className="btn btn-light" onClick={() => navigate("/step5")}>
          « Zurück
          </button>


        <button type="button" className="btn btn-light" onClick={() => navigate("/step7")}>
          Weiter »
        </button>
        </div>
       
       
      </div>
    </div>
  );
}