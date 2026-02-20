import React, { useMemo, useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    Search,
    Plus,
    Eye,
    Edit2,
    ChevronLeft,
    ChevronRight,
    Mail,
    Phone,
    UserPlus
} from 'lucide-react';

const AdminClients = () => {
    const { clients } = useAdmin();
    const navigate = useNavigate();

    // Filters
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 12;

    // Filter Logic
    const filteredClients = useMemo(() => {
        let list = [...clients];

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q)
            );
        }

        if (statusFilter !== "All") {
            list = list.filter(c => c.status === statusFilter);
        }

        return list;
    }, [clients, search, statusFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * clientsPerPage,
        currentPage * clientsPerPage
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
            case 'Expires Soon':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
            case 'Expired':
                return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white">Client Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage all property owner clients and their contracts</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#9F7539] hover:bg-[#866230] text-white rounded-lg transition-colors font-semibold text-sm">
                    <Plus size={18} />
                    Add New Client
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Contract Status:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-[#9F7539] focus:border-[#9F7539] block p-2 outline-none cursor-pointer"
                    >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Expires Soon">Expires Soon</option>
                        <option value="Expired">Expired</option>
                    </select>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-700 dark:text-white focus:ring-[#9F7539] focus:border-[#9F7539] outline-none"
                    />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-x-auto table-scrollbar">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-white/5">
                        <tr className="text-left text-xs whitespace-nowrap font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <th className="px-6 py-4">Client Name</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4 text-center">Total Properties</th>
                            <th className="px-6 py-4">Occupied Units</th>
                            <th className="px-6 py-4">Contract Status</th>
                            <th className="px-6 py-4">Management Fee</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {paginatedClients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={client.image} alt={client.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-white/10" />
                                        <div>
                                            <div className="font-bold text-[#0e1f42] text-sm whitespace-nowrap dark:text-white">{client.name}</div>
                                            <div className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">Client since {client.joinedDate}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap space-y-0.5">
                                        <div className="flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> {client.email}</div>
                                        <div className="flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> {client.phone}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-xs font-bold text-[#9F7539]">{client.totalProperties}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{client.occupiedUnits}/{client.totalUnits}</div>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{Math.round((client.occupiedUnits / client.totalUnits) * 100)}% occupied</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${getStatusStyle(client.status)}`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs font-bold text-gray-700 dark:text-gray-200">{client.managementFee}%</div>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400">₦{(client.avgMonthlyFee / 1000).toFixed(0)}k/month avg</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end items-center gap-2">
                                        <Link
                                            to={`/admin/clients/${client.id}`}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-[#9F7539] transition-all cursor-pointer"
                                        >
                                            <Eye size={14} />
                                        </Link>
                                        <Link
                                            to={`/admin/clients/${client.id}/edit`}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-[#9F7539] transition-all cursor-pointer"
                                        >
                                            <Edit2 size={14} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {paginatedClients.map((client) => (
                    <div key={client.id} className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={client.image} alt={client.name} className="w-12 h-12 rounded-full object-cover border border-gray-100 dark:border-white/10" />
                                <div>
                                    <h3 className="font-bold text-[#0e1f42] dark:text-white">{client.name}</h3>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-tighter">Joined {client.joinedDate}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(client.status)}`}>
                                {client.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-white/5">
                                <p className="text-gray-400 dark:text-gray-500 mb-1">Properties</p>
                                <p className="font-bold text-[#9F7539] text-base">{client.totalProperties}</p>
                                <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">{client.occupiedUnits}/{client.totalUnits} Units Occupied</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-white/5">
                                <p className="text-gray-400 dark:text-gray-500 mb-1">Fee @ {client.managementFee}%</p>
                                <p className="font-bold text-gray-700 dark:text-gray-200 text-base">₦{(client.avgMonthlyFee / 1000).toFixed(0)}k</p>
                                <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">Average Monthly</p>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                                    <Mail size={12} className="shrink-0" />
                                    <span className="truncate max-w-[150px]">{client.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                                    <Phone size={12} className="shrink-0" />
                                    <span>{client.phone}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`/admin/clients/${client.id}`}
                                    className="p-2 border border-blue-100 dark:border-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg bg-blue-50 dark:bg-blue-500/5 transition-all"
                                >
                                    <Eye size={16} />
                                </Link>
                                <Link
                                    to={`/admin/clients/${client.id}/edit`}
                                    className="p-2 border border-amber-100 dark:border-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg bg-amber-50 dark:bg-amber-500/5 transition-all"
                                >
                                    <Edit2 size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                    Showing <span className="font-medium text-gray-700 dark:text-gray-200">1-{paginatedClients.length}</span> of <span className="font-medium text-gray-700 dark:text-gray-200">{filteredClients.length}</span> clients
                </p>
                <div className="flex items-center gap-2 order-1 sm:order-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${currentPage === page
                                ? 'bg-[#9F7539] text-white shadow-md shadow-[#9F7539]/20'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminClients;

