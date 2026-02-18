"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");

    const fetchJobs = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            if (location) params.append("location", location);
            if (experience) params.append("experienceLevel", experience);

            const query = params.toString();
            const res = await API.get(`/jobs?${query}`);
            setJobs(res.data.jobs);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []); // Initial load

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Available Jobs</h1>

            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm items-center">
                <input
                    placeholder="Location (e.g. Remote)"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <select
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                >
                    <option value="">All Levels</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                </select>

                <button
                    onClick={fetchJobs}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-200"
                >
                    Filter
                </button>
            </div>

            {/* Job List */}
            {loading ? (
                <p className="text-gray-600">Loading jobs...</p>
            ) : jobs.length === 0 ? (
                <p className="text-gray-600 italic">No jobs found matching your criteria.</p>
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

                            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
