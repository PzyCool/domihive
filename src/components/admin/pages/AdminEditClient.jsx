import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import {
    ChevronLeft,
    Save,
    X,
    User,
    Mail,
    Phone,
    Camera
} from 'lucide-react';

const AdminEditClient = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { clients, setClients } = useAdmin();

    const client = useMemo(() =>
        clients.find(c => c.id === clientId),
        [clients, clientId]);

    const [formData, setFormData] = useState(client ? {
        name: client.name,
        email: client.email,
        phone: client.phone,
        status: client.status,
        managementFee: client.managementFee
    } : null);

    if (!client || !formData) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">Client not found.</p>
                <Link to="/admin/clients" className="mt-4 text-[#9F7539] hover:underline flex items-center gap-2 mx-auto justify-center">
                    <ChevronLeft size={16} /> Back to Clients
                </Link>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClients(prev => prev.map(c => c.id === clientId ? { ...c, ...formData } : c));
        navigate(`/admin/clients/${clientId}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <Link to="/admin/clients" className="hover:text-[#9F7539]">Clients</Link>
                        <ChevronLeft size={12} className="rotate-180" />
                        <Link to={`/admin/clients/${clientId}`} className="hover:text-[#9F7539]">{client.name}</Link>
                        <ChevronLeft size={12} className="rotate-180" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Edit</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white">Edit Client Profile</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                        <X size={16} /> Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-[#9F7539] hover:bg-[#866230] text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 p-6 shadow-sm text-center">
                        <div className="relative inline-block mx-auto">
                            <img
                                src={client.image}
                                alt={client.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-[#9F7539]/10"
                            />
                        </div>
                        <h3 className="mt-4 font-bold text-[#0e1f42] dark:text-white">{client.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Client ID: {client.id}</p>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5 p-6 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#9F7539] dark:text-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#9F7539] dark:text-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#9F7539] dark:text-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Contract Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#9F7539] dark:text-white transition-colors cursor-pointer"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Expires Soon">Expires Soon</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Management Fee (%)</label>
                                <input
                                    type="number"
                                    name="managementFee"
                                    value={formData.managementFee}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-[#9F7539] dark:text-white transition-colors"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminEditClient;
