"use client";
import { useState } from 'react';
import { use } from 'react';
import { FaTools, FaCheckCircle, FaClock, FaUser, FaCalendarAlt, FaBuilding, FaShieldAlt, FaFireExtinguisher, FaChartLine, FaKey, FaUserTie, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Approval {
  department: string;
  employeeName: string;
  decisionDate: string;
  status: 'approved' | 'pending' | 'rejected';
  comments?: string;
}

interface RequestDetails {
  id: string;
  type: 'maintenance-permit' | 'materials-permit';
  title: string;
  description: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high';
  store: string;
  location: string;
  requestedBy: string;
  approvals: Approval[];
}

export default function RequestStatusPage({ params }: { params: Promise<{ requestId: string }> }) {
  // تفكيك params باستخدام React.use()
  const resolvedParams = use(params);
  const requestId = resolvedParams.requestId;
  
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());
  
  const [requestDetails] = useState<RequestDetails>({
    id: requestId, // استخدام requestId المفكوك
    type: 'maintenance-permit',
    title: 'Electrical Maintenance - Store A5',
    description: 'Complete electrical system maintenance including wiring inspection, outlet replacement, and lighting system upgrade. This maintenance is required to ensure safety standards and improve energy efficiency.',
    createdAt: '2024-01-15T10:30:00',
    status: 'pending',
    priority: 'medium',
    store: 'Fashion Haven',
    location: 'Level 2, Section A, Store 205',
    requestedBy: 'Ahmed Al-Mansoori',
    approvals: [
      {
        department: 'Engineering Department',
        employeeName: 'Eng. Mohammed Hassan',
        decisionDate: '2024-01-16T09:15:00',
        status: 'approved',
        comments: 'Technical requirements reviewed and approved. Maintenance plan meets safety standards. All electrical specifications are within acceptable limits.'
      },
      {
        department: 'Operations Department',
        employeeName: 'Ms. Sarah Johnson',
        decisionDate: '2024-01-16T11:30:00',
        status: 'approved',
        comments: 'Operation schedule coordinated. Minimal disruption expected during maintenance hours. Alternative power arrangements confirmed.'
      },
      {
        department: 'Security Department',
        employeeName: 'Mr. James Wilson',
        decisionDate: '2024-01-17T08:45:00',
        status: 'rejected',
        comments: 'Security clearance not granted due to insufficient background checks for external maintenance team. Please resubmit with complete vendor documentation.'
      },
      {
        department: 'Public Safety',
        employeeName: '',
        decisionDate: '',
        status: 'pending',
        comments: ''
      },
      {
        department: 'Marketing Department',
        employeeName: '',
        decisionDate: '',
        status: 'pending',
        comments: ''
      },
      {
        department: 'Leasing Department',
        employeeName: '',
        decisionDate: '',
        status: 'pending',
        comments: ''
      },
      {
        department: 'General Management',
        employeeName: '',
        decisionDate: '',
        status: 'pending',
        comments: ''
      }
    ]
  });

  const toggleDepartment = (department: string) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(department)) {
      newExpanded.delete(department);
    } else {
      newExpanded.add(department);
    }
    setExpandedDepartments(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaClock className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
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
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      default:
        return status;
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Engineering Department':
        return <FaTools className="h-5 w-5 text-blue-600" />;
      case 'Operations Department':
        return <FaBuilding className="h-5 w-5 text-green-600" />;
      case 'Security Department':
        return <FaShieldAlt className="h-5 w-5 text-red-600" />;
      case 'Public Safety':
        return <FaFireExtinguisher className="h-5 w-5 text-orange-600" />;
      case 'Marketing Department':
        return <FaChartLine className="h-5 w-5 text-purple-600" />;
      case 'Leasing Department':
        return <FaKey className="h-5 w-5 text-indigo-600" />;
      case 'General Management':
        return <FaUserTie className="h-5 w-5 text-gray-600" />;
      default:
        return <FaBuilding className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not decided yet';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const approvedCount = requestDetails.approvals.filter(a => a.status === 'approved').length;
  const rejectedCount = requestDetails.approvals.filter(a => a.status === 'rejected').length;
  const totalCount = requestDetails.approvals.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 px-3 sm:py-8 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 p-3 sm:p-4 rounded-2xl">
              <FaTools className="text-white text-2xl sm:text-3xl" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Request Status</h1>
          <p className="text-base sm:text-xl text-gray-600 px-2">Tracking approval progress for {requestId}</p> {/* استخدام requestId المفكوك */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Request Details Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
              <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{requestDetails.title}</h2>
                    <p className="text-blue-100">Request ID: {requestDetails.id}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(requestDetails.status)} mt-3 sm:mt-0`}>
                    {getStatusIcon(requestDetails.status)}
                    <span className="font-medium">{getStatusText(requestDetails.status)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Store</h3>
                    <p className="text-gray-900 font-medium">{requestDetails.store}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Location</h3>
                    <p className="text-gray-900 font-medium">{requestDetails.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Requested By</h3>
                    <p className="text-gray-900 font-medium">{requestDetails.requestedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Priority</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      requestDetails.priority === 'high' ? 'bg-red-100 text-red-800' :
                      requestDetails.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {requestDetails.priority.charAt(0).toUpperCase() + requestDetails.priority.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{requestDetails.description}</p>
                </div>

                {/* Request Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="h-4 w-4" />
                  <span>Request submitted on {formatDate(requestDetails.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Progress Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
            <div className="bg-linear-to-r from-green-600 to-emerald-600 p-6">
              <h2 className="text-xl font-bold text-white text-center">Approval Progress</h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {approvedCount} / {totalCount}
                </div>
                <p className="text-gray-600">Departments Approved</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(approvedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Approved</span>
                  <span className="text-green-600 font-bold">{approvedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rejected</span>
                  <span className="text-red-600 font-bold">{rejectedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending</span>
                  <span className="text-yellow-600 font-bold">{totalCount - approvedCount - rejectedCount}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-gray-800 font-semibold">Total</span>
                  <span className="text-gray-800 font-bold">{totalCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Workflow */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20 mb-8">
          <div className="bg-linear-to-r from-purple-600 to-pink-600 p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Department Approvals</h2>
            <p className="text-purple-200 text-center mt-2">Click on departments with decisions to view details</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {requestDetails.approvals.map((approval, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gray-50">
                          {getDepartmentIcon(approval.department)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{approval.department}</h3>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(approval.status)} mt-2`}>
                          {getStatusIcon(approval.status)}
                          <span className="text-sm font-medium">{getStatusText(approval.status)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Show arrow only for departments with decisions */}
                    {(approval.status === 'approved' || approval.status === 'rejected') && (
                      <button
                        onClick={() => toggleDepartment(approval.department)}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedDepartments.has(approval.department) ? (
                          <FaChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <FaChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedDepartments.has(approval.department) && (
                    <div className="mt-4 pl-16 border-t pt-4 animate-fadeIn">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <FaUser className="h-4 w-4 text-gray-400" />
                          <div>
                            <span className="text-sm font-medium text-gray-500">Approved By</span>
                            <p className="text-gray-900">{approval.employeeName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                          <div>
                            <span className="text-sm font-medium text-gray-500">Decision Date</span>
                            <p className="text-gray-900">{formatDate(approval.decisionDate)}</p>
                          </div>
                        </div>

                        {approval.comments && (
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-500">Comments</span>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                              {approval.comments}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pending departments show waiting message */}
                  {approval.status === 'pending' && (
                    <div className="mt-3 pl-16">
                      <p className="text-sm text-gray-500 italic">
                        Waiting for decision from {approval.department}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <FaCheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{approvedCount} Departments</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <FaClock className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Rejected</h3>
            <p className="text-2xl font-bold text-red-600">{rejectedCount} Department</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <FaClock className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">{totalCount - approvedCount - rejectedCount} Departments</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs sm:text-sm text-gray-500/80">© 2024 Taj Mall. Maintenance Request Tracking System.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}