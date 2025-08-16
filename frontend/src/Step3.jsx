import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style-step7.css';

export default function Step3() {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gender') || '';
    setGender(saved);
  }, []);

  const selectGender = (value) => {
    setGender(value);
    localStorage.setItem('gender', value);
  };

  return (
    <div className="step step3">
      {/* Header */}
      <header className="header">
        <img src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Header" className="header-image" />
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

      {/* Step Box */}
      <div className="step-box">
        <h2>3. Fragen zum Termin</h2>
        <p>Bitte treffen Sie eine Auswahl:</p>
        <p><strong>Welche Behandlung wünschen Sie?</strong></p>

        {/* Gender Options */}
        <div className="gender-selection">
          {/* Frau */}
          <label className="gender-option">
            <img
              src="https://th.bing.com/th?q=Haarentfernung+Laser+Karton+Bilder&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=de-DE&cc=DE&setlang=de&adlt=moderate&t=1&mw=247"
              alt="Laser Haarentfernung"
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                value="frau"
                checked={gender === ''}
                onChange={() => selectGender('')}
              />
              <span>Laser Haarentfernung</span>
            </span>
          </label>

          {/* Mann */}
          <label className="gender-option">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.gs88fSU8lbVG_4hh21vlAgHaE8?pid=ImgDet&w=184&h=122&c=7&dpr=1,3&o=7&rm=3"
              alt="Mann"
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                
                checked={gender === ''}
                onChange={() => selectGender('')}
              />
              <span>Rubey Air</span>
            </span>
          </label>
        </div>

        <div className="button-row">
              <button type="button" className="btn btn-light" onClick={() => navigate("/step2")}>
                « Zurück
              </button>
              <button type="button" className="btn btn-light" onClick={() => navigate("/step4")}>
                Weiter » 
              </button> 
            </div>
      </div>
    </div>
  );
}