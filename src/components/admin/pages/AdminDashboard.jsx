// src/components/admin/pages/AdminDashboard.jsx
import React from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminDashboard = () => {
  const { properties, inspections, applications, tenants } = useAdmin();

  const summaryCards = [
    { label: 'Properties', value: properties.length, meta: `${properties.filter(p => p.status === 'Published').length} published / ${properties.filter(p => p.status !== 'Published').length} draft` },
    { label: 'Inspection Bookings', value: inspections.filter(i => i.status === 'Scheduled').length, meta: 'Upcoming' },
    { label: 'Applications', value: applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length, meta: 'Pending review' },
    { label: 'Tenants', value: tenants.length, meta: `${tenants.filter(t => t.status === 'Active').length} active` }
  ];

  const recentActivity = [
    'Property “3 Bedroom Luxury Apartment” published',
    'Inspection verified for Jane Smith',
    'Application app-001 moved to Submitted'
  ];

  const pendingItems = [
    'Review 2 pending applications',
    'Verify today’s inspections',
    'Publish draft property “Modern 2-Bed Duplex”'
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg p-4 shadow border border-gray-100">
            <div className="text-sm text-gray-500">{card.label}</div>
            <div className="text-2xl font-bold text-[#0e1f42]">{card.value}</div>
            <div className="text-xs text-gray-600">{card.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
          <h3 className="font-semibold text-[#0e1f42] mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            {recentActivity.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
          <h3 className="font-semibold text-[#0e1f42] mb-3">Pending Items</h3>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            {pendingItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
