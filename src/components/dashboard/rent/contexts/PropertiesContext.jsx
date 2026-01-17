import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const INITIAL_PROPERTIES = [
  {
    propertyId: 'PROP-001',
    name: '3 Bedroom Luxury Apartment in Lekki Phase 1',
    location: 'Lekki Phase 1, Lagos',
    unitType: '3 Bed',
    tenancyStatus: 'PENDING_MOVE_IN', // PENDING_MOVE_IN | ACTIVE | ENDED
    leaseStart: '2025-03-15',
    leaseEnd: '2026-03-14',
    rentAmount: 2800000,
    paymentPlan: 'Yearly',
    cautionDepositStatus: 'Paid',
    includedBillsSummary: 'Service charge included, utilities excluded',
    houseRules: ['No smoking indoors', 'Pets on request', 'Respect quiet hours 10pm-6am'],
    inventoryChecklist: [
      { item: 'Living room sofa', status: 'ok' },
      { item: 'Dining set', status: 'ok' },
      { item: 'AC units', status: 'ok' }
    ],
    payments: [
      { id: 'PAY-001', date: '2025-03-01', amount: 2800000, description: 'Annual Rent', status: 'paid' },
      { id: 'PAY-002', date: '2025-03-01', amount: 300000, description: 'Caution Deposit', status: 'paid' }
    ],
    nextPayment: { dueDate: '2026-03-01', amount: 2800000, status: 'Due in 45 days' },
    moveInChecklist: { keysReceived: false, meterReading: '', inventoryConfirmed: false, moveInDateConfirmed: false },
    moveOutNotice: null,
    moveOutInspection: null,
    refundStatus: null
  },
  {
    propertyId: 'PROP-002',
    name: '2 Bedroom Duplex in Ikoyi',
    location: 'Ikoyi, Lagos',
    unitType: '2 Bed',
    tenancyStatus: 'ACTIVE',
    leaseStart: '2024-06-01',
    leaseEnd: '2025-05-31',
    rentAmount: 3500000,
    paymentPlan: 'Yearly',
    cautionDepositStatus: 'Held',
    includedBillsSummary: 'Service charge excluded, utilities excluded',
    houseRules: ['No loud parties', 'Keep common areas clean'],
    inventoryChecklist: [
      { item: 'Washer/Dryer', status: 'ok' },
      { item: 'Kitchen appliances', status: 'ok' }
    ],
    payments: [
      { id: 'PAY-101', date: '2024-06-01', amount: 3500000, description: 'Annual Rent', status: 'paid' },
      { id: 'PAY-102', date: '2024-06-01', amount: 350000, description: 'Caution Deposit', status: 'paid' }
    ],
    nextPayment: { dueDate: '2025-05-20', amount: 3500000, status: 'Due in 120 days' },
    moveInChecklist: { keysReceived: true, meterReading: '012345', inventoryConfirmed: true, moveInDateConfirmed: true },
    moveOutNotice: null,
    moveOutInspection: null,
    refundStatus: null
  },
  {
    propertyId: 'PROP-003',
    name: 'Modern 2 Bedroom Penthouse',
    location: 'Victoria Island, Lagos',
    unitType: '2 Bed',
    tenancyStatus: 'ENDED',
    leaseStart: '2023-01-01',
    leaseEnd: '2023-12-31',
    rentAmount: 4500000,
    paymentPlan: 'Yearly',
    cautionDepositStatus: 'Refund completed',
    includedBillsSummary: 'No utilities included',
    houseRules: ['No pets', 'Maintain cleanliness'],
    inventoryChecklist: [],
    payments: [
      { id: 'PAY-201', date: '2023-01-01', amount: 4500000, description: 'Annual Rent', status: 'paid' }
    ],
    nextPayment: null,
    moveInChecklist: { keysReceived: true, meterReading: '098765', inventoryConfirmed: true, moveInDateConfirmed: true },
    moveOutNotice: { submittedOn: '2023-11-01', preferredDate: '2023-12-15', reason: 'Relocation' },
    moveOutInspection: { scheduled: '2023-12-16', status: 'completed' },
    refundStatus: 'Refund completed'
  }
];

const PropertiesContext = createContext();

export const useProperties = () => {
  const ctx = useContext(PropertiesContext);
  if (!ctx) throw new Error('useProperties must be used within PropertiesProvider');
  return ctx;
};

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('domihive_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error loading favorites', err);
      return [];
    }
  }); // store array of property ids

  useEffect(() => {
    try {
      localStorage.setItem('domihive_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites', err);
    }
  }, [favorites]);

  const updateProperty = (propertyId, changes) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.propertyId === propertyId ? { ...prop, ...changes } : prop))
    );
  };

  const completeMoveInChecklist = (propertyId, checklist) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.propertyId === propertyId
          ? {
              ...prop,
              moveInChecklist: { ...prop.moveInChecklist, ...checklist },
              tenancyStatus: 'ACTIVE'
            }
          : prop
      )
    );
  };

  const submitMoveOutNotice = (propertyId, notice) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.propertyId === propertyId
          ? { ...prop, moveOutNotice: notice, tenancyStatus: 'ACTIVE' }
          : prop
      )
    );
  };

  const scheduleMoveOutInspection = (propertyId, inspection) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.propertyId === propertyId ? { ...prop, moveOutInspection: inspection } : prop
      )
    );
  };

  const updateRefundStatus = (propertyId, status) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.propertyId === propertyId ? { ...prop, refundStatus: status } : prop
      )
    );
  };

  const getPropertyId = (property) => property?.id || property?.propertyId;

  const toggleFavorite = (property) => {
    const pid = getPropertyId(property);
    if (!pid) return;
    setFavorites((prev) => {
      if (prev.includes(pid)) {
        return prev.filter((id) => id !== pid);
      }
      return [...prev, pid];
    });
  };

  const isFavorite = (propertyId) => {
    const pid = propertyId;
    return favorites.includes(pid);
  };

  const favoriteProperties = properties.filter((p) => favorites.includes(getPropertyId(p)));

  const value = useMemo(
    () => ({
      properties,
       favorites,
       favoriteProperties,
      updateProperty,
      completeMoveInChecklist,
      submitMoveOutNotice,
      scheduleMoveOutInspection,
      updateRefundStatus,
      toggleFavorite,
      isFavorite
    }),
    [properties, favorites]
  );

  return <PropertiesContext.Provider value={value}>{children}</PropertiesContext.Provider>;
};

export default PropertiesContext;
