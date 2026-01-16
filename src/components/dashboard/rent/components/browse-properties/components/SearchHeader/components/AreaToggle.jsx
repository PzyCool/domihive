import React, { useState } from 'react';

const AREA_OPTIONS = [
  { id: 'all', label: 'All Areas', color: '#9f7539', icon: 'globe' },
  { id: 'island', label: 'Lagos Island', color: '#0e1f42', icon: 'island-tropical' },
  { id: 'mainland', label: 'Lagos Mainland', color: '#10b981', icon: 'city' }
];

const AreaToggle = ({ value = 'all', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = AREA_OPTIONS.find((option) => option.id === value) ?? AREA_OPTIONS[0];

  const handleSelect = (optionId) => {
    if (optionId !== value) {
      onChange?.(optionId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2 text-left text-sm font-medium rounded-lg border border-gray-300 bg-white shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#9f7539]/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedOption.color }}></span>
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <i className="fas fa-chevron-down text-xs text-gray-500"></i>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {AREA_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${value === option.id ? 'bg-gray-100 font-semibold' : ''}`}
            >
              <i className={`fas fa-${option.icon} text-[#9f7539] w-4`}></i>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaToggle;
