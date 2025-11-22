"use client";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
export default function StoreName() {
    const [storeName, setStoreName] = useState<string>("");
    return (
        <div className="group">
            <label htmlFor="storeName" className="block text-sm font-semibold text-gray-600 mb-3">
                Store Name
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                    <FaShoppingBag className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                    id="storeName"
                    name="storeName"
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="block w-full pr-12 pl-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                    placeholder="Enter store name"
                />
            </div>
        </div>
    )
}