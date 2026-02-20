import { NavLink } from 'react-router-dom';
import DomihiveLogo from '../../../assets/domihive-logo.png';
import DomihiveIcon from '../../../assets/domihive-lcon.png';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import {
    LayoutDashboard,
    Building2,
    ClipboardCheck,
    FileText,
    Users,
    House,
    Wallet,
    Wrench,
    ChartLine,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/clients', label: 'Clients', icon: Users },
    { to: '/admin/properties', label: 'Properties', icon: Building2 },
    { to: '/admin/inspections', label: 'Inspections', icon: ClipboardCheck },
    { to: '/admin/applications', label: 'Applications', icon: FileText },
    { to: '/admin/tenants', label: 'Tenants', icon: House },
    { to: '/admin/payments', label: 'Payments', icon: Wallet },
    { to: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
    // { to: '/admin/reports', label: 'Reports', icon: ChartLine },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminSidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const [isHoveringLogo, setIsHoveringLogo] = useState(false);
    const showToggle = isCollapsed && isHoveringLogo;
    const showLogo = isCollapsed ? !isHoveringLogo : true;
    const [tooltip, setTooltip] = useState({ text: '', top: 0, left: 0, visible: false });

    const showTooltip = (e, text) => {
        if (!isCollapsed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            text,
            top: rect.top + rect.height / 2,
            left: rect.right + 12,
            visible: true
        });
    };

    const hideTooltip = () => setTooltip((t) => ({ ...t, visible: false }));

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`admin-sidebar bg-white dark:bg-[#111827] dark:backdrop-blur-xl text-gray-600 dark:text-gray-300 h-screen fixed lg:sticky top-0 left-0 shrink-0 border-r border-gray-100 dark:border-white/5 transition-all duration-300 z-50 overflow-hidden
        ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        w-64
      `}
            >
                <div className="flex flex-col h-full min-h-0">
                    {/* Sidebar Header */}
                    <div
                        className={`p-4 h-14 border-b border-gray-100 dark:border-white/5 flex items-center sticky top-0 z-20 bg-white dark:bg-transparent ${isCollapsed ? "lg:justify-center" : "justify-between"}`}
                    >
                        <div
                            className="flex w-full justify-between items-center gap-3 relative"
                            onMouseEnter={() => setIsHoveringLogo(true)}
                            onMouseLeave={() => setIsHoveringLogo(false)}
                        >
                            {showLogo && (
                                <>
                                    {isCollapsed ? (
                                        <img
                                            src={DomihiveIcon}
                                            alt="Logo"
                                            className="h-8"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = DomihiveLogo;
                                            }}
                                        />
                                    ) : (
                                        <img src={DomihiveLogo} alt="Logo" className="h-8" />
                                    )}
                                </>
                            )}

                            {isCollapsed && (
                                <button
                                    onClick={() => setIsCollapsed(false)}
                                    className={`hidden lg:flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer absolute left-1/2 -translate-x-1/2 ${showToggle ? "opacity-100" : "opacity-0 pointer-events-none"
                                        }`}
                                    aria-label="Expand sidebar"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            )}

                            {/* Mobile Close Button */}
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {!isCollapsed && (
                            <button
                                onClick={() => setIsCollapsed(true)}
                                className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-[#9F7539] transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                    </div>

                    <nav
                        className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden min-h-0"
                        onScroll={hideTooltip}
                    >
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                end={item.to === "/admin"}
                                onClick={() => setIsMobileOpen(false)}
                                onMouseEnter={(e) => showTooltip(e, item.label)}
                                onMouseLeave={hideTooltip}
                                className={({ isActive }) =>
                                    `group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all min-w-0 ${isActive
                                        ? "bg-[#9F7539]/10 text-[#9F7539] dark:text-[#cf8a29]"
                                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#0e1f42] dark:hover:text-white"
                                    } ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`
                                }
                            >
                                <div className="shrink-0">{<item.icon size={16} />}</div>
                                <span className={isCollapsed ? "lg:hidden" : ""}>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-100 dark:border-white/5 shrink-0">
                        <NavLink
                            to="/"
                            className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all min-w-0 ${isCollapsed ? "lg:justify-center lg:px-0" : ""
                                }`}
                            onMouseEnter={(e) => showTooltip(e, "Logout")}
                            onMouseLeave={hideTooltip}
                        >
                            <LogOut size={20} className="shrink-0" />
                            <span className={isCollapsed ? "lg:hidden" : ""}>Logout</span>
                        </NavLink>
                    </div>
                </div>
            </aside>

            {tooltip.visible &&
                createPortal(
                    <div
                        className="hidden lg:block fixed px-2 py-1 bg-[#0e1f42] dark:bg-white dark:text-black text-white text-[10px] font-semibold rounded whitespace-nowrap z-[9999] pointer-events-none shadow-lg"
                        style={{ top: tooltip.top, left: tooltip.left, transform: "translateY(-50%)" }}
                    >
                        {tooltip.text}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default AdminSidebar;