// src/components/home/properties/components/SearchHeader/AdvancedFilterOverlay/ForSales/ForSalesOverlay.jsx
import React from 'react';
import HorizontalScroll from './components/HorizontalScroll';
import PriceSlider from './components/PriceSlider';
import BedroomCheckboxes from './components/BedroomCheckboxes';
import BathroomCheckboxes from './components/BathroomCheckboxes';
// import PropertyTypeMultiSelect from './components/PropertyTypeMultiSelect';
import AmenitiesGrid from './components/AmenitiesGrid';
// import ParkingSpaces from './components/ParkingSpaces';
import PropertyAgeSelect from './components/PropertyAgeSelect';
// import LandSizeSlider from './components/LandSizeSlider';
// import YearBuiltFilter from './components/YearBuiltFilter';

const ForSalesOverlay = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters
}) => {
  if (!isOpen) return null;

  return (
    <div className="advanced-filter-overlay fixed inset-0 z-50 bg-white flex flex-col md:static md:w-full md:border-t md:border-gray-200 md:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-bold text-[#0e1f42]">
            <i className="fas fa-filter mr-2 text-[#0e1f42]"></i>
            Advanced Sales Filters
          </h3>
          <p className="text-sm text-gray-600 hidden md:block">
            Select multiple options to narrow your search for properties to buy
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <i className="fas fa-times text-xl text-gray-700"></i>
        </button>
      </div>
      
      {/* Mobile Stack */}
      <div className="px-4 py-4 space-y-6 overflow-y-auto md:hidden">
        <PriceSlider
          min={filters.priceMin || 0}
          max={filters.priceMax || 10000000}
          onPriceChange={(min, max) => onFilterChange({ priceMin: min, priceMax: max })}
        />
        
        <BedroomCheckboxes
          selected={filters.bedrooms || []}
          onChange={(bedrooms) => onFilterChange({ bedrooms })}
        />

        <BathroomCheckboxes
          selected={filters.bathrooms || []}
          onChange={(bathrooms) => onFilterChange({ bathrooms })}
        />
        
        <AmenitiesGrid
          selected={filters.amenities || []}
          onToggle={(amenityId) => {
            const current = filters.amenities || [];
            const newAmenities = current.includes(amenityId)
              ? current.filter(id => id !== amenityId)
              : [...current, amenityId];
            onFilterChange({ amenities: newAmenities });
          }}
        />
        
        <PropertyAgeSelect
          age={filters.propertyAge || ''}
          onChange={(propertyAge) => onFilterChange({ propertyAge })}
        />
      </div>

      {/* Horizontal Scroll Area (Desktop) */}
      <div className="px-6 py-4 hidden md:block">
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
            <BathroomCheckboxes
              selected={filters.bathrooms || []}
              onChange={(bathrooms) => onFilterChange({ bathrooms })}
            />
          </div>
          
          <div className="filter-section min-w-[200px] p-4">
            {/* <PropertyTypeMultiSelect
              selected={filters.propertyTypes || []}
              onChange={(propertyTypes) => onFilterChange({ propertyTypes })}
            /> */}
          </div>
          
          <div className="filter-section min-w-[220px] p-4">
            <AmenitiesGrid
              selected={filters.amenities || []}
              onToggle={(amenityId) => {
                const current = filters.amenities || [];
                const newAmenities = current.includes(amenityId)
                  ? current.filter(id => id !== amenityId)
                  : [...current, amenityId];
                onFilterChange({ amenities: newAmenities });
              }}
            />
          </div>
          
          <div className="filter-section min-w-[180px] p-4">
            {/* <ParkingSpaces
              spaces={filters.parkingSpaces || 0}
              onChange={(parkingSpaces) => onFilterChange({ parkingSpaces })}
            /> */}
          </div>
          
          <div className="filter-section min-w-[200px] p-4">
            <PropertyAgeSelect
              age={filters.propertyAge || ''}
              onChange={(propertyAge) => onFilterChange({ propertyAge })}
            />
          </div>

          <div className="filter-section min-w-[220px] p-4">
            {/* <LandSizeSlider
              min={filters.landSizeMin || 0}
              max={filters.landSizeMax || 1000}
              onSizeChange={(min, max) => onFilterChange({ landSizeMin: min, landSizeMax: max })}
            /> */}
          </div>

          <div className="filter-section min-w-[200px] p-4">
            {/* <YearBuiltFilter
              year={filters.yearBuilt || ''}
              onChange={(yearBuilt) => onFilterChange({ yearBuilt })}
            /> */}
          </div>
        </HorizontalScroll>
      </div>
      
      {/* Action Buttons (Mobile) */}
      <div className="mt-auto px-4 py-3 border-t border-gray-200 bg-white flex gap-3 md:hidden">
        <button
          onClick={onClearFilters}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
        >
          Clear
        </button>
        <button
          onClick={onApplyFilters}
          className="flex-1 px-4 py-2.5 bg-[#0e1f42] text-white rounded-lg hover:bg-[#1a2d5f] font-medium"
        >
          Apply
        </button>
      </div>

      {/* Action Buttons (Desktop) */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 hidden md:flex justify-between">
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
            className="px-5 py-2.5 bg-[#0e1f42] text-white rounded-lg hover:bg-[#1a2d5f] font-medium"
          >
            <i className="fas fa-check mr-2"></i>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForSalesOverlay;
