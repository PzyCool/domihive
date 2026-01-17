import React from 'react';

const ApplicationSuccessModal = ({ application, onClose, onTrack, onDashboard }) => {
  if (!application) return null;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="text-center space-y-3">
          <i className="fas fa-check-circle text-4xl text-[#0e1f42]"></i>
          <h3 className="text-2xl font-bold text-[#0e1f42]">Application submitted successfully!</h3>
          <p className="text-sm text-[#475467]">
            Review takes up to 72 hours. We will notify you once the status changes.
          </p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onDashboard}
            className="flex-1 bg-white border border-[#e2e8f0] rounded-2xl py-3 font-semibold text-[#0e1f42]"
          >
            Back to Dashboard
          </button>
          <button
            onClick={onTrack}
            className="flex-1 bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white rounded-2xl py-3 font-semibold"
          >
            Track Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccessModal;
