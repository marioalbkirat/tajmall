"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
export default function UserName() {
    const [username, setUserName] = useState<string>("");
    return (
        <div className="group">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-3">
                Username
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                    <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="block w-full pr-12 pl-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                    placeholder="Choose a username"
                />
            </div>
        </div>
    )
}