import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style-step7.css';

export default function Step2() {
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
    <div className="step step2">
      {/* Header */}
      <header className="header"></header>
      <img src="/images/header.jpg" alt="Header Image" className="header-image" />
      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>

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

      {/* Step Box */}
      <div className="step-box">
        <h2>2. Fragen zum Termin</h2>
        <p>Bitte treffen Sie eine Auswahl:</p>
        <p><strong>Sind Sie:</strong></p>

        {/* Gender Options */}
        <div className="gender-selection">
          {/* Frau */}
          <label className="gender-option">
            <img
              src="https://th.bing.com/th/id/OIP.YT7-UjrRF5AHFeyI-aA46QHaKm?w=208&h=299&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Frau"
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                value="frau"
                checked={gender === 'frau'}
                onChange={() => selectGender('frau')}
              />
              <span>Frau</span>
            </span>
          </label>

          {/* Mann */}
          <label className="gender-option">
            <img
              src="https://th.bing.com/th/id/OIP.WN1yNUyAZENlQu6EDjBnOgHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Mann"
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                value="mann"
                checked={gender === 'mann'}
                onChange={() => selectGender('mann')}
              />
              <span>Mann</span>
            </span>
          </label>
        </div>

         <div className="button-row">
              <button type="button" className="btn btn-light" onClick={() => navigate("/step1")}>
                « Zurück
              </button>
              <button type="button" className="btn btn-light" onClick={() => navigate("/step3")}>
                Weiter »
              </button>
            </div>
      </div>
    </div>
  );
}