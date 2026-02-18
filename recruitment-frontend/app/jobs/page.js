"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

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
            setJobs(res.data.jobs || []); // Correctly access the jobs array
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

    return (
        <div className="min-h-screen pt-32 px-4 container mx-auto text-zinc-200">
            <h1 className="text-3xl font-light mb-8 text-white tracking-tight">Available Positions</h1>

            {loading ? (
                <p className="text-zinc-500 animate-pulse">Loading opportunities...</p>
            ) : jobs.length === 0 ? (
                <p className="text-zinc-500 italic">No open positions at the moment.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.title}</h2>
                                <div className="flex gap-2 mb-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                                    <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{job.location}</span>
                                    <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{job.experienceLevel}</span>
                                </div>
                                <p className="text-zinc-400 mb-6 text-sm leading-relaxed line-clamp-3">{job.description}</p>
                                <p className="font-mono text-green-400 text-sm mb-4">
                                    ₹{job.salaryMin.toLocaleString()} - ₹{job.salaryMax.toLocaleString()}
                                </p>
                            </div>

                            {user?.role === "candidate" ? (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    {selectedJob === job._id ? (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
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
                                                    hover:file:bg-zinc-700 cursor-pointer
                                                    "
                                                    onChange={(e) => setResume(e.target.files[0])}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApply(job._id)}
                                                    className="flex-1 bg-white text-black py-2 rounded-lg hover:bg-zinc-200 transition font-bold text-sm"
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedJob(null); setResume(null); }}
                                                    className="px-4 py-2 text-zinc-500 hover:text-white transition text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedJob(job._id)}
                                            className="w-full bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition font-medium border border-white/5"
                                        >
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-zinc-600 font-mono">
                                    {user ? "Login as Candidate to apply" : "Login to apply"}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
