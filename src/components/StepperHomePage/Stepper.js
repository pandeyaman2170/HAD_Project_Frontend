import React, { useTransition } from "react";
import "./Stepper.css";

const Stepper = () => {
  const steps = [
    "Registration",
    "Login",
    "Apply for Consultation",
    "Get Consultation",
    "Get prescription",
  ];

  return (
    <div className="flex flex-col items-center">
      {steps?.map((step, i) => (
        <div key={i} className="step-item">
          <div className="step">
            <div className="step-number">{i + 1}</div>
            <div className="step-text">{step}</div>
          </div>
          {i < steps.length - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
