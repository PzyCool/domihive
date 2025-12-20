// src/context/ListingTypeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ListingTypeContext = createContext();

export const useListingType = () => {
  const context = useContext(ListingTypeContext);
  if (!context) {
    throw new Error('useListingType must be used within ListingTypeProvider');
  }
  return context;
};

export const ListingTypeProvider = ({ children }) => {
  const [listingType, setListingType] = useState('rent'); // 'rent' or 'buy'
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const updateListingType = (type) => {
    setListingType(type);
    setTriggerUpdate(true);
    
    // Reset trigger after a short delay
    setTimeout(() => {
      setTriggerUpdate(false);
    }, 100);
  };

  const value = {
    listingType,
    setListingType: updateListingType,
    triggerUpdate
  };

  return (
    <ListingTypeContext.Provider value={value}>
      {children}
    </ListingTypeContext.Provider>
  );
};

export default ListingTypeContext;