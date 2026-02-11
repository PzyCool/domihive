// src/components/admin/pages/AdminApplications.jsx
import React, { useMemo, useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { Download, FilePlusCorner, UserPlus, Search, ChevronDown } from "lucide-react";

const AdminApplications = () => {
  const { applications, setApplications } = useAdmin();

  // ===== Filters (simple) =====
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | Submitted | Under Review | Approved | Rejected
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | sla

  const updateStatus = (id, status) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  // ===== Add SLA hoursLeft (use app.slaHours if you have it, else fallback to 72h) =====
  const rows = useMemo(() => {
    return applications.map((app) => {
      const submittedDate = new Date(app.submittedAt);
      const slaHours = Number(app.slaHours ?? 72);
      const due = new Date(submittedDate.getTime() + slaHours * 60 * 60 * 1000);
      const now = new Date();
      const hoursLeft = Math.max(0, Math.ceil((due - now) / (1000 * 60 * 60)));
      const isOverdue = due - now < 0;

      return { ...app, slaHours, hoursLeft, isOverdue, dueAt: due.toISOString() };
    });
  }, [applications]);

  // ===== Filter + sort =====
  const filteredRows = useMemo(() => {
    let list = [...rows];

    // search (applicant + property)
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) =>
        `${a.applicant} ${a.propertyTitle} ${a.id}`
          .toLowerCase()
          .includes(q)
      );
    }

    // status
    if (statusFilter !== "all") {
      list = list.filter((a) => a.status === statusFilter);
    }

    // sort
    if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    } else if (sortBy === "sla") {
      // priority: overdue first, then least hours left
      list.sort((a, b) => {
        if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1;
        return a.hoursLeft - b.hoursLeft;
      });
    } else {
      // newest
      list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    }

    return list;
  }, [rows, search, statusFilter, sortBy]);

  // ===== Summary cards =====
  const applicaionSummary = useMemo(() => {
    const total = applications.length;
    const underReview = applications.filter((a) => a.status === "Under Review").length;
    const approved = applications.filter((a) => a.status === "Approved").length;
    const rejected = applications.filter((a) => a.status === "Rejected").length;

    return [
      {
        label: "Total Applications",
        value: total,
        meta: `${total} applications`,
        icon: <FilePlusCorner size={20} />,
        color: "bg-gray-100 text-gray-700",
      },
      {
        label: "Under Review",
        value: underReview,
        meta: `${underReview} applications`,
        icon: <FilePlusCorner size={20} />,
        color: "bg-amber-100 text-amber-700",
      },
      {
        label: "Approved",
        value: approved,
        meta: `${approved} applications`,
        icon: <FilePlusCorner size={20} />,
        color: "bg-green-100 text-green-700",
      },
      {
        label: "Rejected",
        value: rejected,
        meta: `${rejected} applications`,
        icon: <FilePlusCorner size={20} />,
        color: "bg-red-100 text-red-700",
      },
    ];
  }, [applications]);

  const statusBadge = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    if (status === "Submitted") return "bg-gray-100 text-gray-700";
    return "bg-amber-100 text-amber-700"; // Under Review or others
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0e1f42] mt-2">Application Queue</h1>
          <p className="text-sm text-gray-600">
            Manage tenants application and track unit status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="flex items-center gap-2 px-4 py-2 text-(--accent-color) border border-(--accent-color)/20 hover:border-(--accent-color)/50 cursor-pointer transition duration-300 font-semibold rounded-lg">
            <Download size={16} /> Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-(--accent-color) text-white cursor-pointer transition duration-300 font-semibold rounded-lg">
            <UserPlus size={16} /> Assign Reviewer
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {applicaionSummary.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg p-4 shadow border border-gray-100 flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-gray-500">{card.label}</div>
              <div className="text-2xl font-bold text-[#0e1f42]">{card.value}</div>
              <div className="text-xs text-gray-600">{card.meta}</div>
            </div>
            <div className={`${card.color} rounded-lg p-2`}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicant, property..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 text-sm outline-none focus:border-[#9F7539]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          >
            <option value="all">All Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="sla">Sort: SLA (Urgent first)</option>
          </select>

          <div className="text-xs text-gray-500 flex items-center px-2">
            Showing <span className="font-semibold text-[#0e1f42] mx-1">{filteredRows.length}</span>
            applications
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Applicant</th>
                <th className="py-3 px-4 text-left font-semibold">Property</th>
                <th className="py-3 px-4 text-left font-semibold">Submitted</th>
                <th className="py-3 px-4 text-left font-semibold">SLA</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRows.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-xs">
                    <div className="font-semibold text-[#0e1f42]">{app.applicant}</div>
                    <div className="text-xs text-gray-500">ID: {app.id}</div>
                  </td>

                  <td className="py-3 px-4 text-gray-700 text-xs">{app.propertyTitle}</td>

                  <td className="py-3 px-4 text-gray-600 text-xs">
                    {new Date(app.submittedAt).toLocaleString()}
                  </td>

                  {/* sla */}
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-medium ${app.isOverdue
                        ? "text-red-600"
                        : app.hoursLeft <= 6
                          ? "text-amber-700"
                          : "text-gray-600"
                        }`}
                    >
                      {app.isOverdue ? "Overdue" : `Due in ${app.hoursLeft}h`}
                    </span>
                  </td>

                  {/* status */}
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>

                  {/* ctas */}
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => updateStatus(app.id, "Under Review")}
                        className="px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, "Approved")}
                        className="px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, "Rejected")}
                        className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-500">
                    No applications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filteredRows.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[#0e1f42]">{app.applicant}</p>
                <p className="text-xs text-gray-500">ID: {app.id}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusBadge(app.status)}`}>
                {app.status}
              </span>
            </div>

            {/* Property */}
            <div className="mt-3">
              <p className="text-xs text-gray-500">Property</p>
              <p className="text-sm text-gray-700">{app.propertyTitle}</p>
            </div>

            {/* Submitted + SLA */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Submitted</p>
                <p className="text-xs text-gray-700">
                  {new Date(app.submittedAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">SLA</p>
                <p
                  className={`text-xs font-medium ${app.isOverdue
                    ? "text-red-600"
                    : app.hoursLeft <= 6
                      ? "text-amber-700"
                      : "text-gray-700"
                    }`}
                >
                  {app.isOverdue ? "Overdue" : `Due in ${app.hoursLeft}h`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => updateStatus(app.id, "Under Review")}
                className="py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700"
              >
                Review
              </button>

              <button
                onClick={() => updateStatus(app.id, "Approved")}
                className="py-2 rounded-lg bg-green-50 text-green-700 text-xs font-semibold"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(app.id, "Rejected")}
                className="py-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {filteredRows.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-500">
            No applications match your filters.
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminApplications;