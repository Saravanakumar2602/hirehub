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
        <div className="p-10">
            <h1 className="text-2xl mb-4 font-bold">Dashboard</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p className="mb-4 text-lg">
                    Logged in as: <span className="font-semibold text-blue-600 capitalize">{user.role}</span>
                </p>
                <p className="mb-2 text-gray-600">Email: {user.email || "N/A"}</p>
            </div>

            {user.role === "recruiter" && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <h2 className="font-bold text-green-700 mb-2">Recruiter Panel</h2>
                    <p className="text-sm text-green-600">Post jobs and manage applications.</p>
                    <div className="mt-4 flex gap-4">
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Create Job</button>
                        <button className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition">View Applications</button>
                    </div>
                </div>
            )}

            {user.role === "candidate" && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <h2 className="font-bold text-blue-700 mb-2">Candidate Panel</h2>
                    <p className="text-sm text-blue-600">Browse jobs and track your applications.</p>
                    <div className="mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={() => router.push('/jobs')}>Browse Jobs</button>
                    </div>
                </div>
            )}

            <button
                onClick={logout}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
            >
                Logout
            </button>
        </div>
    );
}
