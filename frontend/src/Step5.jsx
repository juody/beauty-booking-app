import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style-step7.css';

export default function Step5() {
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
    <div className="step step5">
      {/* Header */}
      <header className="header">
        <img src="" alt="Header" className="header-image" />
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

      
      <div className="step-box">
        <h2>5. Fragen zum Termin</h2>
        <p>Bitte treffen Sie eine Auswahl:</p>
        <p><strong>Bei wem möchten Sie einen Termin buchen?</strong></p>

       
        <div className="gender-selection">
          <label className="gender-option">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.SzDc8rPlAVUSha2NvJ2hSgHaLF?pid=ImgDet&w=184&h=276&c=7&dpr=1,3&o=7&rm=3"
              alt=""
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                value=""
                checked={gender === ''}
                onChange={() => selectGender('')}
              />
              <span>Asala</span>
            </span>
          </label>
          <label className="gender-option">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.sZ_8OiibBoZLW5c5xHNxNgHaJz?pid=ImgDet&w=184&h=244&c=7&dpr=1,3&o=7&rm=3"
              alt=""
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                
                checked={gender === ''}
                onChange={() => selectGender('')}
              />
              <span>Lina</span>
            </span>
          </label>
        </div>


                <div className="gender-selection">
          <label className="gender-option">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.Ll-LHldYqvH2SGKOy26_nQHaL-?pid=ImgDet&w=184&h=297&c=7&dpr=1,3&o=7&rm=3"
              alt=""
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                value=""
                checked={gender === ''}
                onChange={() => selectGender('')}
              />
              <span>Ayle</span>
            </span>
          </label>
          <label className="gender-option">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.QtX-1Q_RRbvhC8o9SPK20AHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1,3&o=7&rm=3"
              alt=""
              className="gender-image"
            />
            <span className="option-caption">
              <input
                type="radio"
                name="gender"
                
                checked={gender === ''}
                onChange={() => selectGender('')}
              />
              <span>Anaa</span>
            </span>
          </label>
        </div>

         <div className="button-row">
              <button type="button" className="btn btn-light" onClick={() => navigate("/step4")}>
                « Zurück
              </button>
              <button type="button" className="btn btn-light" onClick={() => navigate("/step6")}>
                Weiter »
              </button>
            </div>
          </div>
          
         </div>
       );
}