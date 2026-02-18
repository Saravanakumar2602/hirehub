"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

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
            fetchMyJobs(); // Refresh list
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
        try {
            const res = await API.get(`/applications/job/${jobId}`);
            setApplications(res.data);
            setSelectedJob(jobId);
        } catch (err) {
            console.error("Failed to fetch applications", err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/applications/${id}`, { status });
            // Optimistic update or refresh
            setApplications(apps => apps.map(app =>
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

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Recruiter Dashboard</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    {showForm ? "Cancel" : "+ Post New Job"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
                    <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Job Title"
                            className="border p-2 rounded"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            placeholder="Location"
                            className="border p-2 rounded"
                            required
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min Salary"
                                className="border p-2 rounded w-full"
                                required
                                value={formData.salaryMin}
                                onChange={e => setFormData({ ...formData, salaryMin: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Max Salary"
                                className="border p-2 rounded w-full"
                                required
                                value={formData.salaryMax}
                                onChange={e => setFormData({ ...formData, salaryMax: e.target.value })}
                            />
                        </div>
                        <select
                            className="border p-2 rounded"
                            value={formData.experienceLevel}
                            onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                        >
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                        </select>
                        <textarea
                            placeholder="Job Description"
                            className="border p-2 rounded md:col-span-2 h-32"
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <button className="bg-green-600 text-white py-2 rounded md:col-span-2 hover:bg-green-700 font-bold">
                            Post Job
                        </button>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">My Jobs</h2>

                    {loading ? <p>Loading jobs...</p> : jobs.length === 0 ? <p>No jobs posted yet.</p> : (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className={`bg-white border p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer ${selectedJob === job._id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}
                                    onClick={() => fetchApplications(job._id)}
                                >
                                    <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{job.location} • {job.experienceLevel}</p>
                                    <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">{job.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    {selectedJob ? (
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 sticky top-10">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                Applicants
                                <span className="ml-2 text-sm font-normal text-gray-500">({applications.length})</span>
                            </h2>

                            {applications.length === 0 ? (
                                <p className="text-gray-500 italic">No applications received yet.</p>
                            ) : (
                                <div className="space-y-4 h-[500px] overflow-y-auto pr-2">
                                    {applications.map((app) => (
                                        <div key={app._id} className="border border-gray-100 p-4 rounded bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold text-gray-800">{app.candidate.name}</p>
                                                    <p className="text-sm text-gray-600">{app.candidate.email}</p>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded capitalize font-medium ${app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </div>

                                            <div className="flex gap-2 text-sm mt-3">
                                                <a
                                                    href={`http://localhost:5000/${app.resumePath.replace(/\\/g, "/")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                                                >
                                                    View Resume
                                                </a>
                                            </div>

                                            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                                                <button
                                                    className="flex-1 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition text-sm"
                                                    onClick={() => updateStatus(app._id, "accepted")}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="flex-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition text-sm"
                                                    onClick={() => updateStatus(app._id, "rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-10">
                            <p>Select a job to view applicants</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
