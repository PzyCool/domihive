// src/components/admin/pages/AdminApplications.jsx
import React from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminApplications = () => {
  const { applications, setApplications } = useAdmin();

  const updateStatus = (id, status) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const rows = applications.map((app) => {
    const submittedDate = new Date(app.submittedAt);
    const due = new Date(submittedDate.getTime() + 72 * 60 * 60 * 1000);
    const now = new Date();
    const hoursLeft = Math.max(0, Math.round((due - now) / (1000 * 60 * 60)));
    return { ...app, hoursLeft };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] mb-4">Applications</h1>
      <div className="bg-white border border-gray-100 rounded-lg shadow p-4">
        <div className="overflow-x-auto text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-2 text-left">Applicant</th>
                <th className="py-2 pr-2 text-left">Property</th>
                <th className="py-2 pr-2 text-left">Submitted</th>
                <th className="py-2 pr-2 text-left">SLA</th>
                <th className="py-2 pr-2 text-left">Status</th>
                <th className="py-2 pr-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((app) => (
                <tr key={app.id} className="border-b last:border-0">
                  <td className="py-2 pr-2 font-semibold text-[#0e1f42]">{app.applicant}</td>
                  <td className="py-2 pr-2 text-gray-700">{app.propertyTitle}</td>
                  <td className="py-2 pr-2 text-gray-700">{new Date(app.submittedAt).toLocaleString()}</td>
                  <td className="py-2 pr-2 text-gray-700">Due in {app.hoursLeft}h</td>
                  <td className="py-2 pr-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(app.id, 'Under Review')} className="text-[#0e1f42] hover:underline">Review</button>
                      <button onClick={() => updateStatus(app.id, 'Approved')} className="text-green-700 hover:underline">Approve</button>
                      <button onClick={() => updateStatus(app.id, 'Rejected')} className="text-red-600 hover:underline">Reject</button>
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

export default AdminApplications;
