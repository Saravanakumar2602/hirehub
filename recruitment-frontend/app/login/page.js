"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(form);
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    Login
                </button>
            </form>
        </div>
    );
}
