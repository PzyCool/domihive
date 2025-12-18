// src/components/auth/forms/ProgressSteps.jsx
import React from 'react';

const ProgressSteps = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "OTP Verification" },
    { number: 3, label: "Profile Setup" },
  ];

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        {steps.map((stepItem, index) => (
          <React.Fragment key={stepItem.number}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                currentStep === stepItem.number
                  ? "bg-[#9F7539] text-white"
                  : currentStep > stepItem.number
                  ? "bg-[#9F7539] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {currentStep > stepItem.number ? (
                <i className="fas fa-check"></i>
              ) : (
                stepItem.number
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 lg:w-16 h-1.5 rounded-full ${
                  currentStep > stepItem.number ? "bg-[#9F7539]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-3 px-2">
        {steps.map((stepItem) => (
          <span
            key={stepItem.number}
            className={`text-sm font-medium ${
              currentStep >= stepItem.number ? "text-[#9F7539]" : "text-gray-400"
            }`}
          >
            {stepItem.label}
          </span>
        ))}
      </div>
    </>
  );
};

export default ProgressSteps;