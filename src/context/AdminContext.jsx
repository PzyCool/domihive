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
  },
  {
    id: 'app-002',
    applicant: 'Jane Doe',
    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    submittedAt: '2025-01-18T10:00:00Z',
    status: 'Under Review'
  },
  {
    id: 'app-003',
    applicant: 'Janet Emma',
    propertyId: 'prop-003',
    propertyTitle: 'Modern 13-Room Mansion',
    submittedAt: '2025-01-18T10:00:00Z',
    status: 'Under Review'
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
  },
  {
    id: 'tenant-002',
    name: 'Tenant 2',
    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    leaseStart: '2025-02-01',
    leaseEnd: '2026-02-01',
    status: 'Active',
    rent: 1800000
  }
];

// added recent activities data
const defaultRecentActivities = [
  {
    id: 'act001',
    title: 'Application Approved',
    details: 'Chioma Okeke application for 3 Bedroom Luxury Apartment has been approved.',
    time: '2 hours ago',
    status: 'approved'
  },
  {
    id: 'act002',
    title: 'Inspection Verified',
    details: 'Inspection for Modern 2-Bed Duplex has been verified by the agent.',
    time: '3 hours ago',
    status: 'verified'
  },
  {
    id: 'act003',
    title: 'Maintenance Completed',
    details: 'Plumbing repair at Ocean View Apartment has been completed.',
    time: '5 hours ago',
    status: 'completed'
  },
  {
    id: 'act004',
    title: 'Inspection In Progress',
    details: 'Inspection for Lekki Studio Apartment is currently ongoing.',
    time: '1 hour ago',
    status: 'in progress'
  },
  {
    id: 'act005',
    title: 'New Application Received',
    details: 'Tunde Balogun submitted a new application for 2 Bedroom Flat in Yaba.',
    time: '20 minutes ago',
    status: 'new'
  },
  {
    id: 'act006',
    title: 'Payment Pending',
    details: 'Rent payment for Banana Island Penthouse is awaiting confirmation.',
    time: '4 hours ago',
    status: 'pending'
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
  const [recentActivities, setRecentActivities] = useState(defaultRecentActivities);

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
      setPolicies,
      recentActivities,
      setRecentActivities
    }),
    [properties, locations, slots, inspections, applications, tenants, policies, recentActivities]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
