"use client";
import { useState, useEffect } from 'react';
import { FaWrench, FaCalendarAlt, FaClock, FaStickyNote, FaPaperPlane, FaCalculator } from 'react-icons/fa';

export default function Page() {
    const [formData, setFormData] = useState({
        maintenanceDetails: '',
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: '',
        notes: ''
    });

    const [estimatedDuration, setEstimatedDuration] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const calculateDuration = () => {
        if (formData.fromDate && formData.toDate && formData.fromTime && formData.toTime) {
            const fromDateTime = new Date(`${formData.fromDate}T${formData.fromTime}`);
            const toDateTime = new Date(`${formData.toDate}T${formData.toTime}`);

            const diffMs = toDateTime.getTime() - fromDateTime.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffHours / 24);
            const remainingHours = diffHours % 24;

            let durationText = '';

            if (diffDays > 0) {
                durationText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
                if (remainingHours > 0) {
                    durationText += ` and ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
                }
            } else {
                durationText = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
            }

            setEstimatedDuration(durationText);
        } else {
            setEstimatedDuration('');
        }
    };

    useEffect(() => {
        calculateDuration();
    }, [formData.fromDate, formData.toDate, formData.fromTime, formData.toTime]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Maintenance Permit Data:', { ...formData, estimatedDuration });
        // هنا تضيف منطق إرسال الطلب
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 px-3 sm:py-8 sm:px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-3 sm:p-4 rounded-2xl">
                            <FaWrench className="text-white text-2xl sm:text-3xl" />
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Maintenance Work Permit</h1>
                    <p className="text-base sm:text-xl text-gray-600 px-2">Request approval for maintenance work in your store</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Maintenance Request Form</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                        {/* Maintenance Details */}
                        <div className="group">
                            <label htmlFor="maintenanceDetails" className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                                Maintenance Details
                            </label>
                            <div className="relative">
                                <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-start pointer-events-none">
                                    <FaWrench className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <textarea
                                    id="maintenanceDetails"
                                    name="maintenanceDetails"
                                    required
                                    value={formData.maintenanceDetails}
                                    onChange={handleChange}
                                    rows={4}
                                    className="block w-full pr-10 sm:pr-12 pl-4 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md resize-none text-sm sm:text-base"
                                    placeholder="Describe the maintenance work required in detail..."
                                />
                            </div>
                        </div>

                        {/* Date and Time Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* From Date */}
                            <div className="group">
                                <label htmlFor="fromDate" className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                    </div>
                                    <input
                                        id="fromDate"
                                        name="fromDate"
                                        type="date"
                                        required
                                        value={formData.fromDate}
                                        onChange={handleChange}
                                        className="block w-full pr-10 sm:pr-12 pl-3 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="group">
                                <label htmlFor="toDate" className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
                                    End Date
                                </label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                    </div>
                                    <input
                                        id="toDate"
                                        name="toDate"
                                        type="date"
                                        required
                                        value={formData.toDate}
                                        onChange={handleChange}
                                        className="block w-full pr-10 sm:pr-12 pl-3 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* From Time */}
                            <div className="group">
                                <label htmlFor="fromTime" className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
                                    Start Time
                                </label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                                        <FaClock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        id="fromTime"
                                        name="fromTime"
                                        type="time"
                                        required
                                        value={formData.fromTime}
                                        onChange={handleChange}
                                        className="block w-full pr-10 sm:pr-12 pl-3 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* To Time */}
                            <div className="group">
                                <label htmlFor="toTime" className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
                                    End Time
                                </label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                                        <FaClock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        id="toTime"
                                        name="toTime"
                                        type="time"
                                        required
                                        value={formData.toTime}
                                        onChange={handleChange}
                                        className="block w-full pr-10 sm:pr-12 pl-3 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Estimated Duration Display */}
                        {estimatedDuration && (
                            <div className="bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="bg-green-500 p-2 sm:p-3 rounded-xl">
                                            <FaCalculator className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm sm:text-base font-semibold text-green-900">Estimated Duration</h3>
                                        <p className="text-lg sm:text-xl font-bold text-green-700 mt-1">{estimatedDuration}</p>
                                        <p className="text-xs sm:text-sm text-green-600 mt-1">Calculated automatically based on your selected dates and times</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        <div className="group">
                            <label htmlFor="notes" className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                                Additional Notes
                            </label>
                            <div className="relative">
                                <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-start pointer-events-none">
                                    <FaStickyNote className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                </div>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="block w-full pr-10 sm:pr-12 pl-4 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md resize-none text-sm sm:text-base"
                                    placeholder="Any additional information or special requirements..."
                                />
                            </div>
                        </div>

                        {/* Information Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="bg-blue-500 p-2 sm:p-3 rounded-xl">
                                        <FaWrench className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm sm:text-base font-semibold text-blue-900">Important Information</h3>
                                    <ul className="text-blue-700/90 mt-2 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                        <li>• Maintenance work must be conducted during mall operating hours</li>
                                        <li>• All tools and equipment must be removed after work completion</li>
                                        <li>• Emergency contact information must be provided</li>
                                        <li>• Approval may take 24-48 hours during business days</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4 sm:pt-6">
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 px-6 sm:px-12 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base sm:text-lg group"
                            >
                                <FaPaperPlane className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform" />
                                Submit Maintenance Request
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-6 sm:mt-8">
                    <p className="text-xs sm:text-sm text-gray-500/80">© 2024 Taj Mall. Professional maintenance management system.</p>
                </div>
            </div>
        </div>
    );
}