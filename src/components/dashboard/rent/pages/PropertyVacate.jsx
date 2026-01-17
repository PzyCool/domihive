import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../contexts/PropertiesContext';

const PropertyVacate = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { properties, submitMoveOutNotice, scheduleMoveOutInspection } = useProperties();
  const property = useMemo(
    () => properties.find((p) => p.propertyId === propertyId),
    [properties, propertyId]
  );

  const [vacateForm, setVacateForm] = useState({ preferredDate: '', reason: '', notes: '' });
  const [inspectionForm, setInspectionForm] = useState({ date: '', time: '' });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[#64748b]">Property not found.</p>
      </div>
    );
  }

  const handleSubmitVacate = () => {
    if (!vacateForm.preferredDate) return;
    submitMoveOutNotice(property.propertyId, {
      ...vacateForm,
      submittedOn: new Date().toISOString().slice(0, 10)
    });
  };

  const handleScheduleInspection = () => {
    if (!inspectionForm.date || !inspectionForm.time) return;
    scheduleMoveOutInspection(property.propertyId, {
      scheduled: `${inspectionForm.date} ${inspectionForm.time}`,
      status: 'scheduled'
    });
  };

  return (
    <div className="rent-overview-container bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 space-y-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard/rent/my-properties')}
            className="text-2xl font-medium leading-none"
            style={{ color: 'var(--accent-color, #9F7539)' }}
          >
            ←
          </button>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-[#0e1f42]">Notice to Vacate</h1>
            <p className="text-sm text-[#475467]">
              {property.name} • {property.location}
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-sm space-y-6">
          <div className="space-y-3 text-sm text-[#475467]">
            <label className="flex flex-col gap-1">
              Preferred move-out date
              <input
                type="date"
                value={vacateForm.preferredDate}
                onChange={(e) => setVacateForm((p) => ({ ...p, preferredDate: e.target.value }))}
                className="border border-[#e2e8f0] rounded-lg px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              Reason (optional)
              <input
                value={vacateForm.reason}
                onChange={(e) => setVacateForm((p) => ({ ...p, reason: e.target.value }))}
                className="border border-[#e2e8f0] rounded-lg px-3 py-2"
                placeholder="Relocation, rent, etc."
              />
            </label>
            <label className="flex flex-col gap-1">
              Notes (optional)
              <textarea
                value={vacateForm.notes}
                onChange={(e) => setVacateForm((p) => ({ ...p, notes: e.target.value }))}
                className="border border-[#e2e8f0] rounded-lg px-3 py-2"
                rows={3}
                placeholder="Additional details"
              />
            </label>
            <button
              onClick={handleSubmitVacate}
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: 'var(--accent-color, #9F7539)' }}
            >
              Submit Notice
            </button>
          </div>

          <div className="space-y-3 text-sm text-[#475467] border-t border-[#e2e8f0] pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#0e1f42]">Schedule Move-out Inspection</h3>
              {property.moveOutInspection?.scheduled && (
                <span className="text-xs text-[#6c757d]">Scheduled: {property.moveOutInspection.scheduled}</span>
              )}
            </div>
            <label className="flex flex-col gap-1">
              Date
              <input
                type="date"
                value={inspectionForm.date}
                onChange={(e) => setInspectionForm((p) => ({ ...p, date: e.target.value }))}
                className="border border-[#e2e8f0] rounded-lg px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              Time
              <input
                type="time"
                value={inspectionForm.time}
                onChange={(e) => setInspectionForm((p) => ({ ...p, time: e.target.value }))}
                className="border border-[#e2e8f0] rounded-lg px-3 py-2"
              />
            </label>
            <button
              onClick={handleScheduleInspection}
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: 'var(--accent-color, #9F7539)' }}
            >
              Schedule Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyVacate;
