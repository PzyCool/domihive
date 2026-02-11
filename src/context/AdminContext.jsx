import React, { createContext, useContext, useMemo, useState } from 'react';

// Simple Admin store using mock state; later can be replaced with API
const AdminContext = createContext(null);
const defaultProperties = [
  // property 1
  {
    id: "prop-001",
    title: "3 Bedroom Luxury Apartment",
    state: "Lagos",
    area: "Ikoyi",
    location: "Lekki Phase 1",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    rent: 2800000, // fallback/base rent
    status: "Published",
    tag: "Estate",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",

    // optional property-level fields
    address: "Plot 23, Adeyinka Road",
    estateType: "Estate Managed",
    amenities: ["Security", "Parking", "Water Supply", "Generator"],

    // Units inside this property
    units: [
      {
        id: "unit-001",
        unitNumber: "A-1",
        floor: 1,
        bedrooms: 3,
        bathrooms: 3,
        size: "145 sqm",
        rent: 2800000,
        caution: 500000,
        status: "occupied", // available | reserved | occupied | maintenance
        tenantId: "tenant-001",
        leaseStart: "2025-02-01",
        leaseEnd: "2026-02-01",
        lastInspection: "2025-01-28",
        notes: "Tenant requested smart lock installation.",
      },

      {
        id: "unit-002",
        unitNumber: "A-2",
        floor: 1,
        bedrooms: 3,
        bathrooms: 3,
        size: "145 sqm",
        rent: 2750000,
        caution: 500000,
        status: "available",
        tenantId: null,
        leaseStart: null,
        leaseEnd: null,
        lastInspection: "2025-01-20",
        notes: "Freshly painted, ready for move-in.",
      },

      {
        id: "unit-003",
        unitNumber: "B-1",
        floor: 2,
        bedrooms: 3,
        bathrooms: 3,
        size: "150 sqm",
        rent: 2900000,
        caution: 600000,
        status: "reserved",
        tenantId: "tenant-003",
        leaseStart: "2025-03-01",
        leaseEnd: "2026-03-01",
        lastInspection: "2025-02-14",
        notes: "Reserved — awaiting payment confirmation.",
      },

    ],
  },

  // property 2
  {
    id: "prop-002",
    title: "Modern 2-Bed Duplex",
    state: "Lagos",
    area: "Victoria Island",
    location: "Oniru",
    type: "Duplex",
    bedrooms: 2,
    bathrooms: 2,
    rent: 1800000,
    status: "Draft",
    tag: "Non-estate",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",

    address: "12 Adeola Odeku Street",
    estateType: "Non Estate",
    amenities: ["Parking", "Security", "Water Supply"],

    units: [
      {
        id: "unit-101",
        unitNumber: "D-1",
        floor: 0,
        bedrooms: 2,
        bathrooms: 2,
        size: "110 sqm",
        rent: 1800000,
        caution: 400000,
        status: "available",
        tenantId: null,
        leaseStart: null,
        leaseEnd: null,
        lastInspection: null,
        notes: "Brand new listing (Draft).",
      },

      {
        id: "unit-102",
        unitNumber: "D-2",
        floor: 0,
        bedrooms: 2,
        bathrooms: 2,
        size: "115 sqm",
        rent: 1900000,
        caution: 450000,
        status: "occupied",
        tenantId: 'tenant-002',
        leaseStart: '2025-02-01',
        leaseEnd: '2026-02-01',
        lastInspection: '2025-01-28',
        notes: "Corner unit with better lighting.",
      },
    ],
  },
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
    applicantId: 'tenant-001',

    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitId: 'unit-001A',
    unitNumber: 'A1',

    submittedAt: '2025-01-18T10:00:00Z',
    status: 'Submitted',

    slaHours: 24,
    hoursLeft: 20,

    rent: 2800000,
    leaseStart: '2025-02-01',
    leaseDurationMonths: 12,

    priority: 'Medium',
    assignedTo: 'admin-001',
    notes: ''
  },
  {
    id: 'app-002',
    applicant: 'Jane Doe',
    applicantId: 'tenant-002',

    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    unitId: 'unit-002B',
    unitNumber: 'B2',

    submittedAt: '2025-01-18T10:00:00Z',
    status: 'Under Review',

    slaHours: 24,
    hoursLeft: 10,

    rent: 1800000,
    leaseStart: '2025-02-01',
    leaseDurationMonths: 12,

    priority: 'High',
    assignedTo: 'admin-001',
    notes: 'Requested early move-in.'
  },
  {
    id: 'app-003',
    applicant: 'Janet Emma',
    applicantId: 'tenant-003',

    propertyId: 'prop-003',
    propertyTitle: 'Modern 13-Room Mansion',
    unitId: 'unit-003A',
    unitNumber: 'A1',

    submittedAt: '2025-01-18T10:00:00Z',
    status: 'Under Review',

    slaHours: 24,
    hoursLeft: 12,

    rent: 12500000,
    leaseStart: '2025-02-01',
    leaseDurationMonths: 12,

    priority: 'High',
    assignedTo: 'admin-002',
    notes: 'High-value client. Needs fast processing.'
  }
];

const defaultInspections = [
  {
    id: 'insp-001',
    tenant: 'Jane Smith',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitNumber: 'A-1',
    date: '2025-01-25',
    time: '10:00 AM',
    status: 'Verified',
    type: 'Physical'
  },
  {
    id: 'insp-002',
    tenant: 'Tunde Balogun',
    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    unitNumber: 'D-2',
    date: '2025-02-15',
    time: '02:30 PM',
    status: 'Scheduled',
    type: 'Physical'
  },
  {
    id: 'insp-003',
    tenant: 'Chioma Okeke',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitNumber: 'B-1',
    date: '2025-02-16',
    time: '11:00 AM',
    status: 'Scheduled',
    type: 'Virtual'
  },
  {
    id: 'insp-004',
    tenant: 'Amaka Eze',
    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    unitNumber: 'D-1',
    date: '2025-02-10',
    time: '04:00 PM',
    status: 'No-show',
    type: 'Physical'
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
    email: 'janesmith@gmail.com',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitId: 'unit-001',
    unitNumber: 'A-1',
    rent: 2800000,
    leaseStart: '2025-02-01',
    leaseEnd: '2026-02-01',
    status: 'Move-in pending',
    paymentStatus: 'Paid'
  },
  {
    id: 'tenant-002',
    name: 'Tunde Balogun',
    email: 'tunde.balogun@example.com',
    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    unitId: 'unit-102',
    unitNumber: 'D-2',
    rent: 1900000,
    leaseStart: '2025-02-01',
    leaseEnd: '2026-02-01',
    status: 'Active',
    paymentStatus: 'Paid'
  },
  {
    id: 'tenant-003',
    name: 'Chioma Okeke',
    email: 'chioma.okeke@example.com',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitId: 'unit-003',
    unitNumber: 'B-1',
    rent: 2900000,
    leaseStart: '2025-03-01',
    leaseEnd: '2026-03-01',
    status: 'Reserved',
    paymentStatus: 'Pending'
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
