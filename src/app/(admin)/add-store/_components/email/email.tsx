"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
export default function Email() {
    const [email, setEmail] = useState<string>("");
    return (
        <div className="group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-3">
                Email Address
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                    <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pr-12 pl-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                    placeholder="store@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </div>
    )
}