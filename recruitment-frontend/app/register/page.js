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
        role: "candidate" // Default role
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(form);
            // AuthContext will handle redirect
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        minLength={6}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">I am a...</label>
                    <select
                        className="w-full p-2 border border-blue-500 bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="candidate">Candidate (Job Seeker)</option>
                        <option value="recruiter">Recruiter (Hiring)</option>
                    </select>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    Sign Up
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </form>
        </div>
    );
}
