"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiLogOut,
    FiHome,
    FiTool,
    FiTruck,
    FiUsers,
    FiEye,
    FiUserPlus,
    FiBell,
    FiMessageCircle,
    FiX
} from "react-icons/fi";
import { MdDashboard, MdConstruction, MdInventory } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'warning' | 'success' | 'error';
    read: boolean;
}

interface Department {
    id: string;
    name: string;
    description: string;
    icon: JSX.Element;
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showDepartments, setShowDepartments] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [message, setMessage] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) setIsExpanded(false);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Mock notifications
        setNotifications([
            {
                id: "1",
                title: "New Maintenance Request",
                message: "Store A5 submitted a new maintenance request",
                time: "5 min ago",
                type: "info",
                read: false
            },
            {
                id: "2",
                title: "Approval Required",
                message: "3 pending approvals waiting for your review",
                time: "1 hour ago",
                type: "warning",
                read: false
            },
            {
                id: "3",
                title: "Request Approved",
                message: "Your materials permit has been approved",
                time: "2 hours ago",
                type: "success",
                read: true
            }
        ]);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <div className="flex-1">
                    <div className="py-4 sm:py-6 lg:py-8">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    const toggleSidebar = () => setIsExpanded(!isExpanded);
    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleChat = () => {
        setShowChat(!showChat);
        setShowDepartments(false);
        setSelectedDepartment(null);
        setMessage("");
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const unreadCount = notifications.filter(notif => !notif.read).length;

    const navItems = [
        {
            icon: <FiHome className="text-xl" />,
            label: "Dashboard",
            id: "/dashboard",
            description: "Main dashboard overview"
        },
        {
            icon: <MdConstruction className="text-xl" />,
            label: "Maintenance Permit",
            id: "/maintenance-permit",
            description: "Request maintenance work"
        },
        {
            icon: <MdInventory className="text-xl" />,
            label: "Materials Permit",
            id: "/materials-permit",
            description: "Import/export materials"
        },
        // {
        //     icon: <FiUserPlus className="text-xl" />,
        //     label: "Add Employee",
        //     id: "/add-employee",
        //     description: "Add new store employee"
        // },
        {
            icon: <HiOutlineClipboardList className="text-xl" />,
            label: "Tracking Requests",
            id: "/tracking-requests",
            description: "Track all requests status"
        },
    ];

    const departments: Department[] = [
        {
            id: "engineering",
            name: "Engineering Department",
            description: "Technical and maintenance support",
            icon: <FiTool className="h-5 w-5" />
        },
        {
            id: "operations",
            name: "Operations Department",
            description: "Store operations and management",
            icon: <FiHome className="h-5 w-5" />
        },
        {
            id: "security",
            name: "Security Department",
            description: "Safety and security matters",
            icon: <FiEye className="h-5 w-5" />
        },
        {
            id: "safety",
            name: "Public Safety",
            description: "Health and safety compliance",
            icon: <FiUsers className="h-5 w-5" />
        },
        {
            id: "marketing",
            name: "Marketing Department",
            description: "Promotions and advertising",
            icon: <HiOutlineClipboardList className="h-5 w-5" />
        },
        {
            id: "leasing",
            name: "Leasing Department",
            description: "Store leasing and contracts",
            icon: <FiHome className="h-5 w-5" />
        },
        {
            id: "management",
            name: "General Management",
            description: "Executive management team",
            icon: <FiUsers className="h-5 w-5" />
        }
    ];

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        if (isMobile) {
            setIsExpanded(false);
        }
    };

    const handleDepartmentSelect = (department: Department) => {
        setSelectedDepartment(department);
        setShowDepartments(false);
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedDepartment) {
            // Here you would typically send the message to the API
            console.log(`Sending to ${selectedDepartment.name}: ${message}`);
            setMessage("");
            setSelectedDepartment(null);
            setShowChat(false);
            // Show success message or notification
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'info': return 'text-blue-500 bg-blue-100';
            case 'warning': return 'text-amber-500 bg-amber-100';
            case 'success': return 'text-green-500 bg-green-100';
            case 'error': return 'text-red-500 bg-red-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Overlay for Mobile */}
            {isMobile && isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsExpanded(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:relative z-50
                    sidebar bg-white shadow-2xl border-r border-gray-200
                    transition-all duration-300 ease-in-out
                    ${isExpanded ? "w-64" : "w-20"}
                    ${isMobile && !isExpanded ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
                    flex flex-col
                `}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Header Section */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Toggle Button */}
                    <div className="flex justify-end p-4 border-b border-gray-100">
                        <button
                            onClick={toggleSidebar}
                            className="
                                p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 
                                text-white hover:from-blue-600 hover:to-purple-700 
                                transition-all duration-200 transform hover:scale-105
                                shadow-lg hover:shadow-xl
                            "
                            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
                        </button>
                    </div>

                    {/* Logo Section */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg">TM</span>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Taj Mall
                                    </span>
                                    <span className="text-xs text-gray-500">Management System</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.id}
                                onClick={() => handleItemClick(item.id)}
                                className={`
                                    nav-item group relative
                                    flex items-center space-x-3 p-3 rounded-xl
                                    transition-all duration-200 ease-out
                                    ${activeItem === item.id
                                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 shadow-md"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                                    }
                                `}
                                role="menuitem"
                                aria-label={item.label}
                                title={!isExpanded ? item.label : ""}
                            >
                                <div className={`
                                    nav-icon shrink-0
                                    transition-all duration-200
                                    ${activeItem === item.id
                                        ? "text-blue-600 transform scale-110"
                                        : "text-gray-400 group-hover:text-blue-500"
                                    }
                                `}>
                                    {item.icon}
                                </div>
                                {isExpanded && (
                                    <div className="flex-1 min-w-0">
                                        <span className="nav-label font-medium text-sm transition-all duration-200">
                                            {item.label}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {item.description}
                                        </p>
                                    </div>
                                )}

                                {/* Tooltip for collapsed state */}
                                {!isExpanded && (
                                    <div className="
                                        absolute left-full ml-2 px-2 py-1 
                                        bg-gray-900 text-white text-sm rounded
                                        opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-200
                                        pointer-events-none whitespace-nowrap
                                        z-50 shadow-lg
                                    ">
                                        {item.label}
                                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer Section - Removed user info and logout */}
                <div className="border-t border-gray-100 p-4">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                        <div className="shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-sm">AD</span>
                            </div>
                        </div>
                        {isExpanded && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    Admin Account
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    Super Admin
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar */}
                <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm z-30">
                    <div className="flex items-center justify-between p-4">
                        {/* Page Title - Replaced Search Bar */}
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-900">
                                Taj Mall Management System
                            </h1>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4 ml-6">
                            {/* Store Info */}
                            <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-200">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">FH</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Fashion Haven</p>
                                    <p className="text-xs text-gray-600">Store #A5</p>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={toggleNotifications}
                                    className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                                >
                                    <FiBell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {showNotifications && (
                                    <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                                <div className="flex items-center space-x-2">
                                                    {unreadCount > 0 && (
                                                        <button
                                                            onClick={markAllAsRead}
                                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                                        >
                                                            Mark all as read
                                                        </button>
                                                    )}
                                                    <span className="text-xs text-gray-500">{notifications.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${!notification.read ? 'bg-blue-50' : ''
                                                        }`}
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                                                            <FiBell className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 mb-1">
                                                                {notification.title}
                                                            </p>
                                                            <p className="text-xs text-gray-600 mb-2">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                {notification.time}
                                                            </p>
                                                        </div>
                                                        {!notification.read && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 border-t border-gray-200">
                                            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                View All Notifications
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Logout Button - Moved to Navbar */}
                            <button
                                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                aria-label="Logout"
                            >
                                <FiLogOut className="h-5 w-5" />
                                <span className="font-medium text-sm hidden sm:block">Logout</span>
                            </button>

                            {/* User Avatar */}
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-xs">AD</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 min-w-0 relative">
                    <div className="py-4 sm:py-6 lg:py-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Floating Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center"
            >
                <FiMessageCircle className="h-6 w-6" />
            </button>

            {/* Chat Window */}
            {showChat && (
                <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <FiMessageCircle className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-semibold">
                                        {selectedDepartment ? `Message to ${selectedDepartment.name}` : 'Select Department'}
                                    </p>
                                    <p className="text-xs text-blue-100">
                                        {selectedDepartment ? selectedDepartment.description : 'Choose who to contact'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-blue-200 transition-colors"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Department Selection or Message Input */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        {!selectedDepartment ? (
                            // Department Selection
                            <div className="space-y-3">
                                <p className="text-sm text-gray-600 mb-4">
                                    Select a department to send your message:
                                </p>
                                {departments.map((department) => (
                                    <button
                                        key={department.id}
                                        onClick={() => handleDepartmentSelect(department)}
                                        className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-left"
                                    >
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                            {department.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {department.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {department.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            // Message Input
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                    <p className="text-sm font-medium text-blue-900">
                                        Sending to: {selectedDepartment.name}
                                    </p>
                                    <p className="text-xs text-blue-600">
                                        {selectedDepartment.description}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Your Message
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message here..."
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                    />
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setSelectedDepartment(null)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim()}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Overlay for dropdowns */}
            {(showNotifications || showChat) && (
                <div
                    className="fixed inset-0 bg-opacity-10 z-40"
                    onClick={() => {
                        setShowNotifications(false);
                        if (showChat) {
                            setShowChat(false);
                            setSelectedDepartment(null);
                            setMessage("");
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Sidebar;