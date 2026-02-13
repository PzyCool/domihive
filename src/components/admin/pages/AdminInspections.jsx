// src/components/admin/pages/AdminInspections.jsx
import React from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminInspections = () => {
  const { inspections, setInspections } = useAdmin();

  const updateStatus = (id, status) => {
    setInspections((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mb-4">Inspections</h1>
      <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 rounded-lg shadow p-4">
        <div className="overflow-x-auto text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b dark:border-white/5 text-gray-600 dark:text-gray-400">
                <th className="py-2 pr-2 text-left">Tenant</th>
                <th className="py-2 pr-2 text-left">Property</th>
                <th className="py-2 pr-2 text-left">Date</th>
                <th className="py-2 pr-2 text-left">Time</th>
                <th className="py-2 pr-2 text-left">Status</th>
                <th className="py-2 pr-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((insp) => (
                <tr key={insp.id} className="border-b dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-2 pr-2 font-semibold text-[#0e1f42] dark:text-white">{insp.tenant}</td>
                  <td className="py-2 pr-2 text-gray-700 dark:text-gray-300">{insp.propertyTitle}</td>
                  <td className="py-2 pr-2 text-gray-700 dark:text-gray-300">{insp.date}</td>
                  <td className="py-2 pr-2 text-gray-700 dark:text-gray-300">{insp.time}</td>
                  <td className="py-2 pr-2">
                    <span className={`px-2 py-1 rounded text-xs ${insp.status === 'Verified' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : insp.status === 'No-show' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'}`}>
                      {insp.status}
                    </span>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(insp.id, 'Verified')} className="text-[#0e1f42] dark:text-[#9F7539] hover:underline cursor-pointer">Verify</button>
                      <button onClick={() => updateStatus(insp.id, 'No-show')} className="text-red-600 dark:text-red-400 hover:underline cursor-pointer">No-show</button>
                    </div>
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

export default AdminInspections;
