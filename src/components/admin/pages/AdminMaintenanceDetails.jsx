import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import {
    ChevronRight,
    Edit2,
    UserPlus,
    Phone,
    MessageSquare,
    MapPin,
    Building2,
    User,
    Calendar,
    Clock,
    CheckCircle2,
    Wallet,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';

const AdminMaintenanceDetails = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const { maintenanceRequests, properties } = useAdmin();

    const request = useMemo(() =>
        maintenanceRequests.find(r => r.id === requestId),
        [maintenanceRequests, requestId]);

    if (!request) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">Maintenance request not found.</p>
                <button
                    onClick={() => navigate('/admin/maintenance')}
                    className="mt-4 text-[#9F7539] font-semibold flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back to Maintenance
                </button>
            </div>
        );
    }

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
            case 'High': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20';
            case 'Medium': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
            case 'Low': return 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
            default: return 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
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
        <div className="space-y-6">
            {/* header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-2">
                        <span className="cursor-pointer hover:text-[#9F7539]" onClick={() => navigate('/admin/maintenance')}>Maintenance</span>
                        <ChevronRight size={12} />
                        <span className="text-gray-600 dark:text-gray-400">Request #{request.id}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white">Maintenance Request Details</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View and manage all aspects of this maintenance request.</p>
                </div>

                <button className="px-4 py-2 bg-[#9F7539] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#866330] transition-colors cursor-pointer">
                    <UserPlus size={16} /> Assign Contractor
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Request info */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                        <div className="p-6 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-[#0e1f42] dark:text-white">Request Information</h3>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getPriorityStyle(request.priority)}`}>
                                    {request.priority} Priority
                                </span>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(request.status)}`}>
                                    {request.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-8 mb-6">
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase mb-1">Request ID</p>
                                    <p className="text-sm font-bold text-[#0e1f42] dark:text-white">#{request.id}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{request.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase mb-1">Category</p>
                                    <p className="text-sm font-bold text-[#0e1f42] dark:text-white">{request.category}</p>
                                    <p className="text-xs text-[#9F7539] font-medium mt-1">Expected Resolution: Within 4 hours</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase mb-2">Issue Description</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {request.description || "No detailed description provided."}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase mb-3">Photos Submitted</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {request.photos && request.photos.length > 0 ? (
                                        request.photos.map((photo, index) => (
                                            <img
                                                key={index}
                                                src={photo}
                                                alt=""
                                                className="w-full aspect-video rounded-lg object-cover"
                                            />
                                        ))
                                    ) : (
                                        [1, 2, 3].map((_, index) => (
                                            <div
                                                key={index}
                                                className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600"
                                            >
                                                <Building2 size={24} />
                                            </div>
                                        ))
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* details */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden text-sm transition-colors">
                        <div className="p-6 border-b border-gray-50 dark:border-white/5">
                            <h3 className="font-bold text-[#0e1f42] dark:text-white">Property & Tenant Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Property */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Property Information</h4>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Property Name</p>
                                    <p className="font-bold text-[#0e1f42] dark:text-white">{request.propertyTitle}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Unit Number</p>
                                    <p className="font-bold text-[#0e1f42] dark:text-white">{request.unitNumber}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                                    <p className="text-gray-600 dark:text-gray-300 font-medium">15 Ademola Street, Victoria Island, Lagos</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Property Type</p>
                                    <p className="text-gray-600 dark:text-gray-300 font-medium">2 Bedroom Apartment</p>
                                </div>
                            </div>

                            {/* Tenant  */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Tenant Information</h4>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/5 flex items-center justify-center text-[#0e1f42] dark:text-white font-bold">
                                        {request.tenant.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#0e1f42] dark:text-white">{request.tenant}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Primary Tenant</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                                    <p className="font-bold text-[#0e1f42] dark:text-white">+234 803 123 4567</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                                    <p className="font-bold text-[#9F7539]">chioma.okeke@email.com</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Lease Start Date</p>
                                    <p className="text-gray-600 dark:text-gray-300 font-medium">Jan 1, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contractor Assignment */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                        <div className="p-6 border-b border-gray-50 dark:border-white/5 flex items-center justify-between font-sm">
                            <h3 className="font-bold text-[#0e1f42] dark:text-white">Contractor Assignment</h3>
                            <button className="text-[#9F7539] text-xs font-bold flex items-center gap-1 cursor-pointer">
                                <UserPlus size={14} /> Assign Contractor
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Currently Assigned</p>
                            <div className="bg-white dark:bg-white/5 border text-sm border-gray-100 dark:border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/5 flex items-center justify-center">
                                        <User className="text-gray-400 dark:text-gray-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#0e1f42] dark:text-white">Lagos Plumbing Solutions</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span>Tunde Adebayo</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                            <span>Lead Plumber</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-amber-500">★ 4.8 Rating</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                            <span className="text-gray-500 dark:text-gray-400 text-xs">15+ Plumbing Jobs</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-100 dark:border-white/10 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <Phone size={14} /> Call
                                    </button>
                                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-100 dark:border-white/10 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <MessageSquare size={14} /> Message
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Assignment History</p>
                                <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-700 dark:text-amber-400">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#0e1f42] dark:text-white">Assigned to Lagos Plumbing Solutions</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Assigned by Adebayo O. • Dec 15, 2024 at 3:15 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Budget Tracking */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                        <div className="p-6 border-b border-gray-50 dark:border-white/5">
                            <h3 className="font-bold text-[#0e1f42] dark:text-white">Budget Tracking</h3>
                        </div>
                        <div className="p-6 space-y-6 text-sm">
                            <div className="bg-orange-50/50 dark:bg-orange-500/5 p-4 rounded-xl border border-orange-100 dark:border-orange-500/10 relative">
                                <Wallet size={16} className="absolute top-4 right-4 text-orange-400" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Client Wallet Balance</p>
                                <p className="text-2xl font-bold text-[#0e1f42] dark:text-white">₦125,000</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Available for maintenance</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated Cost</p>
                                    <p className="font-bold text-[#0e1f42] dark:text-white">₦15,000 - ₦25,000</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contractor Quote</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-[#0e1f42] dark:text-white">₦18,500</p>
                                        <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-2 py-0.5 rounded">Within budget range</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 dark:border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Remaining Balance</span>
                                        <span className="text-xs font-bold text-[#0e1f42] dark:text-white">₦106,500</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[85%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                        <div className="p-4 border-b border-gray-50 dark:border-white/5">
                            <h3 className="font-bold text-[#0e1f42] dark:text-white">Quick Actions</h3>
                        </div>
                        <div className="p-2 space-y-1">
                            <button className="w-full p-3 flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                <Phone size={18} className="text-gray-400 dark:text-gray-500" /> Call Tenant
                            </button>
                            <button className="w-full p-3 flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                <MessageSquare size={18} className="text-gray-400 dark:text-gray-500" /> Send Update
                            </button>
                            <button className="w-full p-3 flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                <Calendar size={18} className="text-gray-400 dark:text-gray-500" /> Schedule Visit
                            </button>
                            <button className="w-full p-3 flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                <CheckCircle2 size={18} className="text-gray-400 dark:text-gray-500" /> Mark as Completed
                            </button>
                        </div>
                    </div>

                    {/* Request Timeline */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                        <div className="p-6 border-b border-gray-50 dark:border-white/5">
                            <h3 className="font-bold text-[#0e1f42] dark:text-white">Request Timeline</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-700 dark:text-amber-400 z-10 relative">
                                            <User size={16} />
                                        </div>
                                        <div className="absolute top-8 left-1/2 -ml-px w-px h-12 bg-gray-100 dark:bg-white/5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#0e1f42] dark:text-white">Contractor Assigned</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                                            Lagos Plumbing Solutions assigned to handle the request
                                        </p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Dec 15, 2024 at 3:15 PM</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-700 dark:text-blue-400 z-10 relative">
                                            <Clock size={16} />
                                        </div>
                                        <div className="absolute top-8 left-1/2 -ml-px w-px h-12 bg-gray-100 dark:bg-white/5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#0e1f42] dark:text-white">Status Updated</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                                            Request marked as "In Progress"
                                        </p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Dec 15, 2024 at 2:45 PM</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-700 dark:text-red-400 z-10 relative">
                                        <AlertCircle size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#0e1f42] dark:text-white">Request Created</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                                            Critical plumbing issue reported by tenant
                                        </p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Dec 15, 2024 at 2:30 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMaintenanceDetails;
