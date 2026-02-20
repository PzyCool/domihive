import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  Search,
  Calendar,
  Clock,
  User,
  Building2,
  CheckCircle2,
  XCircle,
  Download,
  Plus,
} from 'lucide-react';

const AdminInspections = () => {
  const { inspections, setInspections } = useAdmin();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const updateStatus = (id, status) => {
    setInspections((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  // Filter + Sort Logic
  const filteredRows = useMemo(() => {
    let list = [...inspections];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) =>
        `${a.tenant} ${a.propertyTitle}`.toLowerCase().includes(q)
      );
    }

    // Status
    if (statusFilter !== "all") {
      list = list.filter((a) => a.status === statusFilter);
    }

    // Sort
    if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      // newest
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [inspections, search, statusFilter, sortBy]);

  // Summary Metrics
  const inspectionSummary = useMemo(() => {
    const total = inspections.length;
    const verified = inspections.filter((a) => a.status === "Verified").length;
    const scheduled = inspections.filter((a) => a.status === "Scheduled").length;
    const noshow = inspections.filter((a) => a.status === "No-show").length;

    return [
      {
        label: "Total Inspections",
        value: total,
        meta: `${total} appointments`,
        icon: <Calendar size={20} />,
        color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      },
      {
        label: "Verified",
        value: verified,
        meta: `${verified} completed`,
        icon: <CheckCircle2 size={20} />,
        color: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
      },
      {
        label: "Scheduled",
        value: scheduled,
        meta: `${scheduled} upcoming`,
        icon: <Clock size={20} />,
        color: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      },
      {
        label: "No-show",
        value: noshow,
        meta: `${noshow} missed`,
        icon: <XCircle size={20} />,
        color: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
      },
    ];
  }, [inspections]);

  const statusBadge = (status) => {
    if (status === "Verified") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
    if (status === "No-show") return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
    if (status === "Scheduled") return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
    return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mt-2">Inspections</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track and verify property viewing appointments
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="flex items-center gap-2 px-4 py-2 text-[#9F7539] border border-[#9F7539]/20 hover:border-[#9F7539]/50 dark:hover:border-[#9F7539]/40 cursor-pointer transition duration-300 font-semibold rounded-lg">
            <Download size={16} /> Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#9F7539] text-white hover:bg-[#866230] cursor-pointer transition duration-300 font-semibold rounded-lg">
            <Plus size={16} /> Schedule New
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {inspectionSummary.map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-[#111827] rounded-lg p-4 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between"
          >
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{card.label}</div>
              <div className="text-xl font-bold text-[#0e1f42] dark:text-white">{card.value}</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500">{card.meta}</div>
            </div>
            <div className={`${card.color} rounded-lg p-2`}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-white/10 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenant or property..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-[#9F7539]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none cursor-pointer"
          >
            <option value="all" className="dark:bg-[#111827]">All Status</option>
            <option value="Verified" className="dark:bg-[#111827]">Verified</option>
            <option value="Scheduled" className="dark:bg-[#111827]">Scheduled</option>
            <option value="No-show" className="dark:bg-[#111827]">No-show</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none cursor-pointer"
          >
            <option value="newest" className="dark:bg-[#111827]">Sort: Newest</option>
            <option value="oldest" className="dark:bg-[#111827]">Sort: Oldest</option>
          </select>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center px-2">
            Showing <span className="font-semibold text-[#0e1f42] dark:text-white mx-1">{filteredRows.length}</span>
            inspections
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm overflow-x-auto table-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="py-3 px-6 font-semibold">Tenant</th>
              <th className="py-3 px-6 font-semibold">Property</th>
              <th className="py-3 px-6 font-semibold">Date & Time</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {filteredRows.map((insp) => (
              <tr key={insp.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <User size={14} className="text-gray-500" />
                    </div>
                    <div className="font-semibold text-[#0e1f42] dark:text-white whitespace-nowrap text-sm">{insp.tenant}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs text-nowrap">
                    <Building2 size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate max-w-[180px]">{insp.propertyTitle}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400 text-xs font-medium text-nowrap">
                  {insp.date} • {insp.time}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase ${statusBadge(insp.status)}`}>
                    {insp.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end whitespace-nowrap gap-2">
                    {insp.status === 'Scheduled' && (
                      <>
                        <button
                          onClick={() => updateStatus(insp.id, "Verified")}
                          className="px-3 py-1.5 rounded-md bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-semibold hover:bg-green-100 dark:hover:bg-green-500/20"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateStatus(insp.id, "No-show")}
                          className="px-3 py-1.5 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-500/20"
                        >
                          No-show
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-3">
        {filteredRows.map((insp) => (
          <div key={insp.id} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 px-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-[#0e1f42] dark:text-white text-sm">{insp.tenant}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Building2 size={10} /> {insp.propertyTitle}
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadge(insp.status)}`}>
                {insp.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 pb-4 border-b border-gray-50 dark:border-white/5">
              <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400 px-1">
                <Calendar size={12} className="text-gray-400" /> {insp.date}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400 px-1">
                <Clock size={12} className="text-gray-400" /> {insp.time}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {insp.status === 'Scheduled' ? (
                <>
                  <button
                    onClick={() => updateStatus(insp.id, "Verified")}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg text-xs font-bold shadow-sm"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => updateStatus(insp.id, "No-show")}
                    className="flex-1 py-2 bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-lg text-xs font-bold"
                  >
                    No-show
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInspections;
