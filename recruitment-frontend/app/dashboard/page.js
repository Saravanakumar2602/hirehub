"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen pt-32 px-4 container mx-auto text-zinc-200">
            <h1 className="text-3xl mb-8 font-light tracking-tight text-white animate-in fade-in slide-in-from-bottom-4">Dashboard</h1>

            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-6 duration-700">
                <p className="mb-2 text-xl font-light">
                    Welcome back, <span className="font-medium text-white capitalize">{user.name || user.role}</span>
                </p>
                <p className="text-zinc-500 font-mono text-sm">{user.email || "N/A"}</p>
                <div className="mt-4 inline-block px-3 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    {user.role} Account
                </div>
            </div>

            {user.role === "recruiter" && (
                <div className="bg-zinc-900/30 border border-green-500/20 p-8 rounded-2xl mb-8 hover:bg-zinc-900/50 transition-colors animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h2 className="font-bold text-green-400 mb-2 text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Recruiter Panel
                    </h2>
                    <p className="text-sm text-zinc-400 mb-6">Access your hiring pipeline and manage job postings.</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/dashboard/recruiter')}
                            className="bg-green-600 text-black px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)]"
                        >
                            Open Console
                        </button>
                    </div>
                </div>
            )}

            {user.role === "candidate" && (
                <div className="bg-zinc-900/30 border border-blue-500/20 p-8 rounded-2xl mb-8 hover:bg-zinc-900/50 transition-colors animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h2 className="font-bold text-blue-400 mb-2 text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Candidate Panel
                    </h2>
                    <p className="text-sm text-zinc-400 mb-6">Track applications and explore new opportunities.</p>
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                            onClick={() => router.push('/jobs')}
                        >
                            Browse Jobs
                        </button>
                        <button
                            className="bg-transparent border border-blue-500/50 text-blue-300 px-6 py-2 rounded-full hover:bg-blue-900/20 transition-all"
                            onClick={() => router.push('/dashboard/candidate')}
                        >
                            My Applications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
