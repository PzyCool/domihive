import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import {
    ChevronLeft,
    Mail,
    Phone,
    Building2,
    ExternalLink,
    MapPin,
    ArrowRight,
    FileText,
    Plus,
    Edit2,
    CheckCircle2,
    Briefcase,
    CreditCard,
    DollarSign,
    ShieldCheck,
    Eye
} from 'lucide-react';

const AdminClientDetails = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { clients, properties } = useAdmin();

    const client = useMemo(() =>
        clients.find(c => c.id === clientId),
        [clients, clientId]);

    const clientProperties = useMemo(() =>
        properties.filter(p => p.clientId === clientId).map(p => {
            // Calculate revenue and occupancy for display
            const totalUnits = p.units?.length || 0;
            const occupiedUnits = p.units?.filter(u => u.status === 'occupied').length || 0;
            const monthlyRevenue = p.units?.reduce((acc, unit) => acc + (unit.revenue || 0), 0) || 0;

            return {
                ...p,
                totalUnits,
                occupiedUnits,
                monthlyRevenue
            };
        }),
        [properties, clientId]);

    if (!client) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">Client not found.</p>
                <button
                    onClick={() => navigate('/admin/clients')}
                    className="mt-4 text-[#9F7539] hover:underline flex items-center gap-2 mx-auto"
                >
                    <ChevronLeft size={16} /> Back to Clients
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                    <Link to="/admin/clients" className="hover:text-[#9F7539] transition-colors">Clients</Link>
                    <span className="text-gray-300">›</span>
                    <span className="text-gray-600 dark:text-gray-300">Client Details</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0e1f42] dark:text-white tracking-tight">{client.name}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{client.subtitle || 'Property Owner + Client'}</p>
                    </div>
                    <Link
                        to={`/admin/clients/${clientId}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#9F7539] hover:bg-[#866230] text-white rounded-lg text-sm font-bold transition-all shadow-sm"
                    >
                        <Edit2 size={16} />
                        Edit Client
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8 space-y-8">
                    {/* profile */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                        <img
                            src={client.image}
                            alt={client.name}
                            className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-gray-100 dark:ring-white/5"
                        />

                        <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-bold text-[#0e1f42] dark:text-white">
                                    {client.name}
                                </h2>

                                <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                    ${client.status === 'Active'
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                                    }`}>
                                    {client.status}
                                </span>

                                {client.isVerified && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-semibold uppercase tracking-wide">
                                        <ShieldCheck size={12} />
                                        Verified
                                    </span>
                                )}
                            </div>

                            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">
                                Property Owner • Client since {client.joinedDate}
                            </p>
                        </div>

                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            Contact Information
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail size={16} className="text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">{client.email}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Phone size={16} className="text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">{client.phone}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm sm:col-span-2">
                                <MapPin size={16} className="text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {client.location || 'Lagos, Nigeria'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            Bank Details
                        </h4>

                        <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                            <div className="p-3 rounded-xl bg-[#9F7539]/10">
                                <CreditCard size={18} className="text-[#9F7539]" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#0e1f42] dark:text-white">
                                    {client.bankDetails?.bankName || 'GTBank'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                                    {client.bankDetails?.accountNumber || '0123456789'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contract Summary Card */}
                <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-white/5 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-extrabold text-[#0e1f42] dark:text-white leading-tight">Contract Summary</h3>
                        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold uppercase">Active</span>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Contract Type</p>
                                <p className="text-sm font-bold text-[#0e1f42] dark:text-white">{client.contractSummary?.type || 'Full Management'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Contract Duration</p>
                                <p className="text-sm font-bold text-[#0e1f42] dark:text-white">{client.contractSummary?.duration || '5 years (Jan 2026 - Dec 2030)'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Management Fee</p>
                                <p className="text-sm font-extrabold text-[#0e1f42] dark:text-white">{client.managementFee}% of rent</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50 dark:border-white/5">
                            <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Maintenance Wallet</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-extrabold text-[#0e1f42] dark:text-white">₦{Number(client.contractSummary?.maintenanceWallet || 50000).toLocaleString()} annually</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mt-1">₦{Number(client.contractSummary?.maintenanceRemaining || 32000).toLocaleString()} remaining</p>
                        </div>

                        <div className="pt-6 border-t border-gray-50 dark:border-white/5">
                            <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Rent Increment</p>
                            <p className="text-sm font-bold text-[#0e1f42] dark:text-white">{client.contractSummary?.rentIncrement || 'Every 3 years'}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Next increment: {client.contractSummary?.nextIncrement || 'Jan 2029'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Properties Portfolio */}
            <div className="space-y-6 mt-12">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-[#0e1f42] dark:text-white leading-tight">Properties Portfolio</h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 font-bold">{clientProperties.length} Properties • {client.totalUnits} Total Units</p>
                </div>

                {clientProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {clientProperties.map(prop => {
                            const occupancyRate = prop.totalUnits > 0 ? Math.round((prop.occupiedUnits / prop.totalUnits) * 100) : 0;
                            return (
                                <div key={prop.id} className="property-card w-full max-w-none md:max-w-[640px] md:min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:translate-y-[-2px] cursor-pointer group flex flex-col">
                                    <div className="h-64 overflow-hidden relative">
                                        <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute top-6 right-6">
                                            <button className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg text-gray-400 hover:text-[#9F7539] transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-xl font-extrabold text-[#0e1f42] dark:text-white line-clamp-1">{prop.title}</h4>
                                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">{prop.location}, {prop.area}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 mt-8">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Total Units</p>
                                                <p className="text-xl font-extrabold text-[#0e1f42] dark:text-white">{prop.totalUnits}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Occupied</p>
                                                <p className="text-xl font-extrabold text-[#0e1f42] dark:text-white">{prop.occupiedUnits}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Monthly Revenue</p>
                                                <p className="text-xl font-extrabold text-[#0e1f42] dark:text-white">₦{(prop.monthlyRevenue / 1000).toFixed(0)}k</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex items-center justify-between">
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ${occupancyRate >= 100
                                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                                                }`}>
                                                {occupancyRate}% Occupied
                                            </span>
                                            <button
                                                onClick={() => navigate(`/admin/properties`)}
                                                className="text-[#9F7539] hover:text-[#866230] transition-colors"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#111827] rounded-[2rem] border border-dashed border-gray-200 dark:border-white/10 p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Building2 className="text-gray-300 dark:text-gray-600" size={40} />
                        </div>
                        <h4 className="text-xl font-bold text-[#0e1f42] dark:text-white mb-2">No Properties Found</h4>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">This client doesn't have any properties assigned to their portfolio yet.</p>
                        <button className="mt-8 px-6 py-3 bg-[#9F7539] hover:bg-[#866230] text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2 mx-auto">
                            <Plus size={18} /> Assign First Property
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminClientDetails;
