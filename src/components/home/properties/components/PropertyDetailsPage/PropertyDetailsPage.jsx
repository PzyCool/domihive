// src/components/home/properties/components/PropertyDetailsPage/PropertyDetailsPage.jsx
import React from 'react';
// import PropertyGallery from './components/PropertyGallery/PropertyGallery';
// import PropertyHeader from './components/PropertyHeader/PropertyHeader';
// import PropertyTabs from './components/PropertyTabs/PropertyTabs';
// import ActionSection from './components/ActionSection/ActionSection';
// import FloatingCallButton from './components/FloatingCallButton/FloatingCallButton';
// import { usePropertyDetails } from './hooks/usePropertyDetails';
// import { useGallery } from './hooks/useGallery';

const PropertyDetailsPage = ({ propertyId, onClose, listingType = 'rent' }) => {
  // const { property, loading, error } = usePropertyDetails(propertyId);
  // const { currentImageIndex, handleNext, handlePrev, handleThumbnailClick } = useGallery();
  
  // if (loading) {
  //   return (
  //     <div className="property-details-page min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#9f7539]"></div>
  //         <p className="mt-4 text-gray-600">Loading property details...</p>
  //       </div>
  //     </div>
  //   );
  // }
  
  // if (error || !property) {
  //   return (
  //     <div className="property-details-page min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
  //         <h3 className="text-xl font-semibold text-gray-800 mb-2">Property Not Found</h3>
  //         <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
  //         <button
  //           onClick={onClose}
  //           className="px-6 py-2 bg-[#0e1f42] text-white rounded-lg hover:bg-[#1a2d5f] transition-colors"
  //         >
  //           Back to Properties
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="property-details-page min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container max-w-[1200px] mx-auto px-4 pt-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-700 hover:text-[#9f7539] transition-colors mb-6"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Properties
        </button>
      </div>
      
      {/* Property Gallery */}
      <div className="container max-w-[1200px] mx-auto px-4 mb-8">
        {/* <PropertyGallery
          images={property.images || []}
          currentIndex={currentImageIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onThumbnailClick={handleThumbnailClick}
        /> */}
      </div>
      
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="mb-8">
              {/* <PropertyHeader
                property={property}
                listingType={listingType}
              /> */}
            </div>
            
            {/* Property Tabs */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200">
              {/* <PropertyTabs property={property} listingType={listingType} /> */}
            </div>
          </div>
          
          {/* Right Column - Action Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* <ActionSection
                property={property}
                listingType={listingType}
                onClose={onClose}
              /> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Call Button */}
      {/* <FloatingCallButton phoneNumber={property.contactPhone} /> */}
    </div>
  );
};

export default PropertyDetailsPage;