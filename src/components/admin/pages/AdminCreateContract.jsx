import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";

const AdminCreateContract = () => {
  const { clientId } = useParams();
  const { clients } = useAdmin();
  const client = clients.find((c) => c.id === clientId);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs text-gray-500">
          <Link to="/admin/clients" className="hover:text-[#9F7539]">Clients</Link>
          <span className="px-1">&gt;</span>
          <Link to={`/admin/clients/${clientId}`} className="hover:text-[#9F7539]">
            {client?.name || "Client"}
          </Link>
          <span className="px-1">&gt;</span>
          <span>Create Contract</span>
        </div>
        <h1 className="text-lg font-semibold text-[#0e1f42] dark:text-white">
          Create Management Contract for {client?.name || "Client"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Define contract terms and financial arrangements</p>
      </div>

      <div className="space-y-4">
        <section className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Contract Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-xs text-gray-500">
              Contract Type
              <select className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm">
                <option>Select Contract Type</option>
                <option>Full Management</option>
                <option>Placement Only</option>
              </select>
            </label>
            <label className="text-xs text-gray-500">
              Duration (years)
              <input className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm" defaultValue="5" />
            </label>
            <label className="text-xs text-gray-500">
              Start Date
              <input type="date" className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm" />
            </label>
            <label className="text-xs text-gray-500">
              End Date
              <input type="date" className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm" />
            </label>
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Financial Terms</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-xs text-gray-500">
              Management Fee Type
              <select className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm">
                <option>Select Fee Type</option>
                <option>Percentage of Rent</option>
                <option>Fixed Fee</option>
              </select>
            </label>
            <label className="text-xs text-gray-500">
              Fee Amount
              <input className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm" defaultValue="10" />
            </label>
            <label className="text-xs text-gray-500">
              Rent Increment Cycle
              <select className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm">
                <option>Select Cycle</option>
                <option>Every 1 year</option>
                <option>Every 2 years</option>
                <option>Every 3 years</option>
              </select>
            </label>
            <label className="text-xs text-gray-500">
              Increment Type
              <select className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm">
                <option>Select Type</option>
                <option>Fixed %</option>
                <option>Market Review</option>
              </select>
            </label>
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Maintenance Wallet</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-xs text-gray-500">
              Annual Budget
              <input className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm" defaultValue="50000" />
            </label>
            <label className="text-xs text-gray-500">
              Emergency Threshold
              <input className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm" defaultValue="10000" />
            </label>
            <label className="text-xs text-gray-500 md:col-span-2">
              Top-up Schedule
              <select className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm">
                <option>Select Schedule</option>
                <option>Yearly</option>
                <option>Quarterly</option>
                <option>Monthly</option>
              </select>
            </label>
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Payment Terms</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-xs text-gray-500">
              Payout Schedule
              <select className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm">
                <option>Select Schedule</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </label>
            <label className="text-xs text-gray-500">
              Payout Account
              <div className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                {client?.bankName || "Bank"} • {client?.accountNumber || "0000000000"}
                <div className="text-[10px] text-green-600">Verified from client profile</div>
              </div>
            </label>
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white mb-3">Additional Terms</h3>
          <label className="text-xs text-gray-500">
            Special Conditions & Notes
            <textarea
              rows={4}
              className="mt-1 w-full border border-gray-200 dark:border-white/10 dark:bg-[#0f172a] rounded-md px-3 py-2 text-sm"
              placeholder="Enter any additional terms, conditions, or special arrangements..."
            />
          </label>
        </section>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <button className="px-4 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-[#0f172a]">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm border border-[#9F7539] rounded-md text-[#9F7539] bg-transparent">
          Save as Draft
        </button>
        <button className="px-4 py-2 text-sm rounded-md text-white bg-[#9F7539]">
          Create & Activate Contract
        </button>
      </div>
    </div>
  );
};

export default AdminCreateContract;
