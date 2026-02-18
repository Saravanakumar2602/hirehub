"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, IndianRupee } from "lucide-react"; // I'll assume you have these or can install

export default function JobsPage() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [resume, setResume] = useState(null);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await API.get("/jobs");
            setJobs(res.data.jobs || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleApply = async (jobId) => {
        if (!resume) {
            alert("Please select a resume file");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);

        try {
            await API.post(`/applications/${jobId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Application submitted successfully!");
            setSelectedJob(null);
            setResume(null);

        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || "Error applying";
            alert(msg);
        }
    };

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

    return (
        <div className="min-h-screen pt-32 px-4 container mx-auto text-zinc-200">
            {/* Ambient Background Grid */}
            <div className="fixed inset-0 bg-[#09090b] -z-10" />
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-12 text-white tracking-tight drop-shadow-lg"
            >
                Available Positions
            </motion.h1>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-64 bg-zinc-900/50 rounded-2xl animate-pulse border border-white/5" />
                    ))}
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 italic border border-dashed border-zinc-800 rounded-3xl">
                    <p>No open positions at the moment.</p>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20"
                >
                    {jobs.map((job) => (
                        <motion.div
                            key={job._id}
                            variants={item}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">{job.title}</h2>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="flex items-center gap-1 bg-zinc-800/50 px-3 py-1 rounded-full border border-white/5 text-xs font-medium text-zinc-400">
                                        <MapPin className="w-3 h-3" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1 bg-zinc-800/50 px-3 py-1 rounded-full border border-white/5 text-xs font-medium text-zinc-400">
                                        <Briefcase className="w-3 h-3" /> {job.experienceLevel}
                                    </span>
                                </div>

                                <p className="text-zinc-400 mb-6 text-sm leading-relaxed line-clamp-3 font-light">
                                    {job.description}
                                </p>

                                <div className="flex items-center gap-1 font-mono text-emerald-400 text-sm mb-6 bg-emerald-950/30 w-fit px-3 py-1 rounded border border-emerald-500/20">
                                    <IndianRupee className="w-3.5 h-3.5" />
                                    {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
                                </div>
                            </div>

                            {user?.role === "candidate" ? (
                                <div className="mt-auto pt-6 border-t border-white/5">
                                    <AnimatePresence mode="wait">
                                        {selectedJob === job._id ? (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Upload Resume (PDF)</label>
                                                    <input
                                                        type="file"
                                                        accept="application/pdf"
                                                        className="block w-full text-sm text-zinc-400
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-xs file:font-semibold
                                                        file:bg-zinc-800 file:text-white
                                                        hover:file:bg-zinc-700 cursor-pointer transition-colors
                                                        "
                                                        onChange={(e) => setResume(e.target.files[0])}
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleApply(job._id)}
                                                        className="flex-1 bg-white text-black py-2.5 rounded-full hover:bg-zinc-200 transition-all font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                                                    >
                                                        Submit Application
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedJob(null); setResume(null); }}
                                                        className="px-4 py-2 text-zinc-500 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                onClick={() => setSelectedJob(job._id)}
                                                className="w-full bg-white/5 text-white py-3 rounded-xl hover:bg-white/10 transition-all font-medium border border-white/10 hover:border-white/30 text-sm group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:border-transparent"
                                            >
                                                Apply Now
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="mt-auto pt-6 border-t border-white/5 text-center text-xs text-zinc-600 font-mono uppercase tracking-widest">
                                    {user ? "Login as Candidate" : "Login to apply"}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
