import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { Link } from 'react-router-dom';
import {
    Search,
    Download,
    DollarSign,
    Clock,
    CheckCircle2,
    AlertCircle,
    Plus,
    Building2,
    User,
    CreditCard,
    ArrowUpRight,
    TrendingUp,
    FileText
} from 'lucide-react';

const AdminPayments = () => {
    const { payments } = useAdmin();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    // Filter Logic
    const filteredRows = useMemo(() => {
        let list = [...payments];

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p =>
                `${p.tenant} ${p.propertyTitle} ${p.id}`.toLowerCase().includes(q)
            );
        }

        if (statusFilter !== "all") {
            list = list.filter(p => p.status === statusFilter);
        }

        if (typeFilter !== "all") {
            list = list.filter(p => p.type === typeFilter);
        }

        return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [payments, search, statusFilter, typeFilter]);

    // Summary Stats - Matching AdminApplications styling
    const stats = useMemo(() => {
        const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((acc, p) => acc + p.amount, 0);
        const pendingValue = payments.filter(p => p.status === 'Pending').reduce((acc, p) => acc + p.amount, 0);
        const overdueCount = payments.filter(p => p.status === 'Overdue').length;

        return [
            {
                label: "Total Revenue",
                value: `₦${totalRevenue.toLocaleString()}`,
                meta: "Lifetime collections",
                icon: <DollarSign size={20} />,
                color: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
            },
            {
                label: "Pending Clearance",
                value: `₦${pendingValue.toLocaleString()}`,
                meta: `${payments.filter(p => p.status === 'Pending').length} payments`,
                icon: <Clock size={20} />,
                color: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
            },
            {
                label: "Overdue",
                value: overdueCount,
                meta: "Action required",
                icon: <AlertCircle size={20} />,
                color: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
            },
            {
                label: "Collection Rate",
                value: "94.2%",
                meta: "Past 30 days",
                icon: <TrendingUp size={20} />,
                color: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
            },
        ];
    }, [payments]);

    const statusBadge = (status) => {
        if (status === 'Paid') return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
        if (status === 'Pending') return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
        if (status === 'Overdue') return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    };

    return (
        <div className="space-y-4">
            {/* Header - Matching AdminApplications */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mt-2">Financial Overview</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage rent collections and payment audit trails</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <button className="flex items-center gap-2 px-4 py-2 text-[#9F7539] border border-[#9F7539]/20 hover:border-[#9F7539]/50 cursor-pointer transition duration-300 font-semibold rounded-lg">
                        <Download size={16} /> Export List
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#9F7539] text-white hover:bg-[#866230] cursor-pointer transition duration-300 font-semibold rounded-lg">
                        <Plus size={16} /> Log Payment
                    </button>
                </div>
            </div>

            {/* Summary - Matching AdminApplications card style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {stats.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white dark:bg-[#111827] rounded-lg p-4 shadow border border-gray-100 dark:border-white/5 flex items-center justify-between"
                    >
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{card.label}</div>
                            <div className="text-2xl font-bold text-[#0e1f42] dark:text-white">{card.value}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{card.meta}</div>
                        </div>
                        <div className={`${card.color} rounded-lg p-2`}>{card.icon}</div>
                    </div>
                ))}
            </div>

            {/* Filters - Matching AdminApplications style */}
            <div className="bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-white/10 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tenant, property, or ID..."
                        className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-[#9F7539]"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none"
                    >
                        <option value="all" className="dark:bg-[#111827]">All Status</option>
                        <option value="Paid" className="dark:bg-[#111827]">Paid</option>
                        <option value="Pending" className="dark:bg-[#111827]">Pending</option>
                        <option value="Overdue" className="dark:bg-[#111827]">Overdue</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none"
                    >
                        <option value="all" className="dark:bg-[#111827]">All Types</option>
                        <option value="Rent" className="dark:bg-[#111827]">Rent</option>
                        <option value="Deposit" className="dark:bg-[#111827]">Deposit</option>
                        <option value="Service Fee" className="dark:bg-[#111827]">Service Fee</option>
                    </select>

                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center px-2">
                        Showing <span className="font-semibold text-[#0e1f42] dark:text-white mx-1">{filteredRows.length}</span> payments
                    </div>
                </div>
            </div>

            {/* Desktop Table - Matching Refined AdminInspections/Applications */}
            <div className="hidden md:block bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm overflow-x-auto table-scrollbar">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
                        <tr>
                            <th className="py-3 px-6 font-semibold whitespace-nowrap">Transaction ID</th>
                            <th className="py-3 px-6 font-semibold whitespace-nowrap">Tenant</th>
                            <th className="py-3 px-6 font-semibold whitespace-nowrap">Property</th>
                            <th className="py-3 px-6 font-semibold text-center whitespace-nowrap">Amount</th>
                            <th className="py-3 px-6 font-semibold whitespace-nowrap">Status</th>
                            <th className="py-3 px-6 text-right font-semibold whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {filteredRows.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <div className="font-bold text-[#0e1f42] dark:text-white text-xs">{p.id}</div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400">{p.date} • {p.type}</div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                            <User size={14} className="text-gray-500" />
                                        </div>
                                        <div className="font-semibold text-[#0e1f42] dark:text-white whitespace-nowrap text-sm">{p.tenant}</div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs">
                                        <Building2 size={12} className="text-gray-400 shrink-0" />
                                        <span className="truncate max-w-[180px]">{p.propertyTitle}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className="text-sm font-bold text-[#0e1f42] dark:text-white">₦{p.amount.toLocaleString()}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${statusBadge(p.status)}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-end whitespace-nowrap gap-2">
                                        <Link
                                            to={`/admin/payments/${p.id}`}
                                            className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-white/10 text-[#9F7539] text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-1.5"
                                        >
                                            View Details
                                            <ArrowUpRight size={12} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View - Matching Refined AdminInspections */}
            <div className="md:hidden space-y-3">
                {filteredRows.map((p) => (
                    <div key={p.id} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm p-4">
                        <div className="flex items-start justify-between gap-3 px-1">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                    <CreditCard size={18} className="text-[#9F7539]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#0e1f42] dark:text-white text-sm">{p.id}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide font-mono">{p.type} • {p.date}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${statusBadge(p.status)}`}>
                                {p.status}
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 pb-3 border-b border-gray-50 dark:border-white/5">
                            <div className="flex flex-col gap-1 px-1">
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Tenant</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-[#0e1f42] dark:text-white">
                                    <User size={12} className="text-gray-400" /> {p.tenant}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-right px-1">
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Amount</p>
                                <p className="text-sm font-extrabold text-[#9F7539]">₦{p.amount.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between px-1">
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 max-w-[60%]">
                                <Building2 size={12} className="shrink-0" />
                                <span className="truncate">{p.propertyTitle}</span>
                            </div>

                            <Link
                                to={`/admin/payments/${p.id}`}
                                className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 text-[#9F7539] border border-gray-100 dark:border-white/5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all"
                            >
                                Details <ArrowUpRight size={12} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPayments;
