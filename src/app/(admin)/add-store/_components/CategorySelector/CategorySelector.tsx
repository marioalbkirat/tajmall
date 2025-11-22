"use client";
import { useState, useRef, useEffect } from "react";
import { FaTag, FaPlus, FaEdit, FaTrash, FaChevronDown, FaTimes } from "react-icons/fa";
interface CategoryType {
    id: string;
    name: string;
}
export default function CategorySelector() {
    const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
    const [newCategory, setNewCategory] = useState<string>('');
    const [categories, setCategories] = useState<CategoryType[]>([
        { id: '1', name: 'Fashion & Apparel' },
        { id: '2', name: 'Electronics & Gaming' },
        { id: '3', name: 'Restaurant & Food' },
        { id: '4', name: 'Jewelry & Accessories' },
        { id: '5', name: 'Home & Furniture' },
    ]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(null);
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
    const handleAddCategory = (): void => {
        if (newCategory.trim()) {
            if (editingCategory) {
                setCategories(categories.map(cat =>
                    cat.id === editingCategory.id
                        ? { ...cat, name: newCategory }
                        : cat
                ));
            } else {
                const newCat: CategoryType = {
                    id: Date.now().toString(),
                    name: newCategory
                };
                setCategories([...categories, newCat]);
            }
            setNewCategory('');
            setEditingCategory(null);
            setShowCategoryModal(false);
        }
    };
    const handleEditCategory = (category: CategoryType, e: React.MouseEvent): void => {
        e.stopPropagation();
        setEditingCategory(category);
        setNewCategory(category.name);
        setShowCategoryModal(true);
        setIsDropdownOpen(false);
    };
    const handleDeleteCategory = (category: CategoryType, e: React.MouseEvent): void => {
        e.stopPropagation();
        setCategoryToDelete(category);
        setShowDeleteModal(true);
        setIsDropdownOpen(false);
    };
    const confirmDelete = (): void => {
        if (categoryToDelete) {
            setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
            if (selectedCategory === categoryToDelete.id) {
                setSelectedCategory("");
            }
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };
    const cancelDelete = (): void => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };
    const currentCategory = categories.find(cat => cat.id === selectedCategory);
    return (
        <div className="group">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-600 mb-3">
                Store Category
            </label>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full pr-12 pl-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md text-left"
                >
                    <div className="flex items-center space-x-3">
                        <FaTag className="h-5 w-5 text-gray-400" />
                        <span className={selectedCategory ? "text-gray-900" : "text-gray-500"}>
                            {currentCategory ? currentCategory.name : "Select category"}
                        </span>
                    </div>
                    <FaChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setEditingCategory(null);
                        setNewCategory('');
                        setShowCategoryModal(true);
                    }}
                    className="absolute left-26 -top-5 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <FaPlus className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                        <div className="p-2">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${selectedCategory === category.id
                                            ? 'bg-green-50 border border-green-200'
                                            : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <div className="flex items-center space-x-3 flex-1">
                                        <FaTag className={`h-4 w-4 ${selectedCategory === category.id ? 'text-green-600' : 'text-gray-400'
                                            }`} />
                                        <span className={`font-medium ${selectedCategory === category.id ? 'text-green-900' : 'text-gray-700'
                                            }`}>
                                            {category.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={(e) => handleEditCategory(category, e)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="Edit category"
                                        >
                                            <FaEdit className="h-3 w-3" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleDeleteCategory(category, e)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete category"
                                        >
                                            <FaTrash className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {categories.length === 0 && (
                                <div className="p-4 text-center text-gray-500">
                                    No categories available. Add your first category!
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {showCategoryModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
                        <div className="bg-linear-to-r from-green-600 to-blue-600 p-6 rounded-t-3xl">
                            <h2 className="text-xl font-bold text-white">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                        </div>
                        <div className="p-6">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                                placeholder="Enter category name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-4"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            />
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleAddCategory}
                                    className="flex-1 bg-linear-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium"
                                >
                                    {editingCategory ? 'Update' : 'Add'}
                                </button>
                                <button
                                    onClick={() => setShowCategoryModal(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && categoryToDelete && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
                        <div className="bg-linear-to-r from-red-600 to-orange-600 p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Delete Category</h2>
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
                                        Are you sure you want to delete <span className="font-medium">{categoryToDelete.name}?</span>
                                        This action cannot be undone.
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