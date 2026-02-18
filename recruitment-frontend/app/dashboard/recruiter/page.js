"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, MapPin, Briefcase, FileText, Check, X, Search, ChevronRight } from "lucide-react";

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingApps, setLoadingApps] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        salaryMin: "",
        salaryMax: "",
        location: "",
        experienceLevel: "mid"
    });

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            await API.post("/jobs", formData);
            alert("Job created successfully!");
            setShowForm(false);
            setFormData({
                title: "",
                description: "",
                salaryMin: "",
                salaryMax: "",
                location: "",
                experienceLevel: "mid"
            });
            fetchMyJobs();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.errors?.[0]?.msg || "Failed to create job");
        }
    };

    const fetchMyJobs = async () => {
        try {
            const res = await API.get("/jobs/my");
            setJobs(res.data);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplications = async (jobId) => {
        setLoadingApps(true);
        setSelectedJob(jobId);
        try {
            const res = await API.get(`/applications/job/${jobId}`);
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to fetch applications", err);
        } finally {
            setLoadingApps(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/applications/${id}`, { status });
            // Update local state to reflect the change immediately
            setApplications(prevApps => prevApps.map(app =>
                app._id === id ? { ...app, status } : app
            ));
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
        }
    };

    useEffect(() => {
        fetchMyJobs();
    }, []);

    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-32 px-4 container mx-auto text-zinc-200">
            {/* Ambient Background Grid */}
            <div className="fixed inset-0 bg-[#09090b] -z-10" />
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>


            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Recruitment Console</h1>
                    <p className="text-zinc-400">Manage your postings and review incoming talent.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
                >
                    {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm ? "Cancel" : "Post New Job"}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl mb-12 border border-white/10 overflow-hidden"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/5 pb-4">Create Job Listing</h2>
                        <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Job Title</label>
                                <input
                                    placeholder="e.g. Senior Product Designer"
                                    className="w-full bg-zinc-800/50 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Location</label>
                                <input
                                    placeholder="e.g. Remote / New York"
                                    className="w-full bg-zinc-800/50 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
                                    required
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Min Salary</label>
                                    <input type="number" placeholder="0" className="w-full bg-zinc-800/50 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors" required value={formData.salaryMin} onChange={e => setFormData({ ...formData, salaryMin: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Max Salary</label>
                                    <input type="number" placeholder="0" className="w-full bg-zinc-800/50 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors" required value={formData.salaryMax} onChange={e => setFormData({ ...formData, salaryMax: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Experience Level</label>
                                <select
                                    className="w-full bg-zinc-800/50 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                                    value={formData.experienceLevel}
                                    onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                                >
                                    <option value="junior" className="bg-zinc-900">Junior</option>
                                    <option value="mid" className="bg-zinc-900">Mid-Level</option>
                                    <option value="senior" className="bg-zinc-900">Senior</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Job Description</label>
                                <textarea
                                    placeholder="Describe the role responsibilities and requirements..."
                                    className="w-full bg-zinc-800/50 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors h-32 resize-none"
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <button className="md:col-span-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01] active:scale-[0.99]">
                                Publish Job Listing
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid lg:grid-cols-12 gap-8 pb-20">
                {/* Jobs List - Left Column */}
                <div className="lg:col-span-5 space-y-4">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-zinc-400" />
                        Active Postings
                    </h2>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(n => <div key={n} className="h-24 bg-zinc-900/50 animate-pulse rounded-xl border border-white/5" />)}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-10 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                            <p>No jobs posted yet.</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-3"
                        >
                            {jobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    variants={item}
                                    onClick={() => fetchApplications(job._id)}
                                    className={`p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${selectedJob === job._id ? 'bg-zinc-800 border-white/30 shadow-lg' : 'bg-zinc-900 border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={`font-bold text-lg mb-1 transition-colors ${selectedJob === job._id ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{job.title}</h3>
                                            <div className="flex gap-2 text-xs text-zinc-500 font-mono">
                                                <span>{job.location}</span>
                                                <span>•</span>
                                                <span className="capitalize">{job.experienceLevel}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-transform ${selectedJob === job._id ? 'text-white translate-x-1' : 'text-zinc-600'}`} />
                                    </div>
                                    {selectedJob === job._id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Applicants Details - Right Column */}
                <div className="lg:col-span-7">
                    <div className="sticky top-32">
                        {selectedJob ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl h-[calc(100vh-160px)] flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Users className="w-6 h-6 text-zinc-400" />
                                        Applicants
                                        <span className="bg-zinc-800 text-zinc-300 text-sm py-0.5 px-2.5 rounded-full border border-white/5">{applications.length}</span>
                                    </h2>
                                </div>

                                {loadingApps ? (
                                    <div className="flex-1 flex items-center justify-center text-zinc-500 animate-pulse">Loading applicants...</div>
                                ) : applications.length === 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 italic">
                                        <Users className="w-12 h-12 text-zinc-800 mb-4" />
                                        <p>No applications received for this role yet.</p>
                                    </div>
                                ) : (
                                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                        {applications.map((app) => (
                                            <motion.div
                                                key={app._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-zinc-950 border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-colors group"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-white/5">
                                                            {app.candidate.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white text-lg">{app.candidate.name}</p>
                                                            <p className="text-sm text-zinc-500">{app.candidate.email}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${app.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                                    <a
                                                        href={`http://localhost:5000/${app.resumePath.replace(/\\/g, "/")}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors hover:underline"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        View Resume
                                                    </a>

                                                    <div className="flex gap-2">
                                                        {app.status !== 'rejected' && (
                                                            <button
                                                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                                onClick={() => updateStatus(app._id, "rejected")}
                                                                title="Reject"
                                                                disabled={app.status === 'rejected'}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        {app.status !== 'accepted' && (
                                                            <button
                                                                className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                                onClick={() => updateStatus(app._id, "accepted")}
                                                                title="Accept"
                                                                disabled={app.status === 'accepted'}
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="h-[calc(100vh-160px)] flex flex-col items-center justify-center text-zinc-600 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                                <Search className="w-16 h-16 mb-4 opacity-20" />
                                <p className="text-lg font-medium">Select a job to view applicants</p>
                                <p className="text-sm">Click on any active posting from the left</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
