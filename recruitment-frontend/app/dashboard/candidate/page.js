"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { motion } from "framer-motion";
import { FileText, Calendar, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

export default function CandidateDashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await API.get("/applications/my");
                setApplications(res.data);
            } catch (err) {
                console.error("Failed to fetch applications", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case 'rejected': return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        }
    };

    return (
        <div className="min-h-screen pt-32 px-4 container mx-auto text-zinc-200">
            {/* Ambient Background Grid */}
            <div className="fixed inset-0 bg-[#09090b] -z-10" />
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

            <div className="flex justify-between items-end mb-12">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold tracking-tight text-white mb-2"
                    >
                        My Applications
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400"
                    >
                        Track the status of your current job applications.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link
                        href="/jobs"
                        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-all text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        Browse More Jobs
                    </Link>
                </motion.div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-32 bg-zinc-900/50 rounded-2xl animate-pulse border border-white/5" />
                    ))}
                </div>
            ) : applications.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl"
                >
                    <Briefcase className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No applications yet</h3>
                    <p className="text-zinc-500 mb-6">Start your journey by applying to open positions.</p>
                    <Link href="/jobs" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                        Explore Opportunities
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4 pb-20"
                >
                    {applications.map((app) => (
                        <motion.div
                            key={app._id}
                            variants={item}
                            whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.2)" }}
                            className="bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-lg transition-all group relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                            {app.job?.title || "Position Unavailable"}
                                        </h2>
                                        <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-zinc-500 font-mono mt-2">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {app.job?.location || "Remote"}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Applied {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                                    <a
                                        href={`http://localhost:5000/${app.resumePath.replace(/\\/g, "/")}`}
                                        target="_blank"
                                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg border border-white/5"
                                    >
                                        <FileText className="w-4 h-4" />
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
