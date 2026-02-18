"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Register() {
    const { register } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "candidate"
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(form);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#09090b] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl w-96 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-500">
                <h2 className="text-2xl font-bold mb-2 text-center text-white tracking-tight">Create Account</h2>
                <p className="text-zinc-500 text-center text-sm mb-6">Join the HireHub network</p>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded text-sm mb-4 text-center">{error}</div>}

                <div className="mb-4">
                    <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-white placeholder-zinc-700"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Email</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-white placeholder-zinc-700"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Password</label>
                    <input
                        type="password"
                        placeholder="••••••"
                        className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-white placeholder-zinc-700"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        minLength={6}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">I am a...</label>
                    <select
                        className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-white/20 text-white"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="candidate">Candidate (Job Seeker)</option>
                        <option value="recruiter">Recruiter (Hiring)</option>
                    </select>
                </div>

                <button className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-zinc-200 transition duration-200 shadow-lg mb-4">
                    Sign Up
                </button>

                <p className="text-center text-sm text-zinc-500">
                    Already have an account? <Link href="/login" className="text-white hover:underline transition-all">Login here</Link>
                </p>
            </form>
        </div>
    );
}
