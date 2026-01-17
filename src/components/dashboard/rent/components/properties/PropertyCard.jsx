import React from 'react';

const statusStyles = {
  PENDING_MOVE_IN: 'bg-amber-100 text-amber-800 border border-amber-200',
  ACTIVE: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  ENDED: 'bg-gray-100 text-gray-700 border border-gray-200'
};

const statusLabel = {
  PENDING_MOVE_IN: 'Pending Move-in',
  ACTIVE: 'Active',
  ENDED: 'Ended'
};

const quickActionsForStatus = (status) => {
  if (status === 'PENDING_MOVE_IN') {
    return [
      { label: 'Complete Move-in Checklist', action: 'movein' }
    ];
  }
  if (status === 'ACTIVE') {
    return [
      { label: 'Property Overview', action: 'details' },
      { label: 'Payment History', action: 'payments' }
    ];
  }
  return [];
};

const PropertyCard = ({ property, onAction }) => {
  const actions = quickActionsForStatus(property.tenancyStatus);
  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#e2e8f0] p-5 flex flex-col gap-4">
      <div className="flex gap-4">
        <img
          src={property.image || property.property?.image || 'https://via.placeholder.com/140x100?text=DomiHive'}
          alt={property.name}
          className="w-36 h-24 rounded-xl object-cover border border-[#e2e8f0] flex-shrink-0"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-[#0e1f42]">{property.name}</h3>
              <p className="text-sm text-[#475467]">{property.location}</p>
              <p className="text-xs text-[#6c757d]">{property.unitType}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[property.tenancyStatus] || statusStyles.PENDING_MOVE_IN}`}>
              {statusLabel[property.tenancyStatus] || property.tenancyStatus}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#475467]">
            <div>
              <p className="text-xs text-[#6c757d]">Lease</p>
              <p className="font-semibold text-[#0e1f42]">
                {property.leaseStart} - {property.leaseEnd}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6c757d]">Next Payment</p>
              <p className="font-semibold text-[#0e1f42]">
                {property.nextPayment?.dueDate || 'N/A'} {property.nextPayment?.status ? `• ${property.nextPayment.status}` : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.action}
            onClick={() => onAction(property, action.action)}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white shadow-sm bg-gradient-to-r from-[var(--primary-color,#0e1f42)] to-[#1a2d5f] hover:from-[#1a2d5f] hover:to-[var(--primary-color,#0e1f42)] transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyCard;
