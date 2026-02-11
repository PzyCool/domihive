// src/components/admin/layout/AdminLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';
import { AdminProvider } from '../../../context/AdminContext';
import DomihiveLogo from '../../../assets/domihive-logo.png';
import DomihiveIcon from '../../../assets/domihive-lcon.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Building2,
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
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
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

const AdminSidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => (
  <>
    {/* Mobile Overlay */}
    {isMobileOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
        onClick={() => setIsMobileOpen(false)}
      />
    )}

    <aside
      className={`admin-sidebar bg-white text-gray-600 h-screen fixed lg:sticky top-0 left-0 shrink-0 border-r border-gray-100 transition-all duration-300 z-50 
        ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20 lg:overflow-visible" : "lg:w-64 lg:overflow-y-auto"}
        w-64 overflow-y-auto
      `}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className={`p-4 h-16 border-b border-gray-100 flex items-center ${isCollapsed ? "lg:justify-center" : "justify-between"}`}>
          <div className="flex w-full justify-between items-center gap-3">
            {isCollapsed ? (
              <button
                onClick={() => setIsCollapsed(false)}
                className="hidden lg:block p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img src={DomihiveIcon} alt="Logo" className="h-8" />
              </button>
            ) : (
              <img src={DomihiveLogo} alt="Logo" className="h-8" />
            )}

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#9F7539] transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/admin"}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                  ? "bg-[#9F7539]/10 text-[#9F7539]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#0e1f42]"
                } ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`
              }
            >
              <div className="shrink-0">{<item.icon size={16} />}</div>
              <span className={isCollapsed ? "lg:hidden" : ""}>{item.label}</span>

              {/* Tooltip (Desktop only) */}
              {isCollapsed && (
                <div className="hidden lg:block absolute left-full ml-3 px-2 py-1 bg-[#0e1f42] text-white text-[10px] font-semibold rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none shadow-lg">
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0e1f42] rotate-45" />
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <NavLink
            to="/"
            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all ${isCollapsed ? "lg:justify-center lg:px-0" : ""
              }`}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={isCollapsed ? "lg:hidden" : ""}>Logout</span>

            {/* Tooltip (Desktop only) */}
            {isCollapsed && (
              <div className="hidden lg:block absolute left-full ml-3 px-2 py-1 bg-red-600 text-white text-[10px] font-semibold rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none shadow-lg">
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rotate-45" />
                Logout
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  </>
);

const AdminTopbar = ({ isCollapsed, setIsMobileOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  return (
    <header className="admin-topbar h-14 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between lg:justify-end px-4 sticky top-0 z-40 transition-all duration-300">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={16} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>


        {/* User Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {/* <div className="w-8 h-8 rounded-full bg-[#9F7539] text-white flex items-center justify-center font-bold text-sm">
              AD
            </div> */}
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              className='w-8 h-8 rounded-full object-cover' />

            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#0e1f42]">Admin User</p>
              <p className="text-[10px] text-gray-500">Super Admin</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">

              {dropDown.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Logout") {
                      navigate("/");
                    } else {
                      navigate(item.to);
                    }
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <item.icon size={16} className={item.label === 'Logout' ? 'text-red-500' : 'text-gray-400'} />
                  <span className={item.label === 'Logout' ? 'text-red-600' : ''}>{item.label}</span>
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="admin-layout flex min-h-screen bg-gray-50">
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <AdminTopbar isCollapsed={isCollapsed} setIsMobileOpen={setIsMobileOpen} />
          <main className="p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
