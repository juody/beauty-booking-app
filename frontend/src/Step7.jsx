import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style-step6.css";            // استخدم ملف CSS الذي لديك
import axios from "axios";

/* Available days per month (edit as you like) */
const AVAILABLE = {
  "2025-08": [4, 7, 14, 15, 21, 28],
  "2025-09": [4, 12, 16, 18, 19, 25],
  "2025-10": [8, 9, 20, 28, 19],
  "2025-11": [10, 11, 18, 21, 26],
  "2025-12": [2, 10, 13, 18, 22, 26],
};

/* Default time slots per day */
const DEFAULT_SLOTS = ["10:00", "12:30", "13:00", "15:50", "16:30"];

export default function Step7() {
  const navigate = useNavigate();

  // ---- state ----
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState(() => {
    const saved = localStorage.getItem("chosenSlot");
    if (saved) {
      try {
        const { time } = JSON.parse(saved);
        return time || null;
      } catch {}
    }
    return null;
  });

  // calendar view (month/year)
  const [view, setView] = useState(() => {
    const saved = localStorage.getItem("chosenSlot");
    if (saved) {
      try {
        const { date } = JSON.parse(saved); // YYYY-MM-DD
        const [y, m] = date.split("-").map(Number);
        return { year: y, month: m - 1 }; // month index
      } catch {}
    }
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() };
  });

  // selected date object
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("chosenSlot");
    if (saved) {
      try {
        const { date } = JSON.parse(saved); // YYYY-MM-DD
        return new Date(`${date}T00:00:00`);
      } catch {}
    }
    return null;
  });

  // ---- helpers (outside useEffect) ----
  function toISODate(d) {
    if (!d) return "";
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    if (d instanceof Date) return d.toISOString().slice(0, 10);
    const m = String(d).match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
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
    selectedDate
      ? toISODate(selectedDate instanceof Date ? selectedDate : new Date(selectedDate))
      : "";

  const booked = useMemo(
    () => (isoSelected ? bookedTimesFor(isoSelected) : new Set()),
    [isoSelected, appointments]
  );

  // ---- fetch from API ----
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  // ---- calendar calculations for current month ----
  const { startIndex, daysInMonth, availSet, monthLabel } = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startIdx = (first.getDay() + 6) % 7; // Monday-first
    const dim = new Date(view.year, view.month + 1, 0).getDate();
    const key = `${view.year}-${String(view.month + 1).padStart(2, "0")}`;
    const set = new Set(AVAILABLE[key] || []);
    const label = first.toLocaleDateString("de-DE", {
      month: "long",
      year: "numeric",
    });
    return { startIndex: startIdx, daysInMonth: dim, availSet: set, monthLabel: label };
  }, [view]);

  // ---- handlers ----
  function changeMonth(delta) {
    setSelectedDate(null);
    setSelectedTime(null);
    setView((v) => {
      let m = v.month + delta;
      let y = v.year;
      if (m < 0) {
        m = 11;
        y--;
      }
      if (m > 11) {
        m = 0;
        y++;
      }
      return { year: y, month: m };
    });
  }

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
    localStorage.setItem("chosenSlot", JSON.stringify({ date: isoDate, time: selectedTime }));
    localStorage.setItem("date", isoDate);
    localStorage.setItem("time", selectedTime);
    navigate("/step8"); // next step
  }

  // ---- UI ----
  return (
    <div className="step5-wrap">
      <h1 className="title">Terminbuchung – Laser Couture Hamburg</h1>

      <div className="steps-wrapper">
        <div className="step-circle">?</div>
        <div className="line" />
        <div className="step-circle active">📅</div>
        <div className="line" />
        <div className="step-circle">✏️</div>
        <div className="line" />
        <div className="step-circle">👁</div>
        <div className="line" />
        <div className="step-circle">✔</div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>7. Terminauswahl</h2>
          <p>Bitte wählen Sie den für Sie passenden Termin aus.</p>
        </div>

        <div className="calendar-card">
          <div className="calendar-head">
            <button onClick={() => changeMonth(-1)} aria-label="Prev">
              ‹
            </button>
            <div className="month-label">{monthLabel}</div>
            <button onClick={() => changeMonth(+1)} aria-label="Next">
              ›
            </button>
          </div>

          <div className="calendar-grid">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((w) => (
              <div key={w} className="weekday">
                {w}
              </div>
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
            <span>
              <i className="legend-box free" /> Freie Termine
            </span>
            <span>
              <i className="legend-box selected" /> Ausgewählter Tag
            </span>
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

       <button type="button" className="btn btn-light" onClick={() => navigate("/step8")}>
         Weiter »
       </button>
        </div>
      </div>
    </div>
  );
}