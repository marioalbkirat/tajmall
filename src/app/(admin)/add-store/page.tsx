"use client";
import { FaShoppingBag, FaPlus, FaInfoCircle } from 'react-icons/fa';
import StoreName from './_components/storeName/storeName';
import UserName from './_components/userName/userName';
import LocationSelector from './_components/LocationSelector/LocationSelector';
import Phone from './_components/phone/phone';
import Email from './_components/email/email';
import CategorySelector from './_components/CategorySelector/CategorySelector';
export default function Page() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/20">
                    <div className="bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500 p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                                    <FaShoppingBag className="text-white text-3xl" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-3">Create New Store</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StoreName />
                            <UserName />
                            <LocationSelector />
                            <CategorySelector />
                            <Phone />
                            <Email />
                        </div>
                        <div className="bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-start space-x-4">
                                <div className="shrink-0">
                                    <div className="bg-linear-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl">
                                        <FaInfoCircle className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-blue-900">Store Information</h3>
                                    <p className="text-blue-700/90 mt-2 leading-relaxed">
                                        After creating the store, login credentials will be sent to the provided email address.
                                        The store owner can then access their dashboard and manage their store.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center pt-6">
                            <button type="submit" className="inline-flex items-center justify-center gap-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-lg group">
                                <FaPlus className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                                Create New Store
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}