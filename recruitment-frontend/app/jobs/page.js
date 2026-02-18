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
            setJobs(res.data.jobs);
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
                headers: {
                    "Content-Type": "multipart/form-data" // Browser sets boundary automatically, but good to be explicit or let axios handle it
                }
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
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Available Jobs</h1>

            {loading ? (
                <p className="text-gray-600">Loading jobs...</p>
            ) : jobs.length === 0 ? (
                <p className="text-gray-600 italic">No jobs found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white border text-black border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition duration-200 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-blue-900 mb-2">{job.title}</h2>
                                <div className="flex gap-2 mb-3 text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded capitalize">{job.experienceLevel}</span>
                                </div>
                                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                                <p className="font-semibold text-green-700 mb-4">
                                    ₹{job.salaryMin.toLocaleString()} - ₹{job.salaryMax.toLocaleString()}
                                </p>
                            </div>

                            {user?.role === "candidate" ? (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    {selectedJob === job._id ? (
                                        <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF)</label>
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                        "
                                                onChange={(e) => setResume(e.target.files[0])}
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApply(job._id)}
                                                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium"
                                                >
                                                    Submit Application
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedJob(null); setResume(null); }}
                                                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedJob(job._id)}
                                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
                                        >
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-gray-500 italic">
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
