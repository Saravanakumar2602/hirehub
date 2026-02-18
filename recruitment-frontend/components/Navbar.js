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
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <nav className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 shadow-2xl flex items-center gap-8 max-w-5xl w-full justify-between transition-all hover:bg-black/60 hover:border-white/20">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent hover:to-white transition-all duration-500">
                    HIREHUB
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <Link
                        href="/jobs"
                        className={`relative group hover:text-white transition-colors duration-300 ${pathname === '/jobs' ? 'text-white' : ''}`}
                    >
                        Find Jobs
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {user?.role === 'recruiter' && (
                        <Link
                            href="/dashboard/recruiter"
                            className="relative group hover:text-white transition-colors duration-300"
                        >
                            Post a Job
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className={`relative group text-sm font-medium hover:text-white transition-colors duration-300 ${pathname === '/dashboard' ? 'text-white' : 'text-zinc-400'}`}
                            >
                                Dashboard
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <div className="h-4 w-[1px] bg-white/10"></div>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-300 hover:scale-105"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-2 relative group"
                            >
                                Log In
                                <span className="absolute -bottom-1 left-2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
                            </Link>
                            <Link
                                href="/register"
                                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95"
                            >
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
