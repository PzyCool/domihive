// src/components/home/properties/components/PropertyDetailsPage/PropertyDetailsPage.jsx
import React from 'react';
import PropertyHeader from './components/PropertyHeader/PropertyHeader';
import PropertyGallery from './components/PropertyGallery/PropertyGallery';
import PropertyTabs from './components/PropertyTabs/PropertyTabs';
// import ActionSection from './components/ActionSection/ActionSection';
// import FloatingCallButton from './components/FloatingCallButton';
import usePropertyDetails from './hooks/usePropertyDetails';

const PropertyDetailsPage = ({ propertyId, listingType, onBookInspection, onClose }) => {
  const { property, loading, error } = usePropertyDetails(propertyId);

  if (loading) {
    return (
      <div className="property-details-page min-h-screen bg-white py-8">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="text-center text-gray-600">Loading property details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-details-page min-h-screen bg-white py-8">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="text-center text-red-600">Error loading property.</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details-page min-h-screen bg-white py-8">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="text-center text-gray-600">Property not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details-page min-h-screen bg-white py-8">
      <div className="container max-w-[1200px] mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-700 hover:text-[#9f7539]"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Properties</span>
          </button>
        </div>

        {/* Property Gallery - FIRST */}
        <PropertyGallery images={property.images} />

        {/* Property Header - SECOND */}
        <PropertyHeader property={property} listingType={listingType} />

        {/* Property Tabs - FULL WIDTH, NOT IN GRID */}
        <PropertyTabs
          property={property}
          listingType={listingType}
          onBookInspection={onBookInspection}
        />

        {/* Grid only for ActionSection */}
        <div className="mt-8">
          {/* <ActionSection 
            property={property} 
            listingType={listingType} 
          /> */}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-700 hover:text-[#9f7539]"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Properties</span>
          </button>
        </div>

        {/* Floating Call Button */}
        {/* <FloatingCallButton phoneNumber="+2349010851071" /> */}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
