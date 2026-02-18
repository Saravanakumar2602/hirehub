import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Helper for error handling if needed, though simple try/catch is used here as requested.

export const applyToJob = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Resume is required (PDF only)" });
    }

    const application = await Application.create({
        candidate: req.user._id,
        job: jobId,
        resumePath: req.file.path
    });

    res.status(201).json({
        message: "Application submitted successfully",
        application
    });
});

export const getApplicationsForJob = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId;

    const applications = await Application.find({ job: jobId })
        .populate("candidate", "name email")
        .sort({ createdAt: -1 });

    res.json(applications);
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({
        message: "Application status updated",
        application
    });
});

export const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({
        candidate: req.user._id
    })
        .populate("job")
        .sort({ createdAt: -1 });

    res.json(applications);
});
