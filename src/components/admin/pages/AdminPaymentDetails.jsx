import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import {
    ChevronLeft,
    Download,
    Share2,
    User,
    Building2,
    CreditCard,
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    Mail,
    Phone,
    ShieldCheck,
    MapPin,
    ExternalLink
} from 'lucide-react';

const AdminPaymentDetails = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const { payments } = useAdmin();

    const payment = useMemo(() =>
        payments.find(p => p.id === paymentId),
        [payments, paymentId]);

    if (!payment) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">Transaction not found.</p>
                <button
                    onClick={() => navigate('/admin/payments')}
                    className="mt-4 text-[#9F7539] hover:underline flex items-center gap-2 mx-auto font-bold"
                >
                    <ChevronLeft size={16} /> Back to Payments
                </button>
            </div>
        );
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400';
            case 'Pending': return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
            case 'Overdue': return 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumbs & Actions */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                    <Link to="/admin/payments" className="hover:text-[#9F7539] transition-colors">Payments</Link>
                    <span className="text-gray-300 dark:text-gray-700">›</span>
                    <span className="text-gray-600 dark:text-gray-300 font-bold">Transaction Details</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/payments')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl text-gray-400 dark:text-gray-600 transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white">{payment.id}</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{payment.type} Payment • {payment.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-bold transition-all">
                            <Share2 size={16} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#9F7539] hover:bg-[#866230] text-white rounded-xl text-sm font-bold transition-all shadow-sm">
                            <Download size={16} />
                            Download Receipt
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Transaction Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getStatusStyle(payment.status)} animate-pulse`}>
                                {payment.status === 'Paid' ? <CheckCircle2 size={32} /> : payment.status === 'Pending' ? <Clock size={32} /> : <AlertCircle size={32} />}
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold text-[#0e1f42] dark:text-white">₦{payment.amount.toLocaleString()}</h2>
                                <span className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${getStatusStyle(payment.status)}`}>
                                    {payment.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Payment Source</h4>
                                <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                    <div className="p-3 rounded-xl bg-[#9F7539]/10 text-[#9F7539]">
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0e1f42] dark:text-white">{payment.paymentMethod}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 font-mono uppercase">Ref: {payment.reference}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Invoicing</h4>
                                <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0e1f42] dark:text-white">{payment.invoiceId}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Generated on {payment.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 pb-8 pt-4">
                            <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-6 space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck size={12} />
                                    Secured Transaction Details
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 dark:text-gray-400">Transaction Status</span>
                                        <span className="font-bold text-green-600 dark:text-green-400">Success</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 dark:text-gray-400">Merchant Name</span>
                                        <span className="font-bold text-[#0e1f42] dark:text-white">DomiHive Management</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-t border-gray-200 dark:border-white/10 pt-3">
                                        <span className="text-gray-500 dark:text-gray-400 font-bold italic">Total Allocated</span>
                                        <span className="font-extrabold text-[#0e1f42] dark:text-white">₦{payment.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8 space-y-6">
                        <h3 className="text-lg font-bold text-[#0e1f42] dark:text-white">Audit Timeline</h3>
                        <div className="relative space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                            <div className="relative pl-10">
                                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white dark:border-[#111827]" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-[#0e1f42] dark:text-white">Payment Verified</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{payment.date} • 14:32 PM</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Transaction cleared and reconciled by system.</p>
                                </div>
                            </div>
                            <div className="relative pl-10">
                                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#9F7539] border-4 border-white dark:border-[#111827]" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-[#0e1f42] dark:text-white">Invoice Generated</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{payment.date} • 09:12 AM</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">System generated invoice {payment.invoiceId}.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Tenant Information */}
                    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-6 space-y-6">
                        <h3 className="text-sm font-bold text-[#0e1f42] dark:text-white uppercase tracking-wider">Tenant Profile</h3>
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                <User size={32} className="text-gray-300 dark:text-gray-600" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-[#0e1f42] dark:text-white">{payment.tenant}</h4>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest mt-1">Tenant ID: {payment.tenantId}</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                                <Mail size={14} className="text-gray-400" />
                                {payment.tenant.toLowerCase().replace(' ', '.')}@email.com
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                                <Phone size={14} className="text-gray-400" />
                                +234 812 000 0000
                            </div>
                        </div>

                        <button className="w-full py-2.5 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#0e1f42] dark:text-white rounded-xl text-xs font-bold border border-gray-100 dark:border-white/5 transition-all">
                            View Tenant Registry
                        </button>
                    </div>

                    {/* Property Link */}
                    <div className="bg-[#0e1f42] dark:bg-[#111827] rounded-3xl p-6 shadow-sm border border-gray-800 dark:border-white/5 space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Property Link</h3>
                            <Building2 size={16} className="text-[#9F7539]" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-white font-bold text-sm leading-tight">{payment.propertyTitle}</p>
                            <p className="text-[11px] text-gray-400 flex items-center gap-1">
                                <MapPin size={10} />
                                Ikoyi, Lagos Nigeria
                            </p>
                        </div>
                        <Link
                            to={`/admin/properties/${payment.propertyId}`}
                            className="flex items-center justify-between group p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                        >
                            <span className="text-xs font-bold text-white">Full Property Profile</span>
                            <ExternalLink size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPaymentDetails;
