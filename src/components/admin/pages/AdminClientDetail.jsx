import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { Download, Plus, Pencil, Eye, FileText, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { clients, properties } = useAdmin();
  const client = clients.find((c) => c.id === clientId);
  const portfolio = properties.slice(0, 2);
  const [activeTab, setActiveTab] = useState("overview");

  const contractRows = useMemo(
    () => [
      {
        id: "CTR-001",
        type: client?.contractType || "Full Management",
        duration: client?.contractDuration || "5 years (Jan 2026 - Dec 2030)",
        status: client?.contractStatus || "Active",
        remaining: "3 years 4 months",
        fee: `${client?.managementFeePercent ?? 10}% of rent`
      },
      {
        id: "CTR-002",
        type: "Placement Only",
        duration: "3 years (Jan 2024 - Dec 2026)",
        status: "Expires Soon",
        remaining: "9 months",
        fee: "6% of rent"
      }
    ],
    [client]
  );

  const financeRows = [
    {
      label: "Maintenance Wallet Balance",
      amount: "₦500,000",
      sub: "Top up yearly • next due Jan 2026"
    },
    {
      label: "Total Maintenance Spend (YTD)",
      amount: "₦128,000",
      sub: "Last 30 days: ₦24,000"
    },
    {
      label: "Management Fees Earned (YTD)",
      amount: "₦456,000",
      sub: "Average ₦38k/month"
    }
  ];

  const comms = [
    { id: "msg-1", title: "Contract review notice", detail: "Reminder: contract review due in 45 days.", time: "2 hours ago" },
    { id: "msg-2", title: "Maintenance wallet low", detail: "Wallet balance dropped below ₦50k.", time: "1 day ago" },
    { id: "msg-3", title: "New tenant onboarded", detail: "Unit B-202 moved in successfully.", time: "3 days ago" }
  ];

  if (!client) return <div className="text-sm text-gray-500">Client not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">
            <a href="/admin/clients" className="hover:text-[#9F7539]">Clients</a>
            <span className="px-1">&gt;</span>
            <span>Client Details</span>
          </div>
          <h1 className="text-xl font-semibold text-[#0e1f42] dark:text-white">{client.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{client.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 text-xs border border-gray-200 dark:border-white/10 rounded-md text-gray-600 dark:text-gray-200 bg-white dark:bg-[#0f172a]">
            <Download size={14} /> Generate Report
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 text-xs border border-[#9F7539] rounded-md text-[#9F7539] bg-transparent"
            onClick={() => navigate(`/admin/clients/${clientId}/contracts/new`)}
          >
            <Plus size={14} /> Create New Contract
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-md text-white bg-[#9F7539]">
            <Pencil size={14} /> Edit Client
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <img src={client.avatar} alt={client.name} className="h-14 w-14 rounded-full object-cover" />
            <div>
              <div className="font-semibold text-[#0e1f42] dark:text-white">{client.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Property Owner • Client since {client.clientSince}</div>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">ID Verified</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <div className="text-xs font-semibold text-[#0e1f42] dark:text-white mb-2">Contact Information</div>
              <div className="text-gray-600 dark:text-gray-300">{client.email}</div>
              <div className="text-gray-600 dark:text-gray-300">{client.phone}</div>
              <div className="text-gray-500 dark:text-gray-400">{client.location}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0e1f42] dark:text-white mb-2">Bank Details</div>
              <div className="text-gray-600 dark:text-gray-300">{client.bankName}</div>
              <div className="text-gray-600 dark:text-gray-300">{client.accountNumber}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-[#0e1f42] dark:text-white">Contract Summary</div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">{client.contractStatus}</span>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Contract Type</div>
              <div className="font-medium">{client.contractType}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Contract Duration</div>
              <div className="font-medium">{client.contractDuration}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Management Fee</div>
              <div className="font-medium">{client.managementFeePercent}% of rent</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Maintenance Wallet</div>
              <div className="font-medium">{client.maintenanceWallet}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Rent Increment</div>
              <div className="font-medium">{client.rentIncrement}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Next increment: {client.nextIncrement}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white">Properties Portfolio</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {client.totalProperties} Properties • {client.totalProperties} Total Units
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {portfolio.map((prop) => (
            <div key={prop.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden">
              <img src={prop.image} alt={prop.title} className="h-60 w-full object-cover" />
              <div className="p-4 space-y-2 min-h-[190px] relative">
                <div className="font-semibold text-[#0e1f42] dark:text-white">{prop.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{prop.location}, {prop.area}</div>
                <div className="grid grid-cols-3 text-xs text-gray-500 dark:text-gray-400 pt-4 gap-y-2">
                  <div><div className="font-semibold text-[#0e1f42] dark:text-white">4</div>Total Units</div>
                  <div><div className="font-semibold text-[#0e1f42] dark:text-white">3</div>Occupied</div>
                  <div><div className="font-semibold text-[#0e1f42] dark:text-white">₦180k</div>Monthly Revenue</div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="inline-flex text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">75% Occupied</span>
                  <button
                    className="text-[#9F7539] hover:text-[#7a5a2c]"
                    aria-label="View property details"
                    onClick={() => navigate(`/admin/clients/${clientId}/portfolio`)}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-white/10 flex items-center gap-6 text-sm">
        {[
          { key: "overview", label: "Overview" },
          { key: "contracts", label: "Contracts" },
          { key: "finance", label: "Financial History" },
          { key: "communications", label: "Communications" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 border-b-2 text-sm transition-colors ${
              activeTab === tab.key
                ? "border-[#9F7539] text-[#9F7539] font-medium"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#0e1f42] dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
            <div className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Key Metrics</div>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between"><span>Total Revenue (YTD)</span><span className="font-semibold text-[#0e1f42] dark:text-white">₦4,560,000</span></div>
              <div className="flex items-center justify-between"><span>Management Fees Earned</span><span className="font-semibold text-[#0e1f42] dark:text-white">₦456,000</span></div>
              <div className="flex items-center justify-between"><span>Maintenance Spend</span><span className="font-semibold text-[#0e1f42] dark:text-white">₦18,000</span></div>
              <div className="flex items-center justify-between"><span>Average Occupancy</span><span className="font-semibold text-green-600">87.5%</span></div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
            <div className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Recent Activity</div>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <div className="font-medium text-[#0e1f42] dark:text-white">Rent Payment Received</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Chukwudi Gardens Unit B-202 • 2 hours ago</div>
              </div>
              <div>
                <div className="font-medium text-[#0e1f42] dark:text-white">Maintenance Completed</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Okonkwo Heights Unit A-101 • 1 day ago</div>
              </div>
              <div>
                <div className="font-medium text-[#0e1f42] dark:text-white">New Tenant Onboarded</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Okonkwo Heights Unit A-103 • 3 days ago</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
            <div className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Next Actions</div>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300">
                <div className="font-medium">Contract Review Due</div>
                <div className="text-xs">Annual contract review in 45 days</div>
              </div>
              <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300">
                <div className="font-medium">Maintenance Wallet Low</div>
                <div className="text-xs">₦32k remaining of ₦50k budget</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "contracts" && (
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <div className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-4">Client Contracts</div>
          <div className="space-y-3">
            {contractRows.map((c) => (
              <div key={c.id} className="border border-gray-100 dark:border-white/10 rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-[#0e1f42] dark:text-white">{c.id} • {c.type}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c.duration}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Fee: {c.fee}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">{c.remaining} left</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${c.status === "Active" ? "bg-green-100 text-green-700" : c.status === "Expires Soon" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {c.status}
                  </span>
                  <button className="text-[#9F7539] hover:text-[#7a5a2c]" aria-label="View Contract">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "finance" && (
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <div className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-4">Financial History</div>
          <div className="grid md:grid-cols-3 gap-4">
            {financeRows.map((row) => (
              <div key={row.label} className="border border-gray-100 dark:border-white/10 rounded-lg p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">{row.label}</div>
                <div className="text-lg font-semibold text-[#0e1f42] dark:text-white">{row.amount}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{row.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "communications" && (
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <div className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-4">Communications</div>
          <div className="space-y-3">
            {comms.map((msg) => (
              <div key={msg.id} className="border border-gray-100 dark:border-white/10 rounded-lg p-3 flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-[#9F7539]/10 text-[#9F7539] flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#0e1f42] dark:text-white">{msg.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{msg.detail}</div>
                </div>
                <div className="text-xs text-gray-400">{msg.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClientDetail;
