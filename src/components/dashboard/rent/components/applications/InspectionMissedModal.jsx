import React from 'react';

const InspectionMissedModal = ({ application, onReschedule, onCancel, onClose }) => {
  if (!application) return null;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <i className="fas fa-times"></i>
        </button>
        <h3 className="text-xl font-bold text-[#0e1f42] mb-3">Inspection Required</h3>
        <p className="text-[#475467] mb-3">
          Please complete your physical inspection before proceeding. Current date: {application.inspectionDate}.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onReschedule?.();
              onClose();
            }}
            className="w-full bg-[#0e1f42] text-white rounded-2xl py-3 font-semibold hover:bg-[#1a2d5f] transition-colors"
          >
            Reschedule Inspection
          </button>
          <button
            onClick={() => {
              onCancel?.();
              onClose();
            }}
            className="w-full border border-gray-200 text-[#9F1F3A] rounded-2xl py-3 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionMissedModal;
