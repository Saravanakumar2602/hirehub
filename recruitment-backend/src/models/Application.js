import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        resumePath: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["applied", "reviewed", "accepted", "rejected"],
            default: "applied"
        }
    },
    { timestamps: true }
);

// Prevent duplicate application
applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);
