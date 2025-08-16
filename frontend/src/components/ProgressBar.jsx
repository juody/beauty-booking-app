import React from "react";
import "../style-step7.css"; // ملف CSS للشريط

export default function ProgressBar({ step }) {
  const steps = [1, 2, 3, 4, 5, 6, 7, 8 ,9];

  return (
    <div className="progress-bar">
      {steps.map((num) => (
        <div
          key={num}
          className={`progress-step ${step === num ? "active" : ""}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}