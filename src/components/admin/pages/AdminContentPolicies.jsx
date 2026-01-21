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
      <h1 className="text-2xl font-bold text-[#0e1f42] mb-4">Content & Policies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-lg shadow p-4 space-y-3">
          <h3 className="font-semibold text-[#0e1f42]">Inspection Booking Content</h3>
          <div>
            <label className="text-sm font-medium text-gray-700">Required Documents (one per line)</label>
            <textarea className="w-full border rounded p-2 text-sm" rows={4} value={policies.requiredDocs} onChange={(e) => updateField('requiredDocs', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Verification Process</label>
            <textarea className="w-full border rounded p-2 text-sm" rows={3} value={policies.verificationProcess} onChange={(e) => updateField('verificationProcess', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Terms & Conditions</label>
            <textarea className="w-full border rounded p-2 text-sm" rows={3} value={policies.terms} onChange={(e) => updateField('terms', e.target.value)} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg shadow p-4 space-y-3">
          <h3 className="font-semibold text-[#0e1f42]">Maintenance Policy</h3>
          <textarea className="w-full border rounded p-2 text-sm" rows={10} value={policies.maintenance} onChange={(e) => updateField('maintenance', e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default AdminContentPolicies;
