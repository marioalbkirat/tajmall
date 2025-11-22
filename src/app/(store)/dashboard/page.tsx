"use client";
import { useState, useEffect } from 'react';
import { 
  FiTrendingUp, 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiShoppingBag,
  FiUsers,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiEye
} from 'react-icons/fi';
import { 
  MdConstruction, 
  MdInventory, 
  MdStore,
  MdAttachMoney
} from 'react-icons/md';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
  description: string;
}

interface RecentActivity {
  id: string;
  type: 'maintenance' | 'materials' | 'employee' | 'approval';
  title: string;
  time: string;
  status: 'completed' | 'pending' | 'approved' | 'rejected';
}

interface ChartData {
  month: string;
  maintenance: number;
  materials: number;
  approvals: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats([
        {
          title: "Total Requests",
          value: "142",
          change: 12.5,
          icon: <FiTrendingUp className="text-2xl" />,
          color: "from-blue-500 to-cyan-500",
          description: "All time requests"
        },
        {
          title: "Pending Approvals",
          value: "23",
          change: -5.2,
          icon: <FiClock className="text-2xl" />,
          color: "from-amber-500 to-orange-500",
          description: "Awaiting decisions"
        },
        {
          title: "Completed Tasks",
          value: "89",
          change: 8.3,
          icon: <FiCheckCircle className="text-2xl" />,
          color: "from-green-500 to-emerald-500",
          description: "Successfully processed"
        },
        {
          title: "Active Stores",
          value: "47",
          change: 3.1,
          icon: <FiShoppingBag className="text-2xl" />,
          color: "from-purple-500 to-pink-500",
          description: "Currently operating"
        }
      ]);

      setRecentActivities([
        {
          id: "1",
          type: "maintenance",
          title: "Electrical Maintenance - Store A5",
          time: "2 hours ago",
          status: "completed"
        },
        {
          id: "2",
          type: "materials",
          title: "Import Furniture Materials",
          time: "4 hours ago",
          status: "approved"
        },
        {
          id: "3",
          type: "employee",
          title: "New Store Manager Added",
          time: "6 hours ago",
          status: "completed"
        },
        {
          id: "4",
          type: "approval",
          title: "Security Department Approval",
          time: "1 day ago",
          status: "pending"
        },
        {
          id: "5",
          type: "maintenance",
          title: "AC System Repair - Store B2",
          time: "1 day ago",
          status: "rejected"
        }
      ]);

      setChartData([
        { month: "Jan", maintenance: 12, materials: 8, approvals: 15 },
        { month: "Feb", maintenance: 18, materials: 12, approvals: 22 },
        { month: "Mar", maintenance: 15, materials: 10, approvals: 18 },
        { month: "Apr", maintenance: 22, materials: 15, approvals: 25 },
        { month: "May", maintenance: 19, materials: 14, approvals: 21 },
        { month: "Jun", maintenance: 25, materials: 18, approvals: 28 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <MdConstruction className="text-blue-500" />;
      case 'materials':
        return <MdInventory className="text-green-500" />;
      case 'employee':
        return <FiUsers className="text-purple-500" />;
      case 'approval':
        return <FiCheckCircle className="text-amber-500" />;
      default:
        return <FiCalendar className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h1>
              <p className="text-lg text-gray-600">
                Welcome back! Here's what's happening with your stores today.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl px-4 py-2 shadow-lg border border-white/20">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="font-semibold text-gray-900">Just now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {stat.change >= 0 ? (
                      <FiArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <FiArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {stat.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Request Trends
                </h2>
                <p className="text-gray-600">
                  Monthly overview of maintenance, materials, and approval requests
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Maintenance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Materials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Approvals</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {chartData.map((monthData, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-medium text-gray-600">
                        {monthData.month}
                      </div>
                      <div className="flex-1 flex items-center space-x-2">
                        <div 
                          className="h-8 bg-blue-500 rounded-lg transition-all duration-500 ease-out"
                          style={{ width: `${(monthData.maintenance / 30) * 100}%` }}
                        ></div>
                        <div 
                          className="h-8 bg-green-500 rounded-lg transition-all duration-500 ease-out"
                          style={{ width: `${(monthData.materials / 30) * 100}%` }}
                        ></div>
                        <div 
                          className="h-8 bg-purple-500 rounded-lg transition-all duration-500 ease-out"
                          style={{ width: `${(monthData.approvals / 30) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {monthData.maintenance + monthData.materials}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Quick Actions
              </h2>
              <p className="text-gray-600">
                Frequently used actions and shortcuts
              </p>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <MdConstruction className="text-xl" />
                <span className="font-semibold">New Maintenance Request</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <MdInventory className="text-xl" />
                <span className="font-semibold">Materials Permit</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <FiUsers className="text-xl" />
                <span className="font-semibold">Add Employee</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <FiEye className="text-xl" />
                <span className="font-semibold">Track Requests</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Recent Activities
                </h2>
                <p className="text-gray-600">
                  Latest updates and actions across the system
                </p>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Activities →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-white transition-colors duration-200">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Store Performance</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-blue-200 text-xs">Excellent</p>
              </div>
              <MdStore className="text-3xl opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Approval Rate</p>
                <p className="text-2xl font-bold">87.5%</p>
                <p className="text-green-200 text-xs">Above Average</p>
              </div>
              <FiCheckCircle className="text-3xl opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Response Time</p>
                <p className="text-2xl font-bold">2.4h</p>
                <p className="text-purple-200 text-xs">Fast</p>
              </div>
              <FiClock className="text-3xl opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}