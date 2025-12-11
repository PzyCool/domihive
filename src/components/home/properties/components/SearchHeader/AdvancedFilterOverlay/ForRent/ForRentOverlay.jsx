// src/components/home/properties/components/SearchHeader/AdvancedFilterOverlay/ForRent/ForRentOverlay.jsx
import React from 'react';
import HorizontalScroll from './components/HorizontalScroll';
import PriceSlider from './components/PriceSlider';
import BedroomCheckboxes from './components/BedroomCheckboxes';
// import BathroomCheckboxes from './components/BathroomCheckboxes';
// import FurnishingOptions from './components/FurnishingOptions';
// import AmenitiesGrid from './components/AmenitiesGrid';
// import PetPolicyToggle from './components/PetPolicyToggle';
// import PropertyAgeSelect from './components/PropertyAgeSelect';

const ForRentOverlay = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters
}) => {
  if (!isOpen) return null;

  return (
    <div className="advanced-filter-overlay w-full bg-white border-t border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-bold text-[#0e1f42]">
            <i className="fas fa-sliders-h mr-2 text-[#9f7539]"></i>
            Advanced Rental Filters
          </h3>
          <p className="text-sm text-gray-600">
            Select multiple options to narrow your search
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <i className="fas fa-times text-xl text-gray-700"></i>
        </button>
      </div>
      
      {/* Horizontal Scroll Area */}
      <div className="px-6 py-4">
        <HorizontalScroll>
          <div className="filter-section min-w-[220px] p-4">
            <PriceSlider
              min={filters.priceMin || 0}
              max={filters.priceMax || 10000000}
              onPriceChange={(min, max) => onFilterChange({ priceMin: min, priceMax: max })}
            />
          </div>
          
          <div className="filter-section min-w-[180px] p-4">
            <BedroomCheckboxes
              selected={filters.bedrooms || []}
              onChange={(bedrooms) => onFilterChange({ bedrooms })}
            />
          </div>

          <div className="filter-section min-w-[180px] p-4">
            {/* <BathroomCheckboxes
              selected={filters.bathrooms || []}
              onChange={(bathrooms) => onFilterChange({ bathrooms })}
            /> */}
          </div>
          
          <div className="filter-section min-w-[200px] p-4">
            {/* <FurnishingOptions
              selected={filters.furnishing || ''}
              onChange={(furnishing) => onFilterChange({ furnishing })}
            /> */}
          </div>
          
          <div className="filter-section min-w-[220px] p-4">
            {/* <AmenitiesGrid
              selected={filters.amenities || []}
              onToggle={(amenityId) => {
                const current = filters.amenities || [];
                const newAmenities = current.includes(amenityId)
                  ? current.filter(id => id !== amenityId)
                  : [...current, amenityId];
                onFilterChange({ amenities: newAmenities });
              }}
            /> */}
          </div>
          
          <div className="filter-section min-w-[180px] p-4">
            {/* <PetPolicyToggle
              allowed={filters.petsAllowed || false}
              onChange={(petsAllowed) => onFilterChange({ petsAllowed })}
            /> */}
          </div>
          
          <div className="filter-section min-w-[200px] p-4">
            {/* <PropertyAgeSelect
              age={filters.propertyAge || ''}
              onChange={(propertyAge) => onFilterChange({ propertyAge })}
            /> */}
          </div>
        </HorizontalScroll>
      </div>
      
      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
        <button
          onClick={onClearFilters}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
        >
          <i className="fas fa-times mr-2"></i>
          Clear All
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
          >
            Cancel
          </button>
          
          <button
            onClick={onApplyFilters}
            className="px-5 py-2.5 bg-[#9f7539] text-white rounded-lg hover:bg-[#b58a4a] font-medium"
          >
            <i className="fas fa-check mr-2"></i>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForRentOverlay;