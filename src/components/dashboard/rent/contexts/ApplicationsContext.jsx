import React, { createContext, useContext, useMemo, useState } from 'react';

const APP_INITIAL_DATA = [
  {
    id: 'APP-001',
    status: 'INSPECTION_SCHEDULED',
    applicantName: 'Damilola Ade',
    inspectionDate: 'March 12, 2025 • 2:00PM',
    attendees: 2,
    property: {
      title: '3 Bedroom Luxury Apartment in Lekki Phase 1',
      location: 'Lekki Phase 1, Lagos',
      price: 2800000,
      image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b58?w=640'
    },
    updatedAt: 'Today'
  },
  {
    id: 'APP-002',
    status: 'INSPECTION_VERIFIED',
    applicantName: 'Chioma Odenigbo',
    inspectionDate: 'March 8, 2025 • 11:00AM',
    attendees: 1,
    property: {
      title: '2 Bedroom Duplex in Ikoyi',
      location: 'Ikoyi, Lagos',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=640'
    },
    updatedAt: 'Yesterday'
  },
  {
    id: 'APP-003',
    status: 'APPLICATION_SUBMITTED',
    applicantName: 'Seyi Afolabi',
    inspectionDate: 'February 28, 2025 • 4:00PM',
    attendees: 2,
    property: {
      title: 'Modern 2 Bedroom Penthouse',
      location: 'Victoria Island, Lagos',
      price: 4500000,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640'
    },
    updatedAt: '2 days ago'
  }
];

const ApplicationsContext = createContext();

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within ApplicationsProvider');
  }
  return context;
};

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState(APP_INITIAL_DATA);
  const [notifications, setNotifications] = useState([]);

  const updateApplication = (id, changes) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, ...changes } : app));
  };

  const addNotification = (notification) => {
    setNotifications(prev => [
      { id: Date.now(), ...notification },
      ...prev
    ]);
  };

  const value = useMemo(() => ({
    applications,
    updateApplication,
    notifications,
    addNotification
  }), [applications, notifications]);

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationsContext;
