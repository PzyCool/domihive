import React from 'react';

const PaymentTabs = ({ active, onChange }) => {
  const tabs = [
    { id: 'pay', label: 'Pay Now' },
    { id: 'receipts', label: 'Receipts' },
    { id: 'history', label: 'History' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-semibold border transition-colors`}
          style={{
            borderRadius: '8px',
            borderColor: active === tab.id ? 'var(--accent-color, #9F7539)' : 'var(--primary-color, #0e1f42)',
            color: active === tab.id ? 'var(--accent-color, #9F7539)' : '#fff',
            backgroundColor: active === tab.id ? '#fff7ed' : 'var(--primary-color, #0e1f42)'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default PaymentTabs;
