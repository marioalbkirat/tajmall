"use client";
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaBox, FaPlus, FaTrash, FaShippingFast, FaPaperPlane, FaCalculator } from 'react-icons/fa';
interface Material {
    id: number;
    name: string;
    description: string;
    quantity: number;
    quantityInWords: string;
    notes: string;
}
export default function MaterialsPermitPage() {
    const [formData, setFormData] = useState({
        permitType: 'import',
        purpose: '',
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: '',
    });
    const [materials, setMaterials] = useState<Material[]>([
        {
            id: 1,
            name: '',
            description: '',
            quantity: 1,
            quantityInWords: '',
            notes: ''
        }
    ]);
    const [estimatedDuration, setEstimatedDuration] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleMaterialChange = (id: number, field: keyof Material, value: string | number) => {
        setMaterials(materials.map(material =>
            material.id === id ? { ...material, [field]: value } : material
        ));
    };
    const addMaterial = () => {
        setMaterials([
            ...materials,
            {
                id: Date.now(),
                name: '',
                description: '',
                quantity: 1,
                quantityInWords: '',
                notes: ''
            }
        ]);
    };
    const removeMaterial = (id: number) => {
        if (materials.length > 1) {
            setMaterials(materials.filter(material => material.id !== id));
        }
    };
    const calculateDuration = () => {
        if (formData.fromDate && formData.toDate && formData.fromTime && formData.toTime) {
            const fromDateTime = new Date(`${formData.fromDate}T${formData.fromTime}`);
            const toDateTime = new Date(`${formData.toDate}T${formData.toTime}`);
            const diffMs = toDateTime.getTime() - fromDateTime.getTime();
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMinutes / 60);
            const diffDays = Math.floor(diffHours / 24);
            const diffMonths = Math.floor(diffDays / 30);
            const remainingDays = diffDays % 30;
            const remainingHours = diffHours % 24;
            const remainingMinutes = diffMinutes % 60;
            let durationText = '';
            if (diffMonths > 0) {
                durationText = `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
                if (remainingDays > 0) {
                    durationText += `, ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
                }
            } else if (diffDays > 0) {
                durationText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
                if (remainingHours > 0) {
                    durationText += `, ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
                }
            } else if (diffHours > 0) {
                durationText = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
                if (remainingMinutes > 0) {
                    durationText += `, ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
                }
            } else {
                durationText = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
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
        console.log('Materials Permit Data:', { ...formData, materials, estimatedDuration });
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-emerald-50 py-4 px-3 sm:py-8 sm:px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="bg-linear-to-r from-green-600 to-emerald-600 p-3 sm:p-4 rounded-2xl">
                            <FaShippingFast className="text-white text-2xl sm:text-3xl" />
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Materials Permit</h1>
                    <p className="text-base sm:text-xl text-gray-600 px-2">Request permit for materials import/export</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-green-200/50 overflow-hidden border border-white/20">
                    <div className="bg-linear-to-r from-green-600 to-emerald-600 p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Materials Permit Application</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="group">
                                <label htmlFor="permitType" className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
                                    Permit Type
                                </label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                                        <FaShippingFast className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="permitType"
                                        name="permitType"
                                        required
                                        value={formData.permitType}
                                        onChange={handleChange}
                                        className="block w-full pr-10 sm:pr-12 pl-3 sm:pl-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md appearance-none text-sm sm:text-base"
                                    >
                                        <option value="import">Import Materials</option>
                                        <option value="export">Export Materials</option>
                                    </select>
                                </div>
                            </div>
                            <div className="group sm:col-span-2">
                                <label htmlFor="purpose" className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
                                    Purpose of {formData.permitType === 'import' ? 'Import' : 'Export'}
                                </label>
                                <input
                                    id="purpose"
                                    name="purpose"
                                    type="text"
                                    required
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="block w-full px-3 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base"
                                    placeholder="Describe the purpose of materials transport..."
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                        {estimatedDuration && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="shrink-0">
                                        <div className="bg-emerald-500 p-2 sm:p-3 rounded-xl">
                                            <FaCalculator className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm sm:text-base font-semibold text-emerald-900">Estimated Duration</h3>
                                        <p className="text-lg sm:text-xl font-bold text-emerald-700 mt-1">{estimatedDuration}</p>
                                        <p className="text-xs sm:text-sm text-emerald-600 mt-1">Calculated automatically based on your selected dates and times</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Materials List</h3>
                                <button
                                    type="button"
                                    onClick={addMaterial}
                                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base"
                                >
                                    <FaPlus className="h-4 w-4" />
                                    Add Material
                                </button>
                            </div>

                            {materials.map((material, index) => (
                                <div key={material.id} className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-base sm:text-lg font-semibold text-gray-800">Material #{index + 1}</h4>
                                        {materials.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeMaterial(material.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-2"
                                            >
                                                <FaTrash className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="group sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Material Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={material.name}
                                                onChange={(e) => handleMaterialChange(material.id, 'name', e.target.value)}
                                                className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white"
                                                placeholder="Enter material name"
                                            />
                                        </div>
                                        <div className="group sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                                            <textarea
                                                value={material.description}
                                                onChange={(e) => handleMaterialChange(material.id, 'description', e.target.value)}
                                                rows={2}
                                                className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white resize-none"
                                                placeholder="Describe the material..."
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Quantity</label>
                                            <input
                                                type="number"
                                                min="1"
                                                required
                                                value={material.quantity}
                                                onChange={(e) => handleMaterialChange(material.id, 'quantity', parseInt(e.target.value) || 1)}
                                                className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white"
                                                placeholder="Quantity"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Quantity in Words</label>
                                            <input
                                                type="text"
                                                required
                                                value={material.quantityInWords}
                                                onChange={(e) => handleMaterialChange(material.id, 'quantityInWords', e.target.value)}
                                                className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white"
                                                placeholder="e.g., Ten boxes"
                                            />
                                        </div>
                                        <div className="group sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Notes</label>
                                            <textarea
                                                value={material.notes}
                                                onChange={(e) => handleMaterialChange(material.id, 'notes', e.target.value)}
                                                rows={2}
                                                className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white resize-none"
                                                placeholder="Any additional notes..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="shrink-0">
                                    <div className="bg-green-500 p-2 sm:p-3 rounded-xl">
                                        <FaBox className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm sm:text-base font-semibold text-green-900">Important Information</h3>
                                    <ul className="text-green-700/90 mt-2 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                        <li>• All materials must be properly documented and declared</li>
                                        <li>• Hazardous materials require special permits</li>
                                        <li>• Transport must be conducted during approved hours</li>
                                        <li>• Approval may take 24-72 hours during business days</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center pt-4 sm:pt-6">
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 sm:py-4 px-6 sm:px-12 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base sm:text-lg group"
                            >
                                <FaPaperPlane className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform" />
                                Submit Permit Request
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center mt-6 sm:mt-8">
                    <p className="text-xs sm:text-sm text-gray-500/80">© 2024 Taj Mall. Professional materials management system.</p>
                </div>
            </div>
        </div>
    );
}