import Job from "../models/Job.js";

import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createJob = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.create({
        ...req.body,
        recruiter: req.user._id
    });

    res.status(201).json({
        message: "Job created successfully",
        job
    });
});

export const getJobs = async (req, res) => {
    try {
        const { location, experienceLevel, page = 1, limit = 10 } = req.query;

        const query = {};

        if (location) query.location = location;
        if (experienceLevel) query.experienceLevel = experienceLevel;

        const total = await Job.countDocuments(query);

        const jobs = await Job.find(query)
            .populate("recruiter", "name email")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json({
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            jobs
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("recruiter", "name email");

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ recruiter: req.user._id })
        .sort({ createdAt: -1 });

    res.json(jobs);
});

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Only recruiter who created it can delete
        if (job.recruiter.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await job.deleteOne();

        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
