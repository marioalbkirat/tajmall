"use client";
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    FaStore,
    FaMapMarkerAlt,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaWrench,
    FaShippingFast,
    FaKey,
    FaShieldAlt,
    FaChartLine,
    FaCalendarAlt
} from 'react-icons/fa';
import Link from 'next/link';

const MySwal = withReactContent(Swal);
interface StoreInfo {
    name: string;
    location: string;
    owner: string;
    phone: string;
    email: string;
    joinDate: string;
    status: string;
    category: string;
}
export default function StoreProfilePage() {
    const [storeInfo] = useState<StoreInfo>({
        name: "Fashion Haven",
        location: "Level 2, Section A, Store 205",
        owner: "Ahmed Al-Mansoori",
        phone: "+971 50 123 4567",
        email: "ahmed@fashionhaven.ae",
        joinDate: "15 March 2023",
        status: "Active",
        category: "Fashion & Apparel"
    });
    const handleChangePassword = () => {
        MySwal.fire({
            title: <span className="text-2xl font-bold text-purple-600">Change Password</span>,
            html: (
                <div className="text-left space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Confirm new password"
                        />
                    </div>
                </div>
            ),
            showCancelButton: true,
            confirmButtonText: "Update Password",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#8B5CF6",
            cancelButtonColor: "#6B7280",
            customClass: {
                popup: 'rounded-3xl',
                confirmButton: 'px-6 py-3 rounded-xl font-semibold',
                cancelButton: 'px-6 py-3 rounded-xl font-semibold'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: "Password Updated!",
                    text: "Your password has been changed successfully.",
                    icon: "success",
                    confirmButtonColor: "#10B981",
                    customClass: {
                        popup: 'rounded-3xl'
                    }
                });
            }
        });
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Store Profile</h1>
                    <p className="text-xl text-gray-600">Manage your store information and permits</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
                            <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6">
                                <div className="flex items-center space-x-4 space-x-reverse">
                                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                                        <FaStore className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{storeInfo.name}</h2>
                                        <p className="text-blue-100">{storeInfo.category}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center space-x-4 space-x-reverse p-4 bg-blue-50 rounded-2xl">
                                        <div className="bg-blue-100 p-3 rounded-xl">
                                            <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Location</p>
                                            <p className="font-semibold text-gray-900">{storeInfo.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 space-x-reverse p-4 bg-green-50 rounded-2xl">
                                        <div className="bg-green-100 p-3 rounded-xl">
                                            <FaUser className="text-green-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Owner</p>
                                            <p className="font-semibold text-gray-900">{storeInfo.owner}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 space-x-reverse p-4 bg-purple-50 rounded-2xl">
                                        <div className="bg-purple-100 p-3 rounded-xl">
                                            <FaPhone className="text-purple-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone</p>
                                            <p className="font-semibold text-gray-900">{storeInfo.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 space-x-reverse p-4 bg-orange-50 rounded-2xl">
                                        <div className="bg-orange-100 p-3 rounded-xl">
                                            <FaEnvelope className="text-orange-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-semibold text-gray-900">{storeInfo.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 space-x-reverse p-4 bg-indigo-50 rounded-2xl">
                                        <div className="bg-indigo-100 p-3 rounded-xl">
                                            <FaCalendarAlt className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Join Date</p>
                                            <p className="font-semibold text-gray-900">{storeInfo.joinDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 space-x-reverse p-4 bg-emerald-50 rounded-2xl">
                                        <div className="bg-emerald-100 p-3 rounded-xl">
                                            <FaChartLine className="text-emerald-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <p className="font-semibold text-emerald-600">{storeInfo.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
                            <div className="bg-linear-to-r from-gray-800 to-gray-900 p-6">
                                <h3 className="text-xl font-bold text-white">Store Permits</h3>
                                <p className="text-gray-300">Request permits and permissions</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <Link href="/maintenance-permit"
                                    className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl transition-all duration-300 group"
                                >
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900">Maintenance Permit</p>
                                            <p className="text-sm text-gray-600">Request maintenance work</p>
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <FaWrench className="text-blue-600" />
                                    </div>
                                </Link>

                                <Link href="/materials-permit"
                                    className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl transition-all duration-300 group"
                                >
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900">Materials Permit</p>
                                            <p className="text-sm text-gray-600">Import/export materials</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <FaShippingFast className="text-green-600" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
                            <div className="bg-linear-to-r from-purple-600 to-pink-600 p-6">
                                <h3 className="text-xl font-bold text-white">Security</h3>
                                <p className="text-purple-200">Manage account security</p>
                            </div>
                            <div className="p-6">
                                <button
                                    onClick={handleChangePassword}
                                    className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-2xl transition-all duration-300 group"
                                >
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="bg-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                            <FaKey className="text-white text-lg" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900">Change Password</p>
                                            <p className="text-sm text-gray-600">Update your account password</p>
                                        </div>
                                    </div>
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <FaShieldAlt className="text-purple-600" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}