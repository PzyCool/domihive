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
    clientId: "client-1",

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
      {
        id: "u-101",
        number: "Unit 1",
        type: "3 Bedroom Apartment",
        status: "occupied",
        tenant: "John Doe",
        rent: 450000,
        revenue: 450000,
        dueDate: "2024-05-15"
      },
      {
        id: "u-102",
        number: "Unit 2",
        type: "3 Bedroom Apartment",
        status: "occupied",
        tenant: "Jane Smith",
        rent: 450000,
        revenue: 450000,
        dueDate: "2024-06-01"
      },
      {
        id: "u-103",
        number: "Unit 3",
        type: "3 Bedroom Apartment",
        status: "occupied",
        tenant: "Robert Brown",
        rent: 450000,
        revenue: 450000,
        dueDate: "2024-04-20"
      },
      {
        id: "u-104",
        number: "Unit 4",
        type: "3 Bedroom Apartment",
        status: "vacant",
        rent: 450000,
        revenue: 0,
        dueDate: "-"
      }

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
    clientId: "client-2",

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
        id: "u-201",
        number: "Unit A",
        type: "Duplex",
        status: "occupied",
        tenant: "Alice Williams",
        rent: 1200000,
        revenue: 1200000,
        dueDate: "2024-08-10"
      },
      {
        id: "u-202",
        number: "Unit B",
        type: "Duplex",
        status: "occupied",
        tenant: "Michael Scott",
        rent: 1200000,
        revenue: 1200000,
        dueDate: "2024-09-12"
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
    phone: '+234 812 345 6789',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    occupation: 'Creative Director',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitId: 'unit-001',
    unitNumber: 'A-1',
    rent: 2800000,
    leaseStart: '2025-02-01',
    leaseEnd: '2026-02-01',
    status: 'Move-in pending',
    paymentStatus: 'Paid',
    emergencyContact: {
      name: 'Michael Smith',
      phone: '+234 802 000 1122',
      relationship: 'Brother'
    },
    billingHistory: [
      { id: 'PAY-001', date: '2025-02-01', amount: 2800000, type: 'Rent', status: 'Paid' }
    ]
  },
  {
    id: 'tenant-002',
    name: 'Tunde Balogun',
    email: 'tunde.balogun@example.com',
    phone: '+234 803 777 8899',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    occupation: 'Software Architect',
    propertyId: 'prop-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    unitId: 'unit-102',
    unitNumber: 'D-2',
    rent: 1900000,
    leaseStart: '2025-02-01',
    leaseEnd: '2026-02-01',
    status: 'Active',
    paymentStatus: 'Paid',
    emergencyContact: {
      name: 'Sarah Balogun',
      phone: '+234 809 333 4455',
      relationship: 'Spouse'
    },
    billingHistory: [
      { id: 'PAY-002', date: '2025-02-01', amount: 1900000, type: 'Rent', status: 'Paid' }
    ]
  },
  {
    id: 'tenant-003',
    name: 'Chioma Okeke',
    email: 'chioma.okeke@example.com',
    phone: '+234 814 222 3344',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
    occupation: 'Senior Accountant',
    propertyId: 'prop-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    unitId: 'unit-003',
    unitNumber: 'B-1',
    rent: 2900000,
    leaseStart: '2025-03-01',
    leaseEnd: '2026-03-01',
    status: 'Reserved',
    paymentStatus: 'Pending',
    emergencyContact: {
      name: 'John Okeke',
      phone: '+234 810 555 6677',
      relationship: 'Father'
    },
    billingHistory: [
      { id: 'PAY-003', date: '2025-03-01', amount: 600000, type: 'Service Fee', status: 'Pending' }
    ]
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

const defaultMaintenanceRequests = [
  {
    id: 'MNT-001',
    priority: 'Critical',
    status: 'In Progress',
    category: 'Plumbing',
    propertyId: 'prop-001',
    propertyTitle: 'DomiHive Residences',
    unitNumber: 'A-102',
    tenant: 'Chioma Okeke',
    createdAt: '2 hours ago',
    description: 'Leaking pipe in the kitchen causing flooding.',
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    ]
  },
  {
    id: 'MNT-006',
    priority: 'Low',
    status: 'Open',
    category: 'Plumbing',
    propertyId: 'prop-001',
    propertyTitle: 'DomiHive Residences',
    unitNumber: 'A-102',
    tenant: 'Bartholomew',
    createdAt: '2 hours ago',
    description: 'The AC in the master bedroom is not cooling.',
    photos: []
  },
  {
    id: 'MNT-002',
    priority: 'High',
    status: 'Open',
    category: 'Electrical',
    propertyId: 'prop-002',
    propertyTitle: 'Lagos Heights',
    unitNumber: 'B-205',
    tenant: 'Emeka Okonkwo',
    createdAt: '4 hours ago',
    description: 'Multiple power outlets in the living room are not working.',
    photos: []
  },
  {
    id: 'MNT-003',
    priority: 'Medium',
    status: 'Completed',
    category: 'HVAC',
    propertyId: 'prop-003',
    propertyTitle: 'Victoria Garden',
    unitNumber: 'C-301',
    tenant: 'Tunde Adebayo',
    createdAt: '1 day ago',
    description: 'Air conditioning unit needs regular servicing.',
    photos: []
  },
  {
    id: 'MNT-004',
    priority: 'Low',
    status: 'In Progress',
    category: 'Painting',
    propertyId: 'prop-001',
    propertyTitle: 'DomiHive Residences',
    unitNumber: 'A-201',
    tenant: 'Amaka Eze',
    createdAt: '3 days ago',
    description: 'Touch up painting required in the hallway.',
    photos: []
  }
];

