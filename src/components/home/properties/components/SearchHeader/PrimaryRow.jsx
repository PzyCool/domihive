// src/components/home/properties/components/SearchHeader/PrimaryRow.jsx
import React from 'react';
import SearchBar from './components/SearchBar';
import FilterBadge from './components/FilterBadge';
import ViewToggle from './components/ViewToggle';
import ManagementDropdown from './components/ManagementDropdown';
import ExpandButton from './components/ExpandButton';
import ForRentOverlayIcon from './AdvancedFilterOverlay/ForRent/ForRentOverlayIcon';
import ForSalesOverlayIcon from './AdvancedFilterOverlay/ForSales/ForSalesOverlayIcon';

const PrimaryRow = ({
  filters,
  onFilterChange,
  viewType,
  onViewToggle,
  activeFiltersCount,
  isExpanded,
  onToggleExpand,
  showAdvancedFilters,
  onAdvancedToggle
}) => {
  const handleSearch = (searchQuery) => {
    onFilterChange({ searchQuery });
  };
  
  const handleViewChange = (type) => {
    if (onViewToggle) {
      onViewToggle(type);
    }
  };
  
  const handleManagementChange = (managementType) => {
    onFilterChange({ managementType });
  };
  
  const handleListingTypeToggle = () => {
    const newType = filters.listingType === 'rent' ? 'buy' : 'rent';
    onFilterChange({ listingType: newType });
  };

  return (
    <div className="primary-row flex items-center justify-between px-4 lg:px-6 py-3 border-b border-gray-100">
      <div className="flex items-center gap-3 lg:gap-4 flex-1">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={filters.searchQuery || ''}
            onChange={handleSearch}
          />
        </div>
        
        <FilterBadge
          count={activeFiltersCount}
          onClick={onToggleExpand}
        />

        {/* Listing Type Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={handleListingTypeToggle}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              filters.listingType === 'rent' 
                ? 'bg-white shadow-sm text-[#9f7539]' 
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            For Rent
          </button>
          <button
            onClick={handleListingTypeToggle}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              filters.listingType === 'buy' 
                ? 'bg-white shadow-sm text-[#9f7539]' 
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            For Sale
          </button>
        </div>

        {filters.listingType === 'rent' ? (
          <ForRentOverlayIcon
            isActive={showAdvancedFilters}
            onClick={onAdvancedToggle}
          />
        ) : (
          <ForSalesOverlayIcon
            isActive={showAdvancedFilters}
            onClick={onAdvancedToggle}
          />
        )}
      </div>
      
      <div className="flex items-center gap-2 lg:gap-3">
        <ViewToggle
          currentView={viewType}
          onChange={handleViewChange}
        />
        
        <ManagementDropdown
          value={filters.managementType || 'all'}
          onChange={handleManagementChange}
        />
        
        <ExpandButton
          isExpanded={isExpanded}
          onClick={onToggleExpand}
        />
      </div>
    </div>
  );
};

export default PrimaryRow;