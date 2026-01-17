import React, { useState } from 'react';

const REASONS = [
  'Property too expensive',
  'Location not convenient',
  'Property condition not satisfactory',
  'Size doesn’t meet my needs',
  'Other reason'
];

const FeedbackModal = ({ application, onSubmit, onClose }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [notes, setNotes] = useState('');

  const toggleReason = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      reasons: selectedReasons,
      message: notes
    });
    onClose();
  };

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
        <h3 className="text-xl font-bold text-[#0e1f42] mb-3">Tell us why</h3>
        <p className="text-[#475467] mb-4">
          Your feedback helps us improve. Select all that apply.
        </p>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {REASONS.map(reason => (
            <button
              key={reason}
              onClick={() => toggleReason(reason)}
              className={`text-left border rounded-2xl px-4 py-2 transition-colors ${selectedReasons.includes(reason) ? 'border-[#0e1f42] bg-[#0e1f42]/10 text-[#0e1f42]' : 'border-gray-200 text-[#475467]'}`}
            >
              {reason}
            </button>
          ))}
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional details (optional)"
          className="w-full border border-gray-200 rounded-2xl p-3 text-sm text-[#475467] focus:outline-none focus:ring-2 focus:ring-[#0e1f42]/40"
          rows={3}
        ></textarea>
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-2xl border border-gray-200 text-[#475467] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedReasons.length === 0 && !notes.trim()}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
