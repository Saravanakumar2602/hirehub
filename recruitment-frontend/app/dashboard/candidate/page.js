"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function CandidateDashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Applications</h1>

            {loading ? (
                <p>Loading...</p>
            ) : applications.length === 0 ? (
                <p className="text-gray-600">No applications yet. Go apply for some jobs!</p>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white border text-black border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-blue-900 mb-1">{app.job?.title || "Job Unavailable"}</h2>
                                    <p className="text-gray-600 mb-2">{app.job?.location || "N/A"}</p>
                                    <p className="text-sm text-gray-400">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <p className="text-sm text-gray-500">Resume: <a href={`http://localhost:5000/${app.resumePath.replace(/\\/g, "/")}`} target="_blank" className="text-blue-600 hover:underline">View File</a></p>
                                {/* Could add Withdraw Application button here later */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
