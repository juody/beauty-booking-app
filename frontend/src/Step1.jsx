import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Step1() {
  const navigate = useNavigate();
 
  return (
    <div>
      <header className="header">
        <img src="/images/header.jpg" alt="Header Image" className="header-image" />
      </header>

      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>

      {/* Steps Navigation */}
      <div className="steps-wrapper">
        <div className="step-circle">?<i className="fas fa-question" /></div>
        <div className="line" />
        <div className="step-circle active">🗒️<i className="fas fa-calendar-alt" /></div>
        <div className="line" />
        <div className="step-circle">🖌️<i className="fas fa-pen" /></div>
        <div className="line" />
        <div className="step-circle">👁<i className="fas fa-eye" /></div>
        <div className="line" />
        <div className="step-circle">✔<i className="fas fa-check" /></div>
      </div>
      <div className="step-box">
        <h2>1. Fragen zum Termin</h2>
        <p>Waren Sie schon bei uns?</p>

        <label><input type="radio" name="visited" value="ja" /> Ja</label>
        <br />
        <label><input type="radio" name="visited" value="nein" /> Nein</label>

        <button className="next-btn" onClick={() => navigate('/step2')}>Weiter »</button>
      </div>
    </div>
  );
}