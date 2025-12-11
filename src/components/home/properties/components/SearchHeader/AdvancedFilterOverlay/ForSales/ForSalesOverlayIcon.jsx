// src/components/home/properties/components/SearchHeader/AdvancedFilterOverlay/ForSales/ForSalesOverlayIcon.jsx
import React from 'react';

const ForSalesOverlayIcon = ({ isActive, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`p-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-[#0e1f42] text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      title="Advanced sales filters"
    >
      <i className="fas fa-filter text-sm"></i>
    </button>
  );
};

export default ForSalesOverlayIcon;