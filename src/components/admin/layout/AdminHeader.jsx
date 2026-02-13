import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
    Bell,
    Sun,
    Moon,
    ChevronDown,
    Menu,
    User,
    Settings,
    LogOut,
} from "lucide-react";

const notifications = [
    {}, {},
];

const dropDown = [
    { label: 'Profile', to: '/admin/profile', icon: User },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
    { label: 'Logout', to: '/', icon: LogOut },
];

const AdminHeader = ({ isCollapsed, setIsMobileOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof document === "undefined") return false;
        return document.body.dataset.adminTheme === "dark";
    });
    const dropdownRef = useRef(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("admin-theme");
        if (savedTheme === "dark") {
            setIsDark(true);
            document.body.dataset.adminTheme = "dark";
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.body.dataset.adminTheme = "light";
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.body.dataset.adminTheme = next ? "dark" : "light";
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("admin-theme", next ? "dark" : "light");
        } catch { }
    };

    return (
        <header className="admin-topbar h-14 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#111827]/50 backdrop-blur-md flex items-center justify-between lg:justify-end px-4 sticky top-0 z-40 transition-all duration-300">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
                <Menu size={20} />
            </button>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                {/* Notifications */}
                <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full relative">
                    <Bell size={16} />
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </button>


                {/* User Profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            className='w-8 h-8 rounded-full object-cover' />

                        <div className="hidden sm:block text-left">
                            <p className="text-xs font-bold text-[#0e1f42] dark:text-white">Admin User</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Super Admin</p>
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 dark:text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111827] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 py-1 z-50">
                            {dropDown.map((item) => (
                                <Link to={item.to}
                                    key={item.label}
                                    onClick={() => setDropdownOpen(false)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <item.icon size={16} className={item.label === 'Logout' ? 'text-red-500' : 'text-gray-400'} />
                                    <span className={item.label === 'Logout' ? 'text-red-600' : ''}>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
