import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style-step6.css";
import axios from "axios";

// الأيام المتاحة لكل شهر (مثال)
const AVAILABLE = {
  "2025-08": [4, 7, 14, 15, 21, 28],
  "2025-09": [4, 12, 16, 18, 19, 25],
  "2025-10": [8, 9, 20, 28, 19, 5],
  "2025-11": [10, 11, 18, 21, 26],
  "2025-12": [2, 10, 13, 18, 22, 26],
};


const DEFAULT_SLOTS = ["10:00", "12:30", "13:00", "15:50", "16:30"];

export default function Step7() {
  const navigate = useNavigate();

  
  const [appointments, setAppointments] = useState([]);

  
  const [selectedTime, setSelectedTime] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chosenSlot") || "{}");
      return saved.time || null;
    } catch {
      return null;
    }
  });

  const [view, setView] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chosenSlot") || "{}");
      if (saved.date) {
        const [y, m] = saved.date.split("-").map(Number);
        return { year: y, month: m - 1 };
      }
    } catch {}
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() };
  });

  
  const [selectedDate, setSelectedDate] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chosenSlot") || "{}");
      return saved.date ? new Date(`${saved.date}T00:00:00`) : null;
    } catch {
      return null;
    }
  });

  
  function toISODate(d) {
    if (!d) return "";
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    if (d instanceof Date) return d.toISOString().slice(0, 10);
    return String(d).slice(0, 10);
  }

  function bookedTimesFor(isoDate) {
    const set = new Set();
    appointments.forEach((a) => {
      const adate = toISODate(a.date || a.appointment_date || a.appointmentDate);
      const atime = a.time || a.appointment_time || a.timeSlot;
      if (adate === isoDate && atime) set.add(atime);
    });
    return set;
  }

  const isoSelected =
    selectedDate instanceof Date ? selectedDate.toISOString().slice(0, 10) : "";

  const booked = useMemo(
    () => (isoSelected ? bookedTimesFor(isoSelected) : new Set()),
    [isoSelected, appointments]
  );

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/appointments")
      .then((res) => setAppointments(res.data || []))
      .catch(() => setAppointments([])); 
  }, []);

  
  const { startIndex, daysInMonth, availSet, monthLabel } = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startIdx = (first.getDay() + 6) % 7; 
    const dim = new Date(view.year, view.month + 1, 0).getDate();
    const key = `${view.year}-${String(view.month + 1).padStart(2, "0")}`;
    const set = new Set(AVAILABLE[key] || []);
    const label = first.toLocaleDateString("de-DE", {
      month: "long",
      year: "numeric",
    });
    return { startIndex: startIdx, daysInMonth: dim, availSet: set, monthLabel: label };
  }, [view]);
  
  
  function changeMonth(delta) {
    setSelectedDate(null);
    setSelectedTime(null);
    setView((v) => {
      let m = v.month + delta;
      let y = v.year;
      if (m < 0) {
        m = 11;
        y--;
      } else if (m > 11) {
        m = 0;
        y++;
      }
      return { year: y, month: m };
    });
  }

  // اختيار يوم
  function selectDay(day) {
    setSelectedDate(new Date(view.year, view.month, day));
    setSelectedTime(null);
  }

  
  function goNext() {
    if (!selectedDate || !selectedTime) {
      alert("Bitte wählen Sie ein Datum und eine Uhrzeit.");
      return;
    }
    const isoDate = selectedDate.toISOString().slice(0, 10);
    const payload = { date: isoDate, time: selectedTime };

    
    localStorage.setItem("chosenSlot", JSON.stringify(payload));
    localStorage.setItem("date", isoDate);
    localStorage.setItem("time", selectedTime);

    navigate("/step8");
  }

  
  return (
    <div className="step5-wrap">
      <header className="header">
        <img
          src="https://th.bing.com/th/id/OIP.R4iLvoqIuyklcih8jVTBxwAAAA?w=143&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Header"
          className="header-image"
        />
      </header>

      <h1 className="title">Terminbuchung – Laser Couture Hamburg</h1>


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

      <div className="panel">
        <div className="panel-head">
          <h2>7. Terminauswahl</h2>
          <p>Bitte wählen Sie den für Sie passenden Termin aus.</p>
        </div>

        <div className="calendar-card">
          <div className="calendar-head">
            <button onClick={() => changeMonth(-1)} aria-label="Prev">‹</button>
            <div className="month-label">{monthLabel}</div>
            <button onClick={() => changeMonth(+1)} aria-label="Next">›</button>
          </div>

          <div className="calendar-grid">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((w) => (
              <div key={w} className="weekday">{w}</div>
            ))}

            {Array.from({ length: startIndex }).map((_, i) => (
              <div key={`pad-${i}`} className="day muted" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isFree = availSet.has(day);
              const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === view.year &&
                selectedDate.getMonth() === view.month &&
                selectedDate.getDate() === day;

              return (
                <button
                  key={day}
                  type="button"
                  className={["day", isFree ? "free" : "", isSelected ? "selected" : ""]
                    .join(" ")
                    .trim()}
                  disabled={!isFree}
                  onClick={() => isFree && selectDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="legend">
            <span><i className="legend-box free" /> Freie Termine</span>
            <span><i className="legend-box selected" /> Ausgewählter Tag</span>
          </div>

          <div className="slots">
            <div className="slots-title">
              Freie Termine für{" "}
              <b>
                {selectedDate
                  ? selectedDate.toLocaleDateString("de-DE", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </b>
            </div>

            <div className="slot-list">
              {selectedDate ? (
                DEFAULT_SLOTS.map((t) => {
                  const isDisabled = booked.has(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={isDisabled}
                      className={
                        "slot" +
                        (t === selectedTime ? " active" : "") +
                        (isDisabled ? " disabled" : "")
                      }
                      onClick={() => !isDisabled && setSelectedTime(t)}
                    >
                      {t} {isDisabled ? "(bereits belegt)" : ""}
                    </button>
                  );
                })
              ) : (
                <div className="slot-hint">Bitte zuerst ein Datum wählen.</div>
              )}
            </div>
          </div>
        </div>

        <div className="buttons">
          <button type="button" className="btn btn-light" onClick={() => navigate("/step6")}>
            « Zurück
          </button>
          <button type="button" className="btn btn-light" onClick={goNext}>
            Weiter »
          </button>
        </div>
      </div>
    </div>
  );
}