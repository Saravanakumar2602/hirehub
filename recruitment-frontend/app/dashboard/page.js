"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Boxes } from "@/components/ui/background-boxes";
import { motion } from "framer-motion";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen relative w-full overflow-hidden bg-slate-900/0 flex flex-col items-center rounded-lg pt-32">
            {/* Background Boxes Layer */}
            <div className="absolute inset-0 w-full h-full bg-[#09090b] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />

            {/* Main Content Layer */}
            <motion.div
                className="container mx-auto px-4 relative z-30"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl mb-8 font-bold tracking-tight text-white shadow-black drop-shadow-lg"
                >
                    Dashboard
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="bg-zinc-900 border border-white/10 p-8 rounded-2xl mb-8 shadow-2xl"
                >
                    <p className="mb-2 text-2xl font-light text-zinc-100">
                        Welcome back, <span className="font-semibold text-white capitalize">{user.name || user.role}</span>
                    </p>
                    <p className="text-zinc-400 font-mono text-sm mb-4">{user.email || "N/A"}</p>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                        {user.role} Account
                    </div>
                </motion.div>

                {user.role === "recruiter" && (
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, borderColor: "rgba(34,197,94,0.5)" }}
                        className="bg-zinc-900 border border-green-500/30 p-8 rounded-2xl mb-8 transition-colors shadow-lg shadow-green-900/5"
                    >
                        <h2 className="font-bold text-green-400 mb-3 text-xl flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                            Recruiter Panel
                        </h2>
                        <p className="text-base text-zinc-300 mb-8 max-w-2xl">Access your hiring pipeline, post new jobs, and manage candidate applications efficiently.</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => router.push('/dashboard/recruiter')}
                                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                            >
                                Open Console
                            </button>
                        </div>
                    </motion.div>
                )}

                {user.role === "candidate" && (
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, borderColor: "rgba(59,130,246,0.5)" }}
                        className="bg-zinc-900 border border-blue-500/30 p-8 rounded-2xl mb-8 transition-colors shadow-lg shadow-blue-900/5"
                    >
                        <h2 className="font-bold text-blue-400 mb-3 text-xl flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                            Candidate Panel
                        </h2>
                        <p className="text-base text-zinc-300 mb-8 max-w-2xl">Track your active applications, browse new opportunities, and update your profile.</p>
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                onClick={() => router.push('/jobs')}
                            >
                                Browse Jobs
                            </button>
                            <button
                                className="bg-transparent border border-blue-500/50 text-blue-300 px-8 py-3 rounded-full hover:bg-blue-900/20 hover:text-white transition-all font-medium"
                                onClick={() => router.push('/dashboard/candidate')}
                            >
                                My Applications
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
