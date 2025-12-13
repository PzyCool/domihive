// src/components/home/properties/components/PropertyDetailsPage/utils/propertyMockData.js
const getMockPropertyData = (propertyId) => {
  return {
    id: propertyId,
    title: "Luxury 3-Bedroom Apartment in Ikoyi",
    price: "₦4,500,000/year",
    location: "Ikoyi, Lagos Island",
    address: "24 Bourdillon Road, Ikoyi, Lagos",
    description: "This stunning 3-bedroom apartment offers luxurious living in the heart of Ikoyi.",
    bedrooms: 3,
    bathrooms: 3,
    size: "180 sqm",
    propertyType: "Apartment",
    managementType: "DomiHive Managed",
    isVerified: true,
    isFeatured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 24,
    
    images: [
      "https://images.unsplash.com/photo-1564019471349-34e8a875c5c8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545323157-f6f63c0d66a7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
    ],
    
    specifications: {
      building: ["New construction (2023)", "6-floor building with elevator", "Modern architectural design"],
      interior: ["Marble flooring", "Fitted wardrobes", "Central air conditioning"],
      exterior: ["Swimming pool", "Landscaped gardens", "Secure parking"],
      utilities: ["Constant water supply", "Backup generator", "High-speed fiber internet"],
    },
    
    amenities: ["WiFi", "Parking", "24/7 Security", "Generator", "Swimming Pool", "Gym", "CCTV"],
    
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        status: "Verified Tenant",
        date: "March 15, 2024",
        rating: 5,
        title: "Perfect Home for Our Family!",
        content: "We've been living here for 2 years and it's been absolutely wonderful. The location is perfect, the neighbors are friendly, and the maintenance team is very responsive.",
        tags: ["Great Location", "Responsive Maintenance", "Spacious Rooms"],
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        name: "Michael Adebayo",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        status: "Former Tenant",
        date: "February 28, 2024",
        rating: 4,
        title: "Good overall experience",
        content: "The property is well maintained and the security is excellent. Only issue was occasional water pressure problems.",
        tags: ["Good Security", "Well Maintained"],
        helpful: 8,
        verified: true
      }
    ],
    
    locationDetails: {
      coordinates: { lat: 6.4489, lng: 3.4337 },
      nearbyAmenities: [
        { name: "Shopping Mall", distance: "0.5km", icon: "shopping-cart" },
        { name: "Hospital", distance: "1.2km", icon: "hospital" },
        { name: "School", distance: "0.8km", icon: "school" },
        { name: "Restaurant", distance: "0.3km", icon: "utensils" },
      ],
    },
  };
};

const propertyConstants = {
  TABS: {
    DETAILS: 'details',
    MEDIA: 'media',
    REVIEWS: 'reviews',
    LOCATION: 'location',
  },
  
  AMENITIES: [
    'WiFi', 'Parking', '24/7 Security', 'Generator', 'Borehole Water',
    'Air Conditioning', 'Swimming Pool', 'Gym', 'CCTV', 'Fully Furnished'
  ],
  
  FURNISHING_TYPES: [
    'Furnished',
    'Semi-Furnished', 
    'Unfurnished',
  ],
};

export default getMockPropertyData;
export { propertyConstants };