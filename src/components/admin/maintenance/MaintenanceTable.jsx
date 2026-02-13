import React from 'react';
import { Eye, Edit, MoreHorizontal, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MaintenanceTable = ({ requests }) => {
    const navigate = useNavigate();
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
            case 'High': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20';
            case 'Medium': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
            case 'Low': return 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-white/5';
            default: return 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-white/5';
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Open': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'In Progress': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
            case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
            case 'On Hold': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <div className="mt-4">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                <div className="p-4 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
                    <h3 className="font-semibold text-[#0e1f42] dark:text-white">Maintenance Requests ({requests.length})</h3>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#9F7539] dark:hover:text-[#9F7539] hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium cursor-pointer">
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Request ID</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Priority</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Status</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Category</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Property</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Unit</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Tenant</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider">Created</th>
                                <th className="px-4 py-3 font-semibold text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {requests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4 font-bold text-xs text-[#0e1f42] dark:text-white">{request.id}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getPriorityStyle(request.priority)}`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400 text-xs">{request.category}</td>
                                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300 font-medium text-xs">{request.propertyTitle}</td>
                                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400 text-xs">{request.unitNumber}</td>
                                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300 font-medium">{request.tenant}</td>
                                    <td className="px-4 py-4 text-gray-400 dark:text-gray-500 text-xs">{request.createdAt}</td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/maintenance/${request.id}`)}
                                                className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors cursor-pointer" title="Edit Request">
                                                <Edit size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="px-4 py-20 text-center text-gray-500">
                                        <p className="font-medium">No maintenance requests found matching your filters.</p>
                                        <p className="text-xs mt-1">Try adjusting your filters or search terms.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {requests.map((request) => (
                    <div key={request.id} className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <span className="text-xs font-bold text-[#0e1f42] dark:text-white">{request.id}</span>
                                <p className="text-sm font-semibold text-[#0e1f42] dark:text-gray-200">{request.tenant}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getPriorityStyle(request.priority)}`}>
                                {request.priority}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 mb-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Status</p>
                                <div className="mt-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(request.status)}`}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Category</p>
                                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 font-medium">{request.category}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Property & Unit</p>
                                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{request.propertyTitle} • {request.unitNumber}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase text-right">Created</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-right">{request.createdAt}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-white/5">
                            <button
                                onClick={() => navigate(`/admin/maintenance/${request.id}`)}
                                className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-lg transition-colors active:bg-gray-100 dark:active:bg-white/10 cursor-pointer"
                            >
                                <Eye size={16} /> Details
                            </button>
                            <button className="flex items-center gap-2 text-xs font-semibold text-white bg-[#9F7539] px-4 py-2 rounded-lg transition-colors active:bg-[#866330] cursor-pointer">
                                <Edit size={16} /> Update
                            </button>
                        </div>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
                        <p className="text-sm text-gray-500">No maintenance requests found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaintenanceTable;
