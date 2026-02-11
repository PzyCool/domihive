// src/components/admin/layout/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AdminProvider } from '../../../context/AdminContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'fas fa-th-large', end: true },
  { to: '/admin/properties', label: 'Properties', icon: 'fas fa-building' },
  { to: '/admin/locations-filters', label: 'Locations & Filters', icon: 'fas fa-map-marker-alt' },
  { to: '/admin/inspection-slots', label: 'Inspection Slots', icon: 'fas fa-calendar-alt' },
  { to: '/admin/inspections', label: 'Inspections', icon: 'fas fa-clipboard-check' },
  { to: '/admin/applications', label: 'Applications', icon: 'fas fa-file-alt' },
  { to: '/admin/tenants', label: 'Tenants', icon: 'fas fa-users' },
  { to: '/admin/content-policies', label: 'Content & Policies', icon: 'fas fa-book' }
];

const AdminSidebar = () => (
  <aside className="admin-sidebar w-64 bg-[#0E1F42] text-white min-h-screen flex-shrink-0">
    <div className="p-4 text-lg font-bold border-b border-white/10">DomiHive Admin</div>
    <nav className="p-3 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          <i className={`${item.icon} text-sm`}></i>
          <span className="text-sm">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

const AdminTopbar = () => (
  <header className="admin-topbar h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
    <div className="text-sm text-gray-600">Super Admin</div>
    <div className="flex items-center gap-3">
      <i className="fas fa-bell text-gray-500"></i>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#9F7539] text-white flex items-center justify-center">SA</div>
        <div className="text-sm text-gray-700">Admin</div>
      </div>
    </div>
  </header>

);

const AdminLayout = () => {
  return (
    <AdminProvider>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col bg-[#f8fafc] min-h-screen">
          <AdminTopbar />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <div></div>
    </AdminProvider>
  );
};

export default AdminLayout;
