import React from 'react';

const statusColors = {
  SUBMITTED: 'bg-gray-100 text-gray-800',
  UNDER_REVIEW: 'bg-blue-100 text-blue-800',
  QUOTE_SHARED: 'bg-amber-100 text-amber-800',
  AWAITING_APPROVAL: 'bg-amber-100 text-amber-800',
  SCHEDULED: 'bg-indigo-100 text-indigo-800',
  IN_PROGRESS: 'bg-sky-100 text-sky-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-gray-200 text-gray-600'
};

const TicketDetailsModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-[#6c757d]">{ticket.propertyName}</p>
            <h2 className="text-xl font-semibold text-[#0e1f42]">{ticket.title}</h2>
            <p className="text-sm text-[#475467] mt-1">{ticket.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800'}`}>
              {ticket.status.replace('_', ' ')}
            </span>
            <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-[#f8fafc] border border-[#e2e8f0] text-[#0e1f42]">
              {ticket.responsibility || 'Pending Assessment'}
            </span>
            {ticket.priority === 'Emergency' && (
              <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-700 border border-red-200">
                Emergency
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-sm text-[#475467] mb-4">
          <div>
            <p className="text-xs text-[#6c757d]">Category</p>
            <p className="font-semibold text-[#0e1f42]">{ticket.category}</p>
          </div>
          <div>
            <p className="text-xs text-[#6c757d]">Created</p>
            <p className="font-semibold text-[#0e1f42]">{ticket.createdAt}</p>
          </div>
          {ticket.scheduledVisit && (
            <div>
              <p className="text-xs text-[#6c757d]">Scheduled Visit</p>
              <p className="font-semibold text-[#0e1f42]">{ticket.scheduledVisit}</p>
            </div>
          )}
          {ticket.quote && (
            <div>
              <p className="text-xs text-[#6c757d]">Quote</p>
              <p className="font-semibold text-[#0e1f42]">₦{ticket.quote.amount?.toLocaleString() || 0}</p>
              <p className="text-xs text-[#6c757d]">{ticket.quote.note}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#0e1f42]">Timeline</p>
          <div className="space-y-2 text-sm text-[#475467]">
            {(ticket.updates || []).map((u, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--accent-color,#9F7539)] mt-1"></div>
                <div>
                  <p className="font-semibold text-[#0e1f42]">{u.status.replace('_', ' ')}</p>
                  <p>{u.note}</p>
                  <p className="text-xs text-[#6c757d]">{u.at}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
