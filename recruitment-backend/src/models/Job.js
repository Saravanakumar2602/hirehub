import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        salaryMin: {
            type: Number,
            required: true
        },
        salaryMax: {
            type: Number,
            required: true
        },
        experienceLevel: {
            type: String,
            enum: ["junior", "mid", "senior"],
            required: true
        },
        location: {
            type: String,
            required: true
        },
        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open"
        }
    },
    { timestamps: true }
);

// Indexing for performance
jobSchema.index({ location: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ salaryMin: 1 });
jobSchema.index({ createdAt: -1 });

export default mongoose.model("Job", jobSchema);
