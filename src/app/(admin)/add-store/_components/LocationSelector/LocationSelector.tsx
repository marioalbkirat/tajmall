"use client";
import { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaChevronDown, FaTimes } from "react-icons/fa";
interface LocationType {
    id: string;
    name: string;
}
export default function LocationSelector() {
    const [editingLocation, setEditingLocation] = useState<LocationType | null>(null);
    const [newLocation, setNewLocation] = useState<string>('');
    const [locations, setLocations] = useState<LocationType[]>([
        { id: '1', name: 'Level 1 - Section A' },
        { id: '2', name: 'Level 1 - Section B' },
        { id: '3', name: 'Level 2 - Section A' },
        { id: '4', name: 'Level 2 - Section B' },
        { id: '5', name: 'Level 3 - Section A' },
    ]);
    const [storeLocation, setStoreLocation] = useState<string>("");
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [locationToDelete, setLocationToDelete] = useState<LocationType | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleAddLocation = (): void => {
        if (newLocation.trim()) {
            if (editingLocation) {
                setLocations(locations.map(loc =>
                    loc.id === editingLocation.id
                        ? { ...loc, name: newLocation }
                        : loc
                ));
            } else {
                const newLoc: LocationType = {
                    id: Date.now().toString(),
                    name: newLocation
                };
                setLocations([...locations, newLoc]);
            }
            setNewLocation('');
            setEditingLocation(null);
            setShowLocationModal(false);
        }
    };
    const handleEditLocation = (location: LocationType, e: React.MouseEvent): void => {
        e.stopPropagation();
        setEditingLocation(location);
        setNewLocation(location.name);
        setShowLocationModal(true);
        setIsDropdownOpen(false);
    };
    const handleDeleteLocation = (location: LocationType, e: React.MouseEvent): void => {
        e.stopPropagation();
        setLocationToDelete(location);
        setShowDeleteModal(true);
        setIsDropdownOpen(false);
    };
    const confirmDelete = (): void => {
        if (locationToDelete) {
            setLocations(locations.filter(loc => loc.id !== locationToDelete.id));
            if (storeLocation === locationToDelete.id) {
                setStoreLocation("");
            }
            setShowDeleteModal(false);
            setLocationToDelete(null);
        }
    };
    const cancelDelete = (): void => {
        setShowDeleteModal(false);
        setLocationToDelete(null);
    };
    const selectedLocation = locations.find(loc => loc.id === storeLocation);
    return (
        <div className="group">
            <label htmlFor="storeLocation" className="block text-sm font-semibold text-gray-600 mb-3">
                Store Location
            </label>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full pr-12 pl-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-left"
                >
                    <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                        <span className={storeLocation ? "text-gray-900" : "text-gray-500"}>
                            {selectedLocation ? selectedLocation.name : "Select location"}
                        </span>
                    </div>
                    <FaChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setEditingLocation(null);
                        setNewLocation('');
                        setShowLocationModal(true);
                    }}
                    className="absolute left-26 -top-5 cursor-pointer transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <FaPlus className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                        <div className="p-2">
                            {locations.map((location) => (
                                <div
                                    key={location.id}
                                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                                        storeLocation === location.id 
                                            ? 'bg-blue-50 border border-blue-200' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    onClick={() => {
                                        setStoreLocation(location.id);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <div className="flex items-center space-x-3 flex-1">
                                        <FaMapMarkerAlt className={`h-4 w-4 ${
                                            storeLocation === location.id ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                        <span className={`font-medium ${
                                            storeLocation === location.id ? 'text-blue-900' : 'text-gray-700'
                                        }`}>
                                            {location.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={(e) => handleEditLocation(location, e)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="Edit location"
                                        >
                                            <FaEdit className="h-3 w-3" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleDeleteLocation(location, e)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete location"
                                        >
                                            <FaTrash className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {locations.length === 0 && (
                                <div className="p-4 text-center text-gray-500">
                                    No locations available
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {showLocationModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 rounded-t-3xl">
                            <h2 className="text-xl font-bold text-white">
                                {editingLocation ? 'Edit Location' : 'Add New Location'}
                            </h2>
                        </div>
                        <div className="p-6">
                            <input
                                type="text"
                                value={newLocation}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLocation(e.target.value)}
                                placeholder="Enter location name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                            />
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleAddLocation}
                                    className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                                >
                                    {editingLocation ? 'Update' : 'Add'}
                                </button>
                                <button
                                    onClick={() => setShowLocationModal(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && locationToDelete && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
                        <div className="bg-linear-to-r from-red-600 to-orange-600 p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Delete Location</h2>
                                <button
                                    onClick={cancelDelete}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-red-100 p-3 rounded-full">
                                    <FaTrash className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Confirm Deletion</p>
                                    <p className="text-sm text-gray-600">
                                        Are you sure you want to delete <span className="font-medium">{locationToDelete.name}?</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-linear-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-medium"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}