"use client";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
export default function Phone() {
    const [phone, setPhone] = useState<string>("");
    return (
        <div className="group">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-600 mb-3">
                Phone Number
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                    <FaPhone className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pr-12 pl-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                    placeholder="+1 (555) 000-0000"
                />
            </div>
        </div>
    )
}