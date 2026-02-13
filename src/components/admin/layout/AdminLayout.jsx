// src/components/admin/layout/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import { AdminProvider } from '../../../context/AdminContext';
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="admin-layout flex min-h-screen dark:bg-[#0e1f42] bg-gray-50">
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <div className="admin-page-wrapper flex-1 flex flex-col min-w-0 transition-all duration-300">
          <AdminHeader isCollapsed={isCollapsed} setIsMobileOpen={setIsMobileOpen} />
          <main className="admin-page-container md:p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;