"use client";
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaClock, FaCheckCircle, FaTimesCircle, FaEye, FaSort, FaTools, FaBox, FaCheckDouble } from 'react-icons/fa';

interface Request {
    id: string;
    type: 'maintenance-permit' | 'materials-permit';
    title: string;
    createdAt: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    priority: 'low' | 'medium' | 'high';
    completedAt?: string;
}

export default function TrackingRequestsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'completed'>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'maintenance-permit' | 'materials-permit'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    // Mock data for requests
    const mockRequests: Request[] = [
        {
            id: 'REQ-001',
            type: 'maintenance-permit',
            title: 'Electrical Maintenance - Store A5',
            createdAt: '2024-01-15T10:30:00',
            status: 'completed',
            priority: 'medium',
            completedAt: '2024-01-18T14:20:00'
        },
        {
            id: 'REQ-002',
            type: 'materials-permit',
            title: 'Import Furniture Materials',
            createdAt: '2024-01-14T14:20:00',
            status: 'completed',
            priority: 'low',
            completedAt: '2024-01-16T09:15:00'
        },
        {
            id: 'REQ-003',
            type: 'maintenance-permit',
            title: 'AC System Repair - Store B2',
            createdAt: '2024-01-14T09:15:00',
            status: 'rejected',
            priority: 'high'
        },
        {
            id: 'REQ-004',
            type: 'materials-permit',
            title: 'Export Old Inventory',
            createdAt: '2024-01-13T16:45:00',
            status: 'approved',
            priority: 'medium'
        },
        {
            id: 'REQ-005',
            type: 'maintenance-permit',
            title: 'Plumbing Issues - Store C1',
            createdAt: '2024-01-12T11:00:00',
            status: 'pending',
            priority: 'high'
        },
        {
            id: 'REQ-006',
            type: 'materials-permit',
            title: 'Import Electronics Stock',
            createdAt: '2024-01-11T08:00:00',
            status: 'completed',
            priority: 'medium',
            completedAt: '2024-01-13T16:30:00'
        },
        {
            id: 'REQ-007',
            type: 'maintenance-permit',
            title: 'Lighting System Upgrade',
            createdAt: '2024-01-10T13:20:00',
            status: 'pending',
            priority: 'low'
        },
        {
            id: 'REQ-008',
            type: 'materials-permit',
            title: 'Export Seasonal Items',
            createdAt: '2024-01-09T10:45:00',
            status: 'completed',
            priority: 'medium',
            completedAt: '2024-01-12T11:20:00'
        }
    ];

    const filteredAndSortedRequests = mockRequests
        .filter(request => {
            const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
            const matchesType = typeFilter === 'all' || request.type === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
        });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <FaClock className="text-yellow-500" />;
            case 'approved':
                return <FaCheckCircle className="text-green-500" />;
            case 'rejected':
                return <FaTimesCircle className="text-red-500" />;
            case 'completed':
                return <FaCheckDouble className="text-blue-500" />;
            default:
                return <FaClock className="text-gray-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Rejected';
            case 'completed':
                return 'Completed';
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'maintenance-permit':
                return <FaTools className="h-4 w-4" />;
            case 'materials-permit':
                return <FaBox className="h-4 w-4" />;
            default:
                return <FaTools className="h-4 w-4" />;
        }
    };

    const getTypeText = (type: string) => {
        switch (type) {
            case 'maintenance-permit':
                return 'Maintenance';
            case 'materials-permit':
                return 'Materials';
            default:
                return type;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'maintenance-permit':
                return 'bg-blue-100 text-blue-800';
            case 'materials-permit':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCompletionTime = (createdAt: string, completedAt?: string) => {
        if (!completedAt) return 'N/A';

        const created = new Date(createdAt);
        const completed = new Date(completedAt);
        const diffMs = completed.getTime() - created.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (diffDays > 0) {
            return `${diffDays}d ${diffHours}h`;
        } else {
            return `${diffHours}h`;
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 px-3 sm:py-8 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-3 sm:p-4 rounded-2xl">
                            <FaEye className="text-white text-2xl sm:text-3xl" />
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Request Tracking</h1>
                    <p className="text-base sm:text-xl text-gray-600 px-2">Track the status of your maintenance and materials permit requests</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-200/50 border border-white/20 p-4 sm:p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative sm:col-span-2">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by ID or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 sm:pl-12 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                            />
                        </div>

                        {/* Type Filter */}
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as any)}
                            className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                        >
                            <option value="all">All Types</option>
                            <option value="maintenance-permit">Maintenance</option>
                            <option value="materials-permit">Materials</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Sort and Stats Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-sm"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Total: {filteredAndSortedRequests.length} requests</span>
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
                    {/* Desktop Table */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-linear-to-r from-blue-600 to-purple-600">
                                <tr>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Request ID</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Type</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Title</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Submitted</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Priority</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Status</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Completion Time</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAndSortedRequests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.id}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getTypeColor(request.type)}`}>
                                                {getTypeIcon(request.type)}
                                                <span className="text-xs font-medium">{getTypeText(request.type)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{request.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(request.createdAt)}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                                                {getStatusIcon(request.status)}
                                                <span className="text-xs font-medium">{getStatusText(request.status)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {request.status === 'completed' ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-blue-600">
                                                        {getCompletionTime(request.createdAt, request.completedAt)}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {request.completedAt && formatDate(request.completedAt)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <Link
                                                href={`/tracking-requests/${request.id}`}
                                                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm"
                                            >
                                                <FaEye className="h-3 w-3" />
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="sm:hidden space-y-4 p-4">
                        {filteredAndSortedRequests.map((request) => (
                            <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getTypeColor(request.type)}`}>
                                            {getTypeIcon(request.type)}
                                            <span className="font-medium">{getTypeText(request.type)}</span>
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                        </span>
                                    </div>
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                                        {getStatusIcon(request.status)}
                                        <span className="font-medium">{getStatusText(request.status)}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div>
                                        <span className="text-xs text-gray-500">Request ID:</span>
                                        <p className="text-sm font-medium text-gray-900">{request.id}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Title:</span>
                                        <p className="text-sm text-gray-900">{request.title}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Submitted:</span>
                                        <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
                                    </div>
                                    {request.status === 'completed' && (
                                        <div>
                                            <span className="text-xs text-gray-500">Completed:</span>
                                            <p className="text-sm text-blue-600 font-medium">
                                                {getCompletionTime(request.createdAt, request.completedAt)}
                                            </p>
                                            {request.completedAt && (
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(request.completedAt)}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href={`/tracking-requests/${request.id}`}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium text-sm"
                                >
                                    <FaEye className="h-3 w-3" />
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredAndSortedRequests.length === 0 && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-4">
                                <div className="bg-gray-100 p-4 rounded-2xl">
                                    <FaSearch className="h-8 w-8 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                            <p className="text-gray-600">No requests match your search criteria.</p>
                        </div>
                    )}
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FaClock className="h-5 w-5 text-yellow-500" />
                            <span className="text-lg font-semibold text-gray-900">Pending</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">
                            {mockRequests.filter(r => r.status === 'pending').length}
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FaCheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-lg font-semibold text-gray-900">Approved</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                            {mockRequests.filter(r => r.status === 'approved').length}
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FaTimesCircle className="h-5 w-5 text-red-500" />
                            <span className="text-lg font-semibold text-gray-900">Rejected</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">
                            {mockRequests.filter(r => r.status === 'rejected').length}
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FaCheckDouble className="h-5 w-5 text-blue-500" />
                            <span className="text-lg font-semibold text-gray-900">Completed</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                            {mockRequests.filter(r => r.status === 'completed').length}
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FaEye className="h-5 w-5 text-purple-500" />
                            <span className="text-lg font-semibold text-gray-900">Total</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                            {mockRequests.length}
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6 sm:mt-8">
                    <p className="text-xs sm:text-sm text-gray-500/80">© 2024 Taj Mall. Advanced Request Management System.</p>
                </div>
            </div>
        </div>
    );
}