import React from 'react';

const InspectionGateModal = ({ application, onAttended, onMissed, onClose }) => {
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
        <h3 className="text-xl font-bold text-[#0e1f42] mb-3">Did you attend your inspection?</h3>
        <p className="text-[#475467] mb-5">
          {`Inspection for ${application.property.title} was scheduled on ${application.inspectionDate}.`}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onAttended}
            className="w-full bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white rounded-2xl py-3 font-semibold hover:from-[#1a2d5f] hover:to-[#0e1f42] transition-colors"
          >
            Yes, I inspected
          </button>
          <button
            onClick={onMissed}
            className="w-full border border-gray-200 text-[#0e1f42] rounded-2xl py-3 font-semibold hover:bg-gray-50 transition-colors"
          >
            No, I missed it
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionGateModal;
