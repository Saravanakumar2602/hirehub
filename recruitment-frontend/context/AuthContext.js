"use client";

import { createContext, useContext, useState, useEffect } from "react";
import API from "@/lib/api"; // Ensure this path matches where you put api.js
import { useRouter } from "next/navigation";

// Only run on client-side to avoid "atob is not defined" on server
const decodePayload = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        console.error("Failed to decode token", e);
        return null;
    }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check for token on mount
        const token = localStorage.getItem("token");
        if (token) {
            const payload = decodePayload(token);
            if (payload) setUser(payload);
        }
    }, []);

    const login = async (data) => {
        try {
            const res = await API.post("/auth/login", data);
            localStorage.setItem("token", res.data.token);

            const payload = decodePayload(res.data.token);
            setUser(payload);

            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (data) => {
        try {
            const res = await API.post("/auth/register", data);
            localStorage.setItem("token", res.data.token);

            const payload = decodePayload(res.data.token);
            setUser(payload);

            router.push("/dashboard");
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
