// src/components/admin/pages/AdminTenants.jsx
import React from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminTenants = () => {
  const { tenants, setTenants } = useAdmin();

  const confirmMoveIn = (id) => {
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Active' } : t)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] mb-4">Tenants</h1>
      <div className="bg-white border border-gray-100 rounded-lg shadow p-4">
        <div className="overflow-x-auto text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-2 text-left">Tenant</th>
                <th className="py-2 pr-2 text-left">Property</th>
                <th className="py-2 pr-2 text-left">Lease</th>
                <th className="py-2 pr-2 text-left">Status</th>
                <th className="py-2 pr-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-b last:border-0">
                  <td className="py-2 pr-2 font-semibold text-[#0e1f42]">{tenant.name}</td>
                  <td className="py-2 pr-2 text-gray-700">{tenant.propertyTitle}</td>
                  <td className="py-2 pr-2 text-gray-700">{tenant.leaseStart} → {tenant.leaseEnd}</td>
                  <td className="py-2 pr-2">
                    <span className={`px-2 py-1 rounded text-xs ${tenant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="py-2 pr-2">
                    {tenant.status !== 'Active' && (
                      <button onClick={() => confirmMoveIn(tenant.id)} className="text-[#0e1f42] hover:underline">
                        Confirm Move-in
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTenants;
