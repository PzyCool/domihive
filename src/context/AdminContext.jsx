import React, { createContext, useContext, useMemo, useState } from 'react';

// Simple Admin store using mock state; later can be replaced with API
const AdminContext = createContext(null);

const defaultProperties = [
  {
    id: 'prop-001',
    title: '3 Bedroom Luxury Apartment',
    state: 'Lagos',
    area: 'Ikoyi',
    location: 'Lekki Phase 1',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    rent: 2800000,
    status: 'Published',
    tag: 'Estate',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
  },
  {
    id: 'prop-002',
    title: 'Modern 2-Bed Duplex',
    state: 'Lagos',
    area: 'Victoria Island',
    location: 'Oniru',
    type: 'Duplex',
    bedrooms: 2,
    bathrooms: 2,
    rent: 1800000,
    status: 'Draft',
    tag: 'Non-estate',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop'
  }
];

const defaultLocations = {
  states: ['Lagos'],
  areas: {
    Lagos: ['Ikoyi', 'Victoria Island', 'Mainland']
  },
  locations: {
    Ikoyi: ['Lekki Phase 1', 'Banana Island'],
    'Victoria Island': ['Oniru', 'Eko Atlantic'],
    Mainland: ['Ikeja', 'Yaba']
  },
  propertyTypes: ['Apartment', 'Duplex', 'Terrace', 'Studio'],
  amenities: ['WiFi', 'Parking', 'Security', 'Generator', 'Water', 'AC'],
  priceRanges: ['Under 1M', '1M - 3M', '3M - 5M', '5M+']
};

const defaultPolicies = {
  requiredDocs: `Government Issued ID\nProof of Income\nReference Letters (optional)`,
  verificationProcess: 'We verify documents on-site during inspection. Originals are required and returned immediately.',
  terms: 'Arrive on time. Bring valid ID. Maximum inspection time is 30 minutes.',
  maintenance: 'Maintenance requests are triaged by urgency. Emergencies are addressed immediately.'
};

const defaultApplications = [
  {
    id: 'app-001',
    applicant: 'John Doe',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    submittedAt: '2025-01-18T10:00:00Z',
    status: 'Submitted'
  }
];

const defaultInspections = [
  {
    id: 'insp-001',
    tenant: 'Jane Smith',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    date: '2025-01-25',
    time: '10:00 AM',
    status: 'Scheduled'
  }
];

const defaultSlots = [
  {
    propertyId: 'prop-001',
    date: '2025-01-25',
    times: ['10:00 AM', '12:00 PM', '4:00 PM']
  }
];

const defaultTenants = [
  {
    id: 'tenant-001',
    name: 'Jane Smith',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    leaseStart: '2025-02-01',
    leaseEnd: '2026-02-01',
    status: 'Move-in pending',
    rent: 2800000
  }
];

export const AdminProvider = ({ children }) => {
  const [properties, setProperties] = useState(defaultProperties);
  const [locations, setLocations] = useState(defaultLocations);
  const [slots, setSlots] = useState(defaultSlots);
  const [inspections, setInspections] = useState(defaultInspections);
  const [applications, setApplications] = useState(defaultApplications);
  const [tenants, setTenants] = useState(defaultTenants);
  const [policies, setPolicies] = useState(defaultPolicies);

  const value = useMemo(
    () => ({
      properties,
      setProperties,
      locations,
      setLocations,
      slots,
      setSlots,
      inspections,
      setInspections,
      applications,
      setApplications,
      tenants,
      setTenants,
      policies,
      setPolicies
    }),
    [properties, locations, slots, inspections, applications, tenants, policies]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
