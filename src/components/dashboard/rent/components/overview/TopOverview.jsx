// src/components/dashboard/rent/components/overview/TopOverview.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TopOverview = () => {
  const navigate = useNavigate();

  // ========== STATS (merged card) ==========
  const [stats] = useState({
    activeProperties: 2,
    daysUntilPayment: 15,
    occupancyRate: '85%',
    nextPaymentAmount: '100,000'
  });

  // ========== RECENTLY VIEWED PROPERTY SECTION ==========
  const [isFavorite, setIsFavorite] = useState(false);

  const property = {
    id: 'recent_001',
    title: '3 Bedroom Luxury Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: 'ƒ,İ2,800,000/year',
    bedrooms: 3,
    bathrooms: 3,
    size: '180 sqm',
    image: 'https://images.unsplash.com/photo-1545323157-f6f63c0d66a7?w=800&h=600&fit=crop',
    viewedAt: '2 hours ago'
  };

  const features = [
    { icon: 'bed', label: 'Bedrooms', value: property.bedrooms },
    { icon: 'bath', label: 'Bathrooms', value: property.bathrooms },
    { icon: 'ruler-combined', label: 'Size', value: property.size },
    { icon: 'tag', label: 'Price', value: property.price }
  ];

  // ========== TIMELINE CALENDAR SECTION ==========
  const [view, setView] = useState('month');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const events = [
    { date: '2024-01-15', type: 'rented', title: 'Moved into Ikeja Apartment', color: 'bg-green-500' },
    { date: '2024-03-01', type: 'rented', title: 'Started renting VI Studio', color: 'bg-green-500' },
    { date: '2024-06-10', type: 'inspection', title: 'Property Inspection', color: 'bg-blue-500' },
    { date: '2024-09-05', type: 'payment', title: 'Quarterly Payment Due', color: 'bg-amber-500' },
    { date: '2025-01-14', type: 'renewal', title: 'Lease Renewal', color: 'bg-purple-500' }
  ];

  const timelineStats = [
    { label: 'Properties Rented', value: '2', icon: 'home' },
    { label: 'Total Duration', value: '11 months', icon: 'clock' },
    { label: 'Next Renewal', value: '45 days', icon: 'calendar-alt' },
    { label: 'Timeline Events', value: '5', icon: 'list' }
  ];

  useEffect(() => () => {}, []);

  return (
    <div className="top-overview-container bg-[var(--card-bg,#ffffff)] rounded-lg shadow-md border border-[#e2e8f0] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-color,#0e1f42)] mb-2">Dashboard Overview</h2>
          <p className="text-[var(--text-muted,#64748b)]">Your rental portfolio at a glance</p>
        </div>
        <div className="text-sm font-medium text-[#9f7539] bg-[#9f7539]/10 px-3 py-1.5 rounded-full">
          <i className="fas fa-chart-pie mr-1"></i> LIVE UPDATES
        </div>
      </div>

      {/* 3 Columns Grid with Equal Heights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUMN 1: Recently Viewed Property */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--text-color,#0e1f42)]">Recently Viewed</h3>
            <div className="text-xs px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full font-medium">
              VIEWED {property.viewedAt.toUpperCase()}
            </div>
          </div>

          <div className="bg-[#f8fafc] rounded-xl border border-[#e2e8f0] overflow-hidden flex-1 flex flex-col">
            {/* Property Image */}
            <div className="relative h-40 flex-shrink-0">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
              >
                <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-500'} text-sm`}></i>
              </button>

              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-sm font-bold">{property.title}</h3>
                <div className="flex items-center gap-1 text-xs">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{property.location}</span>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4 flex-1 flex flex-col">
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg p-2 hover:bg-gray-50 transition-colors border border-[#e2e8f0]">
                    <div className="flex items-center gap-2">
                      <i className={`fas fa-${feature.icon} text-[#9f7539] text-sm`}></i>
                      <div>
                        <div className="text-xs text-[#64748b]">{feature.label}</div>
                        <div className="font-semibold text-[var(--text-color,#0e1f42)] text-sm">{feature.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/dashboard/rent/browse?property=${property.id}`)}
                  className="flex-1 bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white font-medium py-2 text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                >
                  <i className="fas fa-eye text-xs"></i>
                  Details
                </button>
                <button
                  onClick={() => navigate('/dashboard/rent/applications')}
                  className="flex-1 bg-gradient-to-r from-[#9f7539] to-[#b58a4a] text-white font-medium py-2 text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                >
                  <i className="fas fa-calendar-check text-xs"></i>
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Combined Stats Card */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--text-color,#0e1f42)]">Property Statistics</h3>
          </div>

          <div
            className="bg-[#f8fafc] rounded-xl p-4 border border-[#e2e8f0] hover:border-[#9f7539]/30 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-md group flex flex-col gap-4 flex-1"
            onClick={() => navigate('/dashboard/rent/my-properties')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0e1f42] to-[#1a2d5f] flex items-center justify-center">
                <i className="fas fa-home text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-color,#0e1f42)] group-hover:text-[#9f7539]">Active Properties</h3>
                <p className="text-xs text-[var(--text-muted,#64748b)]">Currently renting</p>
              </div>
              <div className="ml-auto bg-[#0e1f42] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {stats.occupancyRate}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-[var(--text-color,#0e1f42)]">{stats.activeProperties}</div>
              <div className="text-right">
                <div className="text-xs text-[var(--text-muted,#64748b)] mb-1">Occupancy</div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f]" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#e2e8f0] pt-12 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0e1f42] to-[#1a2d5f] flex items-center justify-center">
                  <i className="fas fa-credit-card text-white text-sm"></i>
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-color,#0e1f42)]">Next Payment</div>
                  <div className="text-xs text-[var(--text-muted,#64748b)]">Due in {stats.daysUntilPayment} days</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[var(--text-color,#0e1f42)]">ƒ,İ{stats.nextPaymentAmount}</div>
                <div className="text-xs text-green-600 font-semibold">On Track</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Timeline Calendar */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--text-color,#0e1f42)]">Rental Timeline</h3>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {['month', 'week'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setView(item)}
                    className={`px-2 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                      view === item
                        ? 'bg-white text-[#0e1f42] shadow-sm'
                        : 'text-gray-600 hover:text-[#0e1f42]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="px-2 py-1 text-xs font-medium rounded-md capitalize transition-colors bg-white text-[#0e1f42] shadow-sm hover:bg-[var(--accent-color,#9F7539)] hover:text-white"
              >
                Timeline
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative flex-1"
          >
            {/* Compact Calendar */}
            <div className={`bg-[#f8fafc] rounded-xl p-4 border border-[#e2e8f0] h-full flex flex-col justify-between transition-all duration-300 ${
              isExpanded ? 'shadow-lg' : 'hover:shadow-md'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button className="text-[#64748b] hover:text-[#0e1f42] w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100">
                    <i className="fas fa-chevron-left text-xs"></i>
                  </button>
                  <div className="text-sm font-bold text-[var(--text-color,#0e1f42)]">
                    Dec 2024
                  </div>
                  <button className="text-[#64748b] hover:text-[#0e1f42] w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100">
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-[#64748b] py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {[26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].slice(0, 21).map((day, index) => {
                    const hasEvent = day === 5 || day === 15;
                    return (
                      <div
                        key={index}
                        className={`text-center text-xs py-1.5 rounded cursor-default ${
                          day === 15
                            ? 'bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white font-bold'
                            : hasEvent
                            ? 'bg-blue-50 text-blue-600 font-medium hover:bg-blue-100'
                            : 'text-[var(--text-color,#0e1f42)] hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                {/* Timeline Stats */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {timelineStats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg p-2 border border-[#e2e8f0] hover:border-[#9f7539]/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#f8fafc] flex items-center justify-center text-[#9f7539]">
                          <i className={`fas fa-${stat.icon} text-xs`}></i>
                        </div>
                        <div>
                          <div className="text-xs text-[#64748b]">{stat.label}</div>
                          <div className="text-sm font-bold text-[var(--text-color,#0e1f42)]">{stat.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Expanded Overlay */}
            {isExpanded && (
              <div className="absolute top-0 left-0 w-full z-10 animate-slide-in-top">
                <div className="bg-white rounded-xl shadow-2xl border border-[#e2e8f0] p-4 mt-2 max-h-80 overflow-y-auto no-scrollbar">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[var(--text-color,#0e1f42)] text-sm">Timeline Details</h3>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-[#64748b] hover:text-[#0e1f42] w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>

                  {/* Upcoming Events */}
                  <div className="space-y-2 mb-4">
                    {events.slice(0, 3).map((event, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-[#e2e8f0]">
                        <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-[var(--text-color,#0e1f42)] text-sm">{event.title}</div>
                          <div className="text-xs text-[#64748b]">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-white rounded-full border border-[#e2e8f0] capitalize">
                          {event.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopOverview;
