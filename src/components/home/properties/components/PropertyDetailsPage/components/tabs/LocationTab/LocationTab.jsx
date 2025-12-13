// src/components/home/properties/components/PropertyDetailsPage/components/tabs/LocationTab/LocationTab.jsx
import React from 'react';
import MapSection from './MapSection';
// import NearbyAmenities from './NearbyAmenities';
import ActionSection from '../../ActionSection/ActionSection';

const LocationTab = ({ property, listingType }) => {
  return (
    <div className="location-tab space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-[#0e1f42] mb-2">
          Location & Neighborhood
        </h3>
        <p className="text-gray-600">
          Explore the neighborhood and nearby amenities
        </p>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#9f7539]/10 rounded-lg flex items-center justify-center">
            <i className="fas fa-map-marker-alt text-[#9f7539] text-xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Property Address</h4>
            <p className="text-gray-700 text-lg">{property.address}</p>
            <p className="text-gray-600 mt-2">{property.location}</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div>
        <h4 className="text-xl font-bold text-[#0e1f42] mb-4">Interactive Map</h4>
        <MapSection coordinates={property.locationDetails?.coordinates} />
      </div>

      {/* Nearby Amenities */}
      {/* <div>
        <h4 className="text-xl font-bold text-[#0e1f42] mb-4">Nearby Amenities</h4>
        <NearbyAmenities amenities={property.locationDetails?.nearbyAmenities} />
      </div> */}

      

      {/* Action Section - BELOW, centered */}
      <div className="mt-8">
        <ActionSection 
          property={property}
          listingType={listingType}
        />
      </div>
    </div>
  );
};

export default LocationTab;