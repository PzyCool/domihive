// src/components/home/Properties.jsx
import React, { useState, useEffect } from 'react';
import PropertyGrid from "./properties/components/PropertyGrid/PropertyGrid";
import SearchHeader from "./properties/components/SearchHeader/SearchHeader";
import PropertyDetailsPage from "./properties/components/PropertyDetailsPage/PropertyDetailsPage";
// import BookInspectionPage from "./properties/components/BookInspectionPage/BookInspectionPage";
import { generateNigerianProperties } from "./properties/components/utils/propertyData";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [showBookInspection, setShowBookInspection] = useState(false);
  const [selectedPropertyForBooking, setSelectedPropertyForBooking] = useState(null);
  
  const [filters, setFilters] = useState({
    searchQuery: '',
    areaType: 'all',
    location: 'all',
    propertyType: 'all',
    bedrooms: 'all',
    priceRange: 'all',
    managementType: 'all',
    listingType: 'rent',
    isExpanded: false
  });
  
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProperties = () => {
      setIsLoading(true);
      try {
        const properties = generateNigerianProperties(80);
        setAllProperties(properties);
        setFilteredProperties(properties);
        const totalPages = Math.ceil(properties.length / 6);
        setTotalPages(totalPages);
        updateDisplayedProperties(properties, 1);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProperties();
  }, []);
  
  const updateDisplayedProperties = (properties, page) => {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayedProperties(properties.slice(startIndex, endIndex));
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };
  
  useEffect(() => {
    if (allProperties.length === 0) return;
    
    let filtered = [...allProperties];
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
      );
    }
    
    if (filters.listingType !== 'all') {
      filtered = filtered.filter(property => 
        property.forRent === (filters.listingType === 'rent')
      );
    }
    
    if (filters.managementType !== 'all') {
      filtered = filtered.filter(property => 
        property.managementType === filters.managementType
      );
    }
    
    if (filters.areaType !== 'all') {
      filtered = filtered.filter(property => 
        property.areaType === filters.areaType
      );
    }
    
    if (filters.location !== 'all') {
      filtered = filtered.filter(property => 
        property.location.includes(filters.location)
      );
    }
    
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => 
        property.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }
    
    if (filters.bedrooms !== 'all') {
      if (filters.bedrooms === '4') {
        filtered = filtered.filter(property => property.bedrooms >= 4);
      } else {
        filtered = filtered.filter(property => 
          property.bedrooms === parseInt(filters.bedrooms)
        );
      }
    }
    
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(str => {
        if (str.includes('+')) return parseInt(str.replace('+', '')) + 1;
        const num = str.replace('₦', '').replace('M', '000000').replace('/year', '').trim();
        return parseInt(num);
      });
      
      filtered = filtered.filter(property => {
        if (filters.priceRange.includes('+')) {
          return property.price >= min;
        }
        return property.price >= min && property.price <= max;
      });
    }
    
    setFilteredProperties(filtered);
    const totalPages = Math.ceil(filtered.length / 6);
    setTotalPages(totalPages);
    updateDisplayedProperties(filtered, currentPage);
  }, [filters, allProperties, currentPage]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateDisplayedProperties(filteredProperties, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleViewToggle = (type) => {
    setViewType(type);
  };
  
  const handlePropertyClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowPropertyDetails(true);
    setShowBookInspection(false);
  };
  
  const handleFavoriteToggle = (propertyId, isFavorite) => {
    console.log('Toggle favorite:', propertyId, isFavorite);
  };
  
  const handleBookNowClick = (propertyId) => {
    setSelectedPropertyForBooking(propertyId);
    setShowBookInspection(true);
    setShowPropertyDetails(false);
  };
  
  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      areaType: 'all',
      location: 'all',
      propertyType: 'all',
      bedrooms: 'all',
      priceRange: 'all',
      managementType: 'all',
      listingType: 'rent',
      isExpanded: false
    });
  };

  if (isLoading) {
    return (
      <div id="properties" className="properties-section py-20 bg-white">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#9f7539]"></div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <section id="properties" className="properties-section py-20 bg-white">
      <div className="container max-w-[1200px] mx-auto px-8">
        {showBookInspection ? (
          <div className="book-inspection-container">
            {/* <BookInspectionPage propertyId={selectedPropertyForBooking} /> */}
          </div>
        ) : showPropertyDetails ? (
          <div className="property-details-container">
            <PropertyDetailsPage
              propertyId={selectedPropertyId}
              isOpen={showPropertyDetails}
              onClose={() => setShowPropertyDetails(false)}
            />
          </div>
        ) : (
          <>
            <div className="relative mb-8">
              <SearchHeader 
                filters={filters}
                onFilterChange={handleFilterChange}
                viewType={viewType}
                onViewToggle={handleViewToggle}
              />
              
              <div 
                className={`transition-all duration-300 ease-out ${
                  filters.isExpanded ? 'h-24' : 'h-0'
                }`}
              ></div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0E1F42] mb-2">
                {filters.listingType === 'rent' ? 'Properties for Rent' : 'Properties for Sale'}
              </h2>
              <p className="text-gray-600">
                Showing {displayedProperties.length} of {filteredProperties.length} properties
                {filters.areaType !== 'all' && ` in ${filters.areaType === 'island' ? 'Lagos Island' : 'Lagos Mainland'}`}
              </p>
            </div>
            
            <div className="mb-10">
              <PropertyGrid 
                properties={displayedProperties}
                onPropertyClick={handlePropertyClick}
                onFavoriteToggle={handleFavoriteToggle}
                onBookNowClick={handleBookNowClick}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg ${currentPage === page ? 'bg-[#0E1F42] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                6 per page
              </div>
            </div>
            
            {(filters.searchQuery || filters.areaType !== 'all' || filters.location !== 'all' || 
              filters.propertyType !== 'all' || filters.bedrooms !== 'all' || 
              filters.priceRange !== 'all' || filters.managementType !== 'all' || filters.listingType !== 'rent') && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <i className="fas fa-times mr-2"></i>
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Properties;