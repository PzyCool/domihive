// src/context/DashboardContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const defaultDashboards = [
  { id: 'rent', name: 'For Rent', icon: 'home', description: 'Manage rental units', enabled: true },
  { id: 'buy', name: 'Buy', icon: 'money-bill-wave', description: 'Buy properties', enabled: false },
  { id: 'commercial', name: 'Commercial', icon: 'building', description: 'Commercial spaces', enabled: false },
  { id: 'shortlet', name: 'Shortlets', icon: 'hotel', description: 'Short-term stays', enabled: false }
];

export const DashboardProvider = ({ children }) => {
  const [currentDashboard, setCurrentDashboard] = useState('rent');

  const availableDashboards = useMemo(() => defaultDashboards, []);

  const switchDashboard = (dashboardId) => {
    if (!dashboardId) return;
    setCurrentDashboard(dashboardId);
    try {
      localStorage.setItem('domihive_last_dashboard', dashboardId);
    } catch (error) {
      console.error('Unable to persist dashboard selection', error);
    }
  };

  useEffect(() => {
    try {
      const storedDashboard = localStorage.getItem('domihive_last_dashboard');
      if (storedDashboard) {
        setCurrentDashboard(storedDashboard);
      }
    } catch (error) {
      console.error('Unable to load dashboard selection', error);
    }
  }, []);

  const getAvailableDashboards = () => availableDashboards;

  const value = {
    currentDashboard,
    switchDashboard,
    getAvailableDashboards
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
