import React, { createContext, useContext, useMemo, useState } from 'react';

const INITIAL_TICKETS = [
  {
    ticketId: 'MT-001',
    propertyId: 'PROP-002',
    propertyName: '2 Bedroom Duplex in Ikoyi',
    category: 'Plumbing',
    title: 'Low water pressure in bathroom',
    description: 'Shower pressure is very low, likely clogged aerator.',
    priority: 'Normal',
    responsibility: 'Pending Assessment',
    status: 'UNDER_REVIEW',
    createdAt: '2025-01-12',
    updates: [
      { status: 'SUBMITTED', note: 'Request submitted', at: '2025-01-12 09:15' },
      { status: 'UNDER_REVIEW', note: 'Team reviewing issue', at: '2025-01-12 10:00' }
    ],
    quote: null,
    scheduledVisit: null,
    completionNote: null
  },
  {
    ticketId: 'MT-002',
    propertyId: 'PROP-002',
    propertyName: '2 Bedroom Duplex in Ikoyi',
    category: 'Electrical',
    title: 'Living room socket sparks',
    description: 'One wall socket sparks when plugging devices.',
    priority: 'Emergency',
    responsibility: 'Pending Assessment',
    status: 'SCHEDULED',
    createdAt: '2025-01-10',
    updates: [
      { status: 'SUBMITTED', note: 'Request submitted', at: '2025-01-10 08:05' },
      { status: 'UNDER_REVIEW', note: 'Electrical team alerted', at: '2025-01-10 08:30' },
      { status: 'SCHEDULED', note: 'Visit booked for Jan 12, 2:00 PM', at: '2025-01-10 09:00' }
    ],
    quote: { amount: 0, note: 'Covered by landlord wallet' },
    scheduledVisit: '2025-01-12 14:00',
    completionNote: null
  },
  {
    ticketId: 'MT-003',
    propertyId: 'PROP-001',
    propertyName: '3 Bedroom Luxury Apartment in Lekki Phase 1',
    category: 'AC',
    title: 'Master bedroom AC not cooling',
    description: 'AC runs but air is not cold.',
    priority: 'Normal',
    responsibility: 'Pending Assessment',
    status: 'COMPLETED',
    createdAt: '2024-12-20',
    updates: [
      { status: 'SUBMITTED', note: 'Request submitted', at: '2024-12-20 11:00' },
      { status: 'UNDER_REVIEW', note: 'Technician assigned', at: '2024-12-20 12:00' },
      { status: 'SCHEDULED', note: 'Visit Dec 21, 10:00 AM', at: '2024-12-20 13:00' },
      { status: 'IN_PROGRESS', note: 'Servicing ongoing', at: '2024-12-21 10:10' },
      { status: 'COMPLETED', note: 'Gas refilled and filter cleaned', at: '2024-12-21 11:00' }
    ],
    quote: { amount: 35000, note: 'AC servicing and gas refill' },
    scheduledVisit: '2024-12-21 10:00',
    completionNote: 'Cooling restored'
  }
];

const MaintenanceContext = createContext();

export const useMaintenance = () => {
  const ctx = useContext(MaintenanceContext);
  if (!ctx) throw new Error('useMaintenance must be used within MaintenanceProvider');
  return ctx;
};

export const MaintenanceProvider = ({ children }) => {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  const addTicket = (ticket) => {
    setTickets((prev) => [{ ...ticket, ticketId: `MT-${Date.now()}` }, ...prev]);
  };

  const updateTicket = (ticketId, changes) => {
    setTickets((prev) =>
      prev.map((t) => (t.ticketId === ticketId ? { ...t, ...changes } : t))
    );
  };

  const addUpdate = (ticketId, update) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.ticketId === ticketId ? { ...t, updates: [...(t.updates || []), update] } : t
      )
    );
  };

  const value = useMemo(
    () => ({
      tickets,
      addTicket,
      updateTicket,
      addUpdate
    }),
    [tickets]
  );

  return <MaintenanceContext.Provider value={value}>{children}</MaintenanceContext.Provider>;
};

export default MaintenanceContext;
