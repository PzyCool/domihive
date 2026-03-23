// src/components/admin/layout/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import { AdminProvider } from '../../../context/AdminContext';
import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [sidebarState, setSidebarState] = useState('expanded');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarState('collapsed');
      } else {
        const savedState = localStorage.getItem('domihive_admin_sidebar_state');
        if (savedState && ['expanded', 'collapsed'].includes(savedState)) {
          setSidebarState(savedState);
        } else {
          setSidebarState('expanded');
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('domihive_admin_sidebar_state', sidebarState);
    }
  }, [sidebarState, isMobile]);

  const toggleSidebar = () => {
    setSidebarState((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
  };

  const closeMobileSidebar = () => {
    if (isMobile) setSidebarState('collapsed');
  };

  const getMainMargin = () => {
    if (isMobile) return 'ml-0';
    return sidebarState === 'expanded' ? 'ml-64' : 'ml-20';
  };

  return (
    <AdminProvider>
      <div className="admin-layout flex h-screen overflow-hidden dark:bg-[#0e1f42] bg-gray-50">
        <AdminSidebar
          sidebarState={sidebarState}
          toggleSidebar={toggleSidebar}
          closeMobileSidebar={closeMobileSidebar}
          isMobile={isMobile}
        />

        <div className={`admin-page-wrapper flex-1 flex flex-col h-screen min-w-0 overflow-hidden transition-all duration-300 ${getMainMargin()}`}>
          <AdminHeader
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />

          <main className="admin-page-container flex-1 overflow-auto md:p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
