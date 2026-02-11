import React from "react";
import { ChevronRight, Bed, Wallet, User, Calendar } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminPropertyDetails() {
    const { properties, tenants } = useAdmin();
    const navigate = useNavigate();
    const { unitId } = useParams();

    // find unit across all properties
    let unitData = null;

    properties.forEach((prop) => {
        const unit = (prop.units || []).find((u) => u.id === unitId);
        if (unit) {
            const tenant = tenants?.find((t) => t.id === unit.tenantId) || null;

            unitData = {
                ...unit,
                propertyTitle: prop.title,
                propertyImage: prop.image,
                propertyLocation: `${prop.area}, ${prop.state}`,
                tenant,
            };
        }
    });

    if (!unitData) {
        return <div className="text-sm text-gray-500">Unit not found.</div>;
    }

    const { tenant } = unitData;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span
                        className="hover:text-gray-700 cursor-pointer"
                        onClick={() => navigate("/admin/properties")}
                    >
                        Properties
                    </span>
                    <ChevronRight size={14} />
                    <span className="text-gray-700 font-medium">Unit Details</span>
                </div>

                <h1 className="text-2xl font-bold text-[#0e1f42] mt-2">
                    Unit {unitData.unitNumber || "—"}
                </h1>
                <p className="text-sm text-gray-600">
                    {unitData.propertyTitle} • {unitData.propertyLocation}
                </p>
            </div>

            {/* Hero image */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="h-80 w-full overflow-hidden">
                    <img
                        src={unitData.propertyImage}
                        alt={unitData.propertyTitle}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Rent */}
                    <div className="rounded-xl border border-gray-100 p-4 text-center">
                        <Wallet size={18} className="mx-auto text-[#9F7539]" />
                        <p className="text-lg font-semibold text-[#0e1f42] mt-2">
                            ₦{Number(unitData.rent || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Annual Rent</p>
                    </div>

                    {/* Bedrooms */}
                    <div className="rounded-xl border border-gray-100 p-4 text-center">
                        <Bed size={18} className="mx-auto text-[#9F7539]" />
                        <p className="text-lg font-semibold text-[#0e1f42] mt-2">
                            {unitData.bedrooms ?? "—"}
                        </p>
                        <p className="text-xs text-gray-500">Bedrooms</p>
                    </div>

                    {/* Status */}
                    <div className="rounded-xl border border-gray-100 p-4 text-center">
                        <span className="text-lg font-semibold text-[#0e1f42] capitalize">
                            {unitData.status}
                        </span>
                        <p className="text-xs text-gray-500">Unit Status</p>
                    </div>
                </div>
            </div>

            {/* Tenant + Lease section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tenant */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <User size={16} className="text-gray-500" />
                        <h3 className="font-semibold text-[#0e1f42] text-sm">
                            Tenant Information
                        </h3>
                    </div>

                    {tenant ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#9F7539] text-white flex items-center justify-center font-semibold">
                                {tenant.name
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((w) => w[0])
                                    .join("")}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#0e1f42]">
                                    {tenant.name}
                                </p>
                                <p className="text-xs text-gray-500">{tenant.status}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No tenant assigned</p>
                    )}
                </div>

                {/* Lease */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar size={16} className="text-gray-500" />
                        <h3 className="font-semibold text-[#0e1f42] text-sm">
                            Lease Information
                        </h3>
                    </div>

                    {tenant ? (
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-medium text-gray-700">Start:</span>{" "}
                                {tenant.leaseStart}
                            </p>
                            <p>
                                <span className="font-medium text-gray-700">End:</span>{" "}
                                {tenant.leaseEnd}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No active lease</p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button className="bg-[#9F7539] text-white px-4 py-2 rounded-md text-sm font-semibold">
                    Edit Unit
                </button>
                <button className="border border-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray-700">
                    Assign Tenant
                </button>
            </div>
        </div>
    );
}
