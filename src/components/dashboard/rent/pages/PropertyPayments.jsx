import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../contexts/PropertiesContext';

const formatNaira = (amt) => (amt || amt === 0 ? `₦${amt.toLocaleString()}` : '—');

const PropertyPayments = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { properties } = useProperties();
  const [filter, setFilter] = React.useState('all'); // all | rent | bills

  const property = useMemo(
    () => properties.find((p) => p.propertyId === propertyId),
    [properties, propertyId]
  );

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[#64748b]">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="rent-overview-container bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-6 property-payments-page">
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 space-y-6 max-w-6xl mx-auto">
        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard/rent/my-properties')}
            className="text-2xl font-medium leading-none"
            style={{ color: 'var(--accent-color, #9F7539)' }}
          >
            ←
          </button>
          <div className="flex flex-wrap justify-between gap-3 items-start">
            <div>
              <h1 className="text-2xl font-semibold text-[#0e1f42]">Payment History</h1>
              <p className="text-sm text-[#475467]">
                {property.name} • {property.location}
              </p>
            </div>
            {property.nextPayment && (
              <div className="text-sm text-[#475467] bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 property-payment-next">
                <p className="text-xs text-[#6c757d]">Next payment</p>
                <p className="font-semibold text-[var(--accent-color,#9F7539)]">
                  {formatNaira(property.nextPayment.amount)} • {property.nextPayment.dueDate}
                </p>
                <p className="text-xs text-[#9f7539] font-semibold">{property.nextPayment.status}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex gap-2">
              {['all', 'rent', 'bills'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold border transition-colors property-payment-tab ${filter === tab ? 'active' : ''}`}
                >
                  {tab === 'all' ? 'All Payments' : tab === 'rent' ? 'Rent' : 'Bills'}
                </button>
              ))}
            </div>
            <button className="text-sm text-[var(--accent-color,#9F7539)] font-semibold">
              Download receipts
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-xs text-[#6c757d]">
                <tr>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Receipt</th>
                </tr>
              </thead>
              <tbody className="text-[#475467]">
                {(property.payments || [])
                  .filter((pay) => {
                    if (filter === 'all') return true;
                    if (filter === 'rent') return pay.type === 'rent' || pay.description?.toLowerCase().includes('rent');
                    return pay.type === 'bill' || pay.description?.toLowerCase().includes('bill');
                  })
                  .map((pay) => (
                    <tr key={pay.id} className="border-t border-[#e2e8f0]">
                      <td className="py-2 pr-4">{pay.date}</td>
                      <td className="py-2 pr-4">{pay.description}</td>
                      <td className="py-2 pr-4 font-semibold text-[var(--accent-color,#9F7539)]">{formatNaira(pay.amount)}</td>
                      <td className="py-2 pr-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${pay.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} property-payment-status`}
                        >
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-2">
                        <button className="text-sm text-[var(--accent-color,#9F7539)] font-semibold">Download</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPayments;
