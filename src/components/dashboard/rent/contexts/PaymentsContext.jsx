import React, { createContext, useContext, useMemo, useState } from 'react';

const initialState = {
  rents: {
    'PROP-002': {
      amount: 3500000,
      nextDue: '2025-05-20',
      status: 'Due' // Due | Upcoming | Overdue | Paid | Pending Confirmation
    },
    'PROP-001': {
      amount: 2800000,
      nextDue: '2026-03-01',
      status: 'Upcoming'
    }
  },
  bills: {
    'PROP-002': [
      { id: 'BILL-001', name: 'Service Charge', amount: 150000, dueDate: '2025-02-01', status: 'Due' },
      { id: 'BILL-002', name: 'Generator Levy', amount: 80000, dueDate: '2025-01-25', status: 'Overdue' }
    ],
    'PROP-001': [
      { id: 'BILL-101', name: 'Water', amount: 25000, dueDate: '2025-02-10', status: 'Due' }
    ]
  },
  receipts: [
    {
      id: 'RCT-1001',
      propertyId: 'PROP-002',
      propertyName: '2 Bedroom Duplex in Ikoyi',
      type: 'Rent',
      amount: 3500000,
      method: 'Paystack',
      date: '2024-06-01',
      status: 'Paid'
    }
  ],
  history: [
    {
      id: 'HIS-1001',
      propertyId: 'PROP-002',
      propertyName: '2 Bedroom Duplex in Ikoyi',
      title: 'Rent payment successful',
      amount: 3500000,
      status: 'Paid',
      date: '2024-06-01 10:05'
    }
  ]
};

const PaymentsContext = createContext();

export const usePayments = () => {
  const ctx = useContext(PaymentsContext);
  if (!ctx) throw new Error('usePayments must be used within PaymentsProvider');
  return ctx;
};

export const PaymentsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const addReceipt = (receipt) => {
    setState((prev) => ({ ...prev, receipts: [receipt, ...prev.receipts] }));
  };

  const addHistory = (entry) => {
    setState((prev) => ({ ...prev, history: [entry, ...prev.history] }));
  };

  const updateRentStatus = (propertyId, status) => {
    setState((prev) => ({
      ...prev,
      rents: {
        ...prev.rents,
        [propertyId]: { ...prev.rents[propertyId], status }
      }
    }));
  };

  const updateBillStatus = (propertyId, billId, status) => {
    setState((prev) => ({
      ...prev,
      bills: {
        ...prev.bills,
        [propertyId]: (prev.bills[propertyId] || []).map((b) =>
          b.id === billId ? { ...b, status } : b
        )
      }
    }));
  };

  const value = useMemo(
    () => ({
      rents: state.rents,
      bills: state.bills,
      receipts: state.receipts,
      history: state.history,
      addReceipt,
      addHistory,
      updateRentStatus,
      updateBillStatus
    }),
    [state]
  );

  return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>;
};

export default PaymentsContext;
