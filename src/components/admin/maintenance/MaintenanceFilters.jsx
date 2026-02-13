import React from 'react';
import { Search, Plus } from 'lucide-react';

const MaintenanceFilters = ({
    search, setSearch,
    status, setStatus,
    priority, setPriority,
    category, setCategory,
    property, setProperty,
    properties
}) => {
    const statuses = ['All Status', 'Open', 'In Progress', 'Completed', 'On Hold'];
    const priorities = ['All Priority', 'Critical', 'High', 'Medium', 'Low'];
    const categories = ['All Categories', 'Plumbing', 'Electrical', 'HVAC', 'Painting', 'Cleaning', 'Security', 'Other'];

    return (
        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h4 className="font-semibold text-[#0e1f42] dark:text-white">Filters & Actions</h4>
                <button className="bg-[#9F7539] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors hover:bg-[#866330] cursor-pointer">
                    <Plus size={18} /> New Request
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="space-y-1">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 dark:text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9F7539]/20 transition-all cursor-pointer"
                    >
                        {statuses.map(s => <option key={s} value={s.toLowerCase().includes('all') ? 'all' : s} className="dark:bg-[#111827]">{s}</option>)}
                    </select>
                </div>

                <div className="space-y-1">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 dark:text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9F7539]/20 transition-all cursor-pointer"
                    >
                        {priorities.map(p => <option key={p} value={p.toLowerCase().includes('all') ? 'all' : p} className="dark:bg-[#111827]">{p}</option>)}
                    </select>
                </div>

                <div className="space-y-1">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 dark:text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9F7539]/20 transition-all cursor-pointer"
                    >
                        {categories.map(c => <option key={c} value={c.toLowerCase().includes('all') ? 'all' : c} className="dark:bg-[#111827]">{c}</option>)}
                    </select>
                </div>

                <div className="space-y-1">
                    <select
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}
                        className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 dark:text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9F7539]/20 transition-all cursor-pointer"
                    >
                        <option value="all" className="dark:bg-[#111827]">All Properties</option>
                        {properties.map(p => <option key={p.id} value={p.id} className="dark:bg-[#111827]">{p.title}</option>)}
                    </select>
                </div>

                <div className="space-y-1">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 dark:text-white rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9F7539]/20 transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceFilters;
