// src/components/home/properties/components/PropertyDetailsPage/hooks/usePropertyDetails.js
import { useState, useEffect } from 'react';
import getMockPropertyData from '../utils/propertyMockData';

const usePropertyDetails = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const mockData = getMockPropertyData(propertyId);
        await new Promise(resolve => setTimeout(resolve, 500));
        setProperty(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load property details');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  return { property, loading, error };
};

export default usePropertyDetails;