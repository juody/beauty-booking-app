import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Step1() {
  const navigate = useNavigate();
 
  return (
      <div className="step step1">
      {/* Header */}
      <header className="header">
       <img src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Header" className="header-image" />
      </header>

      <h1 className="page-title">Terminbuchung – Laser Couture Hamburg</h1>

          <div className="steps-wrapper">
          <div className="step-circle active"><i className="fas fa-question" /></div>
          <div className="line" />
          <div className="step-circle"><i className="fas fa-calendar-alt" /></div>
          <div className="line" />
          <div className="step-circle"><i className="fas fa-pen" /></div>
          <div className="line" />
          <div className="step-circle"><i className="fas fa-eye" /></div>
          <div className="line" />
          <div className="step-circle"><i className="fas fa-check" /></div>
       </div> 

        <div className="step-box">
        <h2>1. Fragen zum Termin</h2>
        <p>Waren Sie schon bei uns?</p>

        <label><input type="radio" name="visited" value="ja" /> Ja</label>
        <br />
        <label><input type="radio" name="visited" value="nein" /> Nein</label>
        <div className='button-row' style={{justifyContent:'center'}}>
                <button type="button" className="btn btn-light" onClick={() => navigate('/step2')}>Weiter »</button>
        </div>
      </div>
      
    </div>
  );
}