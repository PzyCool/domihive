import React from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const MaintenanceSummaryCards = ({ requests }) => {
    const total = requests.length;
    const critical = requests.filter(r => r.priority === 'Critical').length;
    const inProgress = requests.filter(r => r.status === 'In Progress').length;
    const completedToday = requests.filter(r => r.status === 'Completed').length;

    const stats = [
        {
            label: "Total Requests",
            value: total,
            icon: <Wrench size={20} />,
            color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
            textColor: "text-[#0e1f42] dark:text-white"
        },
        {
            label: "Critical Priority",
            value: critical,
            subText: "Needs immediate attention",
            icon: <AlertTriangle size={20} />,
            color: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
            textColor: "text-red-700 dark:text-red-400",
            subTextColor: "text-red-500 dark:text-red-400/80"
        },
        {
            label: "In Progress",
            value: inProgress,
            subText: "Currently being worked on",
            icon: <Clock size={20} />,
            color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
            textColor: "text-amber-700 dark:text-amber-400",
            subTextColor: "text-amber-500 dark:text-amber-400/80"
        },
        {
            label: "Completed Today",
            value: completedToday,
            subText: "Successfully resolved",
            icon: <CheckCircle size={20} />,
            color: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400",
            textColor: "text-green-700 dark:text-green-400",
            subTextColor: "text-green-500 dark:text-green-400/80"
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                        <h3 className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</h3>
                        {stat.subText && (
                            <p className={`text-[10px] sm:text-xs font-medium ${stat.subTextColor}`}>
                                {stat.subText}
                            </p>
                        )}
                    </div>
                    <div className={`p-2 rounded-lg ${stat.color} shrink-0`}>
                        {stat.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaintenanceSummaryCards;
