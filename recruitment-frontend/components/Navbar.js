"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    // Hide Navbar on Login/Register Pages
    if (pathname === "/login" || pathname === "/register") {
        return null;
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        HireHub
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/jobs"
                            className={`text-gray-600 hover:text-blue-600 font-medium ${pathname === '/jobs' ? 'text-blue-600' : ''}`}
                        >
                            Start Hiring / Find Jobs
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/dashboard"
                                    className={`text-gray-600 hover:text-blue-600 font-medium ${pathname === '/dashboard' ? 'text-blue-600' : ''}`}
                                >
                                    Dashboard
                                </Link>
                                <div className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm font-semibold capitalize">
                                    {user.role}
                                </div>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
