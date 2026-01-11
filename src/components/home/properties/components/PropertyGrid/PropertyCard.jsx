// src/components/home/properties/components/PropertyGrid/PropertyCard.jsx
import React, { useState } from 'react';

const PropertyCard = ({ property, onViewDetails, onToggleFavorite, onBookNowClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!property) return null;
  
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M/year`;
    }
    return `₦${price.toLocaleString('en-NG')}/year`;
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(property.id, !isFavorite);
    }
  };
  
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(property.id);
    }
  };
  
  const handleBookNowClick = (e) => {
    e.stopPropagation();
    if (onBookNowClick) {
      onBookNowClick(property.id);
    }
  };
  
  const handleNextImage = (e) => {
    e.stopPropagation();
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % property.images.length);
    }
  };
  
  const getPropertyStatus = () => {
    if (property.status === 'rented') {
      return { label: 'Rented', color: 'bg-gray-500', icon: 'fas fa-check-circle' };
    }
    return { label: 'Available', color: 'bg-green-500', icon: 'fas fa-calendar-check' };
  };
  
  const propertyStatus = getPropertyStatus();
  
  const getEstateType = () => {
    if (property.isEstate) {
      return { 
        label: 'Estate Property', 
        color: '#0e1f42'
      };
    }
    return { 
      label: 'Individual Property', 
      color: '#10b981'
    };
  };
  
  const estateTypeInfo = getEstateType();
  
  return (
    <div 
      className="property-card bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] cursor-pointer group flex flex-col"
      style={{
        width: '100%',
        maxWidth: '640px',
        minHeight: '300px',
        height: 'auto',
      }}
    >
      <div 
        className="relative"
        style={{
          height: '190px',
          flexShrink: 0
        }}
      >
        <img
          src={property.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop';
          }}
        />
        
        {property.images && property.images.length > 1 && (
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
            title="Next image"
          >
            <i className="fas fa-chevron-right text-gray-700 text-sm"></i>
          </button>
        )}
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`fas fa-heart ${isFavorite ? 'text-[#9f7539]' : 'text-gray-500'} text-base`}></i>
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-white leading-tight">
                {formatPrice(property.price)}
              </div>
              <div className="text-white/90 text-sm mt-1">
                {property.isNegotiable ? 'Price Negotiable' : 'Fixed Price'}
              </div>
            </div>
            <div className="text-white/80 text-xs">
              <i className="fas fa-info-circle mr-1"></i>
              DomiHive Managed
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 flex-1 flex flex-col">
        <div className="mb-2 min-h-[24px]">
          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
            {property.title}
          </h3>
          <div className="flex items-start gap-2">
            <i className="fas fa-map-marker-alt text-[#9f7539] mt-0.5 flex-shrink-0 text-xs"></i>
            <div className="min-h-[32px]">
              <span className="text-xs text-gray-700 font-medium block line-clamp-2">{property.location}</span>
              <div className="text-[11px] text-gray-500 mt-0.5">
                <i className="fas fa-clock mr-1"></i>
                Listed {new Date(property.dateAdded).toLocaleDateString('en-NG', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
            <i className="fas fa-bed text-[#9f7539] text-xs mb-0.5"></i>
            <span className="text-xs font-bold text-gray-900">{property.bedrooms}</span>
            <span className="text-[11px] text-gray-600 font-medium">Beds</span>
          </div>
          <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
            <i className="fas fa-bath text-[#9f7539] text-xs mb-0.5"></i>
            <span className="text-xs font-bold text-gray-900">{property.bathrooms}</span>
            <span className="text-[11px] text-gray-600 font-medium">Baths</span>
          </div>
          <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
            <i className="fas fa-ruler-combined text-[#9f7539] text-xs mb-0.5"></i>
            <span className="text-xs font-bold text-gray-900">{property.size}</span>
            <span className="text-[11px] text-gray-600 font-medium">Size</span>
          </div>
        </div>
        
        <div className="mb-2 min-h-[16px]">
          <div className="flex items-center gap-2 mb-1">
            <i className="fas fa-align-left text-[#9f7539] text-[11px]"></i>
            <div className="text-[11px] font-semibold text-gray-800">About this property:</div>
          </div>
          <div className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {`Modern ${property.bedrooms}-bed property in ${property.location} with ${property.bathrooms} bath${property.bathrooms > 1 ? 's' : ''}.`}
          </div>
        </div>
        
        <div className="mb-1 flex items-center justify-between min-h-[16px]">
          <div className="flex items-center gap-2">
            <div>
              <div className="text-[11px] text-gray-500">{estateTypeInfo.label}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-[#0e1f42] text-white font-semibold py-2 rounded-lg hover:bg-[#1a2d5f] transition-colors flex items-center justify-center gap-2 text-xs shadow-sm hover:shadow"
            >
              <i className="fas fa-eye text-[11px]"></i>
              View Details
            </button>
            <button
              onClick={handleBookNowClick}
              className="flex-1 bg-gradient-to-r from-[#9f7539] to-[#b58a4a] text-white font-semibold py-2 rounded-lg hover:from-[#b58a4a] hover:to-[#9f7539] transition-all flex items-center justify-center gap-2 text-xs shadow-sm hover:shadow"
            >
              <i className="fas fa-calendar-check text-[11px]"></i>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