const defaultClients = [
  {
    id: 'client-1',
    name: 'Mrs. Adunni Lagos',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
    joinedDate: 'Jan 2026',
    email: 'adunni.lagos@email.com',
    phone: '+234 801 234 5678',
    totalProperties: 8,
    occupiedUnits: 6,
    totalUnits: 8,
    status: 'Active',
    managementFee: 10,
    avgMonthlyFee: 48000
  },
  {
    id: "client-1",
    name: "Chukwudi Okonkwo",
    email: "chukwudi.okonkwo@email.com",
    phone: "+234 803 567 8901",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    joinedDate: "Jan 2026",
    totalProperties: 2,
    totalUnits: 8,
    occupiedUnits: 7,
    status: "Active",
    managementFee: 10,
    avgMonthlyFee: 380000,
    subtitle: "Full management client with active properties",
    isVerified: true,
    bankDetails: {
      bankName: "GTBank",
      accountNumber: "0123456789"
    },
    contractSummary: {
      type: "Full Management",
      duration: "5 years (Jan 2026 - Dec 2030)",
      maintenanceWallet: 50000,
      maintenanceRemaining: 32000,
      rentIncrement: "Every 3 years",
      nextIncrement: "Jan 2029"
    }
  },
  {
    id: 'client-2',
    name: 'Chief Emeka Okonkwo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    joinedDate: 'Dec 2025',
    email: 'emeka.okonkwo@email.com',
    phone: '+234 802 345 6789',
    totalProperties: 5,
    occupiedUnits: 5,
    totalUnits: 5,
    status: 'Active',
    managementFee: 12,
    avgMonthlyFee: 72000
  },
  {
    id: 'client-3',
    name: 'Dr. Fatima Abdullahi',
    image: 'https://images.unsplash.com/photo-1567532939604-b6c5b0adcc2c?w=100&h=100&fit=crop',
    joinedDate: 'Nov 2025',
    email: 'fatima.abdullahi@email.com',
    phone: '+234 803 456 7890',
    totalProperties: 12,
    occupiedUnits: 9,
    totalUnits: 12,
    status: 'Active',
    managementFee: 8,
    avgMonthlyFee: 54000
  },
  {
    id: 'client-4',
    name: 'Mr. Tunde Adebayo',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    joinedDate: 'Oct 2025',
    email: 'tunde.adebayo@email.com',
    phone: '+234 804 567 8901',
    totalProperties: 3,
    occupiedUnits: 2,
    totalUnits: 3,
    status: 'Expires Soon',
    managementFee: 15,
    avgMonthlyFee: 36000
  },
  {
    id: 'client-5',
    name: 'Mrs. Chioma Okeke',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    joinedDate: 'Sep 2025',
    email: 'chioma.okeke@email.com',
    phone: '+234 805 678 9012',
    totalProperties: 6,
    occupiedUnits: 4,
    totalUnits: 6,
    status: 'Active',
    managementFee: 12,
    avgMonthlyFee: 42000
  },
  {
    id: 'client-6',
    name: 'Engr. Bola Adesanya',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    joinedDate: 'Aug 2025',
    email: 'bola.adesanya@email.com',
    phone: '+234 806 789 0123',
    totalProperties: 4,
    occupiedUnits: 3,
    totalUnits: 4,
    status: 'Expired',
    managementFee: 10,
    avgMonthlyFee: 38000
  }
];


const defaultPayments = [
  {
    id: 'PAY-001',
    tenant: 'Jane Smith',
    tenantId: 'tenant-001',
    propertyTitle: '3 Bedroom Luxury Apartment',
    propertyId: 'prop-001',
    amount: 2800000,
    status: 'Paid',
    date: '2025-02-01',
    type: 'Rent',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-832910',
    invoiceId: 'INV-2025-001'
  },
  {
    id: 'PAY-002',
    tenant: 'Tunde Balogun',
    tenantId: 'tenant-002',
    propertyTitle: 'Modern 2-Bed Duplex',
    propertyId: 'prop-002',
    amount: 1900000,
    status: 'Paid',
    date: '2025-02-01',
    type: 'Rent',
    paymentMethod: 'Card',
    reference: 'REF-112233',
    invoiceId: 'INV-2025-002'
  },
  {
    id: 'PAY-003',
    tenant: 'Chioma Okeke',
    tenantId: 'tenant-003',
    propertyTitle: '3 Bedroom Luxury Apartment',
    propertyId: 'prop-001',
    amount: 600000,
    status: 'Pending',
    date: '2025-03-01',
    type: 'Service Fee',
    paymentMethod: 'Pending Transfer',
    reference: 'REF-998877',
    invoiceId: 'INV-2025-003'
  },
  {
    id: 'PAY-004',
    tenant: 'Amaka Eze',
    tenantId: 'tenant-004',
    propertyTitle: 'Modern 2-Bed Duplex',
    propertyId: 'prop-002',
    amount: 1800000,
    status: 'Overdue',
    date: '2025-01-15',
    type: 'Rent',
    paymentMethod: 'None',
    reference: '-',
    invoiceId: 'INV-2024-150'
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
  const [maintenanceRequests, setMaintenanceRequests] = useState(defaultMaintenanceRequests);
  const [clients, setClients] = useState(defaultClients);
  const [payments, setPayments] = useState(defaultPayments);

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
      setRecentActivities,
      maintenanceRequests,
      setMaintenanceRequests,
      clients,
      setClients,
      payments,
      setPayments
    }),
    [properties, locations, slots, inspections, applications, tenants, policies, recentActivities, maintenanceRequests, clients, payments]
  );


  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
