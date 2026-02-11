// src/components/admin/pages/AdminDashboard.jsx
import React from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { Building2, Calendar, Eye, FileText, Plus, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // colors for the recent activitities table
  const statusStyles = {
    approved: "bg-green-100 text-green-700",
    verified: "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
    "in progress": "bg-yellow-100 text-yellow-700",
    new: "bg-purple-100 text-purple-700",
    pending: "bg-orange-100 text-orange-700"
  };

  const { properties, inspections, applications, tenants, recentActivities } = useAdmin();

  const summaryCards = [
    {
      label: 'Active Properties',
      value: properties.length,
      meta: `${properties.filter(p => p.status === 'Published').length} published / ${properties.filter(p => p.status !== 'Published').length} draft`,
      icon: <Building2 />,
      color: 'bg-gray-100 text-gray-700'
    },
    {
      label: 'Occupied Units',
      value: tenants.length > 0 ? Math.round((tenants.filter(t => t.status === 'Active').length / tenants.length) * 100) + '%' : '0%',
      meta: `${tenants.filter(t => t.status === 'Active').length} of ${tenants.length} units`,
      icon: <User />,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Pending Applications',
      value: applications.filter(a => a.status === 'Under Review').length,
      meta: `${applications.filter(a => a.status === 'Submitted').length} application submitted`,
      icon: <FileText />,
      color: 'bg-yellow-100 text-yellow-700'
    },

    {
      label: "Today's Inspections",
      value: inspections.filter(i => i.status === 'Scheduled').length,
      meta: 'Upcoming',
      icon: <Calendar />,
      color: 'bg-blue-100 text-blue-700'
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] mb-2">Dashboard Overview</h1>
      <p className="text-sm text-gray-600 mb-8">Welcome back Adebayo. Here's what's happening with your properties today.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg p-4 shadow border border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{card.label}</div>
              <div className="text-2xl font-bold text-[#0e1f42]">{card.value}</div>
              <div className="text-xs text-gray-600">{card.meta}</div>
            </div>
            <div className={`${card.color} rounded-lg p-2`}>
              <div className="text-2xl font-bold">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3.5fr_6.5fr] items-start gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
          <h3 className="font-semibold text-[#0e1f42] mb-4">Quick Actions</h3>
          <div className='flex flex-col gap-4'>
            <button onClick={() => navigate('/admin/properties/add-new-property')} className='bg-[#9F7539] text-sm  text-white w-full hover:bg-[#b58a4a] p-3 rounded-lg cursor-pointer transition duration-300 flex items-center gap-2 font-semibold'>
              <Plus size={20} />
              Add Property
            </button>
            <button onClick={() => navigate('/admin/clients')} className='text-[#9F7539] text-sm bg-white w-full border p-3 rounded-lg cursor-pointer transition duration-300 flex items-center gap-2 font-semibold'>
              <UserPlus size={20} />
              Create Client
            </button>
            <button onClick={() => navigate('/admin/applications')} className='border border-gray-200 text-sm hover:border-gray-500 cursor-pointer text-gray-600 w-full rounded-lg p-3 transition duration-300 flex items-center gap-2 font-semibold'>
              <Eye size={20} />
              View Applications
            </button>
          </div>
        </div>

        {/* recent activitities */}
        <div className="bg-white rounded-lg p-4 shadow border border-gray-100 max-h-[600px] overflow-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#9f7539 transparent' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0e1f42]">Recent Activity</h3>
            <p className="text-[#9F7539] hover:text-[#b58a4a] cursor-pointer text-xs font-medium">
              View All
            </p>
          </div>

          <ul className="space-y-4">
            {recentActivities.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#0e1f42]">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.details}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[10px] capitalize px-2 py-0.5 rounded-full font-medium ${statusStyles[item.status] || "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {item.status}
                  </span>

                  <span className="text-[10px] text-gray-400">
                    {item.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
