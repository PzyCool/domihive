import { useMemo, useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import MaintenanceSummaryCards from '../maintenance/MaintenanceSummaryCards';
import MaintenanceFilters from '../maintenance/MaintenanceFilters';
import MaintenanceTable from '../maintenance/MaintenanceTable';
import MaintenanceChart from '../maintenance/MaintenanceChart';

export default function AdminMaintenance() {
    const { maintenanceRequests, properties } = useAdmin();

    // Filter
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [priority, setPriority] = useState('all');
    const [category, setCategory] = useState('all');
    const [property, setProperty] = useState('all');

    const filteredRequests = useMemo(() => {
        return maintenanceRequests.filter(req => {
            const matchesSearch = !search ||
                req.id.toLowerCase().includes(search.toLowerCase()) ||
                req.tenant.toLowerCase().includes(search.toLowerCase()) ||
                req.propertyTitle.toLowerCase().includes(search.toLowerCase()) ||
                req.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
                req.description.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = status === 'all' || req.status === status;
            const matchesPriority = priority === 'all' || req.priority === priority;
            const matchesCategory = category === 'all' || req.category === category;
            const matchesProperty = property === 'all' || req.propertyId === property;

            return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesProperty;
        });
    }, [maintenanceRequests, search, status, priority, category, property]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white">Maintenance Queue</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track all maintenance requests across your properties.</p>
            </div>

            <MaintenanceSummaryCards requests={maintenanceRequests} />

            <MaintenanceChart requests={maintenanceRequests} />

            <MaintenanceFilters
                search={search} setSearch={setSearch}
                status={status} setStatus={setStatus}
                priority={priority} setPriority={setPriority}
                category={category} setCategory={setCategory}
                property={property} setProperty={setProperty}
                properties={properties}
            />

            <MaintenanceTable requests={filteredRequests} />
        </div>
    );
};

