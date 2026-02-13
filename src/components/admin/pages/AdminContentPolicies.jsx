// src/components/admin/pages/AdminContentPolicies.jsx
import React from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminContentPolicies = () => {
  const { policies, setPolicies } = useAdmin();

  const updateField = (field, value) => {
    setPolicies((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mb-4">Content & Policies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 rounded-lg shadow p-4 space-y-3 transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white">Inspection Booking Content</h3>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Documents (one per line)</label>
            <textarea className="w-full border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none focus:border-[#9F7539]" rows={4} value={policies.requiredDocs} onChange={(e) => updateField('requiredDocs', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Verification Process</label>
            <textarea className="w-full border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none focus:border-[#9F7539]" rows={3} value={policies.verificationProcess} onChange={(e) => updateField('verificationProcess', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Terms & Conditions</label>
            <textarea className="w-full border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none focus:border-[#9F7539]" rows={3} value={policies.terms} onChange={(e) => updateField('terms', e.target.value)} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 rounded-lg shadow p-4 space-y-3 transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white">Maintenance Policy</h3>
          <textarea className="w-full border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none focus:border-[#9F7539]" rows={10} value={policies.maintenance} onChange={(e) => updateField('maintenance', e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default AdminContentPolicies;
