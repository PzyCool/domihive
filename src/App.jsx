// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/home/layout/Header';
import Footer from './components/home/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import FinalCta from './components/home/FinalCta';
import Properties from './components/home/Properties';
import HowItWorks from './components/home/HowItWorks';
import OurSecurity from './components/home/OurSecurity';
import SignupPage from './components/auth/pages/SignupPage';
import LoginPage from './components/auth/pages/LoginPage';
import RentOverview from './components/dashboard/rent/pages/RentOverview';
import RentBrowse from './components/dashboard/rent/pages/RentBrowse';
import DashboardLayout from './components/dashboard/layout/DashboardLayout';
import RentApplications from './components/dashboard/rent/pages/RentApplications';
import ApplicationStartPage from './components/dashboard/rent/pages/ApplicationStartPage';
import ApplicationPaymentPage from './components/dashboard/rent/pages/ApplicationPaymentPage';
import ApplicationTrackPage from './components/dashboard/rent/pages/ApplicationTrackPage';
import MyProperties from './components/dashboard/rent/pages/MyProperties';
import PropertyDashboard from './components/dashboard/rent/pages/PropertyDashboard';
import PropertyPayments from './components/dashboard/rent/pages/PropertyPayments';
import PropertyVacate from './components/dashboard/rent/pages/PropertyVacate';
import MaintenancePage from './components/dashboard/rent/pages/MaintenancePage';
import MaintenanceDetailPage from './components/dashboard/rent/pages/MaintenanceDetailPage';
import MaintenancePolicyPage from './components/dashboard/rent/pages/MaintenancePolicyPage';
import PaymentsPage from './components/dashboard/rent/pages/PaymentsPage';
import MessagesPage from './components/dashboard/rent/pages/MessagesPage';
import SettingsPage from './components/dashboard/pages/SettingsPage';
import FavoritesPage from './components/dashboard/rent/pages/FavoritesPage';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import AdminProperties from './components/admin/pages/AdminProperties';
import AdminLocationsFilters from './components/admin/pages/AdminLocationsFilters';
import AdminInspectionSlots from './components/admin/pages/AdminInspectionSlots';
import AdminInspections from './components/admin/pages/AdminInspections';
import AdminApplications from './components/admin/pages/AdminApplications';
import AdminTenants from './components/admin/pages/AdminTenants';
import AdminContentPolicies from './components/admin/pages/AdminContentPolicies';
import AdminAddNewProperty from './components/admin/pages/AdminAddNewProperty';
import './App.css';
import NotFound from './components/NotFound';
import AdminPropertyDetails from './components/admin/pages/AdminPropertyDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Homepage with Header and Footer */}
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <About />
              <Properties />
              <HowItWorks />
              <OurSecurity />
              <FinalCta />
            </main>
            <Footer />
          </>
        } />

        {/* Not found pages for testing */}
        <Route path='*' element={<NotFound />} />

        {/* Auth pages without Header/Footer */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="locations-filters" element={<AdminLocationsFilters />} />
          <Route path="inspection-slots" element={<AdminInspectionSlots />} />
          <Route path="inspections" element={<AdminInspections />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="tenants" element={<AdminTenants />} />
          <Route path="content-policies" element={<AdminContentPolicies />} />

          {/* Route for adding new properties */}
          <Route path="properties/add-new-property" element={<AdminAddNewProperty />} />
          {/* Route for property details */}
          <Route path="properties/unit/:unitId" element={<AdminPropertyDetails />} />
        </Route>


        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="rent/overview" replace />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="rent">
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<RentOverview />} />
            <Route path="browse" element={<RentBrowse />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="applications" element={<RentApplications />} />
            <Route path="applications/:applicationId/start" element={<ApplicationStartPage />} />
            <Route path="applications/:applicationId/payment" element={<ApplicationPaymentPage />} />
            <Route path="applications/:applicationId/track" element={<ApplicationTrackPage />} />
            <Route path="my-properties" element={<MyProperties />} />
            <Route path="my-properties/:propertyId" element={<PropertyDashboard />} />
            <Route path="my-properties/:propertyId/payments" element={<PropertyPayments />} />
            <Route path="my-properties/:propertyId/vacate" element={<PropertyVacate />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="maintenance/:ticketId" element={<MaintenanceDetailPage />} />
            <Route path="maintenance/policy" element={<MaintenancePolicyPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;