import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function MaintenanceChart({ requests }) {
    return (
        <div className="bg-white dark:bg-[#111827] p-4 md:p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col h-full transition-colors">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-6">Requests by Category</h3>

            <div className="flex-1 flex items-center justify-center gap-4 md:gap-8">
                <div className="relative w-40 h-40">
                    <PieChart
                        data={Object.entries(
                            requests.reduce((acc, req) => {
                                acc[req.category] = (acc[req.category] || 0) + 1;
                                return acc;
                            }, {})
                        ).map(([category, count], index) => {
                            const colors = ['#9F7539', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
                            return {
                                title: category,
                                value: count,
                                color: colors[index % colors.length]
                            };
                        })}
                        lineWidth={30}
                        rounded
                        animate
                        paddingAngle={5}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-[#0e1f42] dark:text-white">{requests.length}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase">Total</span>
                    </div>
                </div>

                <div className="space-y-2 flex-1">
                    {Object.entries(
                        requests.reduce((acc, req) => {
                            acc[req.category] = (acc[req.category] || 0) + 1;
                            return acc;
                        }, {})
                    ).map(([category, count], index) => {
                        console.log(category, count);
                        const colors = ['#9F7539', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
                        const percentage = Math.round((count / requests.length) * 100);
                        return (

                            <div key={category} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    />
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#0e1f42] dark:text-white">{count}</span>
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{percentage}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
