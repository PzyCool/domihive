// src/components/admin/layout/AdminLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';
import { AdminProvider } from '../../../context/AdminContext';
import DomihiveLogo from '../../../assets/domihive-logo.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Building2,
  MapPin,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Users,
  BookOpen,
  Bell,
  House,
  Wallet,
  Wrench,
  ChartLine,
  Settings,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/clients', label: 'Clients', icon: Users },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
  { to: '/admin/inspections', label: 'Inspections', icon: ClipboardCheck },
  { to: '/admin/applications', label: 'Applications', icon: FileText },
  { to: '/admin/tenants', label: 'Tenants', icon: House },
  { to: '/admin/payments', label: 'Payments', icon: Wallet },
  { to: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/admin/reports', label: 'Reports', icon: ChartLine },
  { to: '/admin/settings', label: 'Settings', icon: Settings },

  // { to: '/admin/inspection-slots', label: 'Inspections', icon: CalendarDays },
  // { to: '/admin/locations-filters', label: 'Locations & Filters', icon: MapPin },
  // { to: '/admin/content-policies', label: 'Content & Policies', icon: BookOpen }
];

const notifications = [
  {}, {},
];

const dropDown = [
  { label: 'Profile', to: '/admin/profile', icon: User },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
  { label: 'Logout', to: '', icon: LogOut },
];

const AdminSidebar = () => (
  <aside className="admin-sidebar w-64 bg-white text-gray-600 h-screen sticky top-0 overflow-y-auto shrink-0 border-r border-gray-100">
    <div className="px-4 py-3 border-b border-gray-100 flex ">
      <img src={DomihiveLogo} alt="DomiHive Logo" className="h-8" />
    </div>
    <nav className="p-3 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-[#9F7539]/10 text-(--accent-color)' : 'text-gray-600 hover:bg-[#9F7539]/10 hover:text-(--accent-color)'
            }`
          }
        >
          <item.icon size={16} className="text-sm" />
          <span className="text-sm">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

const AdminTopbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const navigate = useNavigate();

  return (
    <header className="admin-topbar h-14 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-end px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Bell size={18} className="text-gray-500" />
          {notifications.length > 0 && (
            <span className="absolute -top-2.5 -right-2.5 min-w-4 h-4 px-1 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer transition"
          >
            {/* Dummy image for now */}
            <img src="https://picsum.photos/id/237/200/300" alt="" className='w-8 h-8  rounded-full object-cover' />

            <div className="flex flex-col leading-tight text-left">
              <div className="text-sm text-gray-700">Adebayo O.</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>

            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
              {dropDown.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <item.icon size={16} className={`${item.label === 'Logout' ? 'text-red-500' : 'text-gray-500'}`} />
                  <span className={`${item.label === 'Logout' ? 'text-red-500' : ''}`}>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
    </div>
  </header>
  );
};

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
    </AdminProvider>
  );
};

export default AdminLayout;
