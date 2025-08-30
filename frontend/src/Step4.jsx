import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style-step4.css'; 

export default function Step4() {
  const navigate = useNavigate();
  const [rubyOption, setRubyOption] = useState('');


  useEffect(() => {
    const saved = localStorage.getItem('ruby') || '';
    setRubyOption(saved);
  }, []);

  // حفظ الاختيار
  const onChoose = (value) => {
    setRubyOption(value);
    localStorage.setItem('ruby', value);
  };

  return (
     <div className="step step4">
      {/* Header */}
      <header className="header">
        <img src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Header" className="header-image" />
      </header>

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


      <section className="step-box">
        <h2>4. Fragen zum Termin</h2>
        <p>Bitte treffen Sie eine Auswahl:</p>

        <div className="description">
          <strong>RUBY AIR:</strong>
          <p>
            Das Ruby Air wurde entwickelt, um hochfrequente Stromfunken von der aktiven Elektrode zu erzeugen.
            Diese ionisieren Luftgase und erzeugen Stickstoffmonoxid, wodurch die oberste Hautschicht bearbeitet
            wird und eine schonende Hauterneuerung möglich ist – ohne Nadeln oder schmerzhafte Behandlungen.
          </p>
        </div>

        <form className="treatments" onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              type="radio"
              name="ruby"
              value="mit-augenlid"
              checked={rubyOption === 'mit-augenlid'}
              onChange={() => onChoose('mit-augenlid')}
            />
            Gesicht komplett mit Augenlid
            <br />
            <small>1 Sitzung • 90 min • 180€</small>
          </label>
          <br /><br />

          <label>
            <input
              type="radio"
              name="ruby"
              value="ohne-augenlid"
              checked={rubyOption === 'ohne-augenlid'}
              onChange={() => onChoose('ohne-augenlid')}
            />
            Gesicht komplett ohne Augenlid
            <br />
            <small>1 Sitzung • 80 min • 150€</small>
          </label>
          <br /><br />

          <label>
            <input
              type="radio"
              name="ruby"
              value="traenensaecke"
              checked={rubyOption === 'traenensaecke'}
              onChange={() => onChoose('traenensaecke')}
            />
            Augenlid mit Tränensäcken
            <br />
            <small>1 Sitzung • 60 min • 100€</small>
          </label>
          <br /><br />

          <label>
            <input
              type="radio"
              name="ruby"
              value="aknenarben"
              checked={rubyOption === 'aknenarben'}
              onChange={() => onChoose('aknenarben')}
            />
            Gesichtsnarben (Aknenarben)
            <br />
            <small>1 Sitzung • 60 min • 100€</small>
          </label>
          <br /><br />

          <label>
            <input
              type="radio"
              name="ruby"
              value="dehnungsstreifen"
              checked={rubyOption === 'dehnungsstreifen'}
              onChange={() => onChoose('dehnungsstreifen')}
            />
            Dehnungsstreifen, Bauch, Beine, Po, Rücken
            <br />
            <small>1 Sitzung • 80 min • 200€</small>
          </label>
          <br /><br />

          <label>
            <input
              type="radio"
              name="ruby"
              value="kleine-narben"
              checked={rubyOption === 'kleine-narben'}
              onChange={() => onChoose('kleine-narben')}
            />
            Einzelne Narben klein
            <br />
            <small>1 Sitzung • 25 min • 60€</small>
          </label>

              <div className="button-row">
                <button type="button" className="btn btn-light" onClick={() => navigate("/step3")}>
                  « Zurück
                </button>
                <button type="button" className="btn btn-light" onClick={() => navigate("/step5")}>
                  Weiter »
                </button>
              </div>
             </form>
               </section>

              


    </div>
  );
}