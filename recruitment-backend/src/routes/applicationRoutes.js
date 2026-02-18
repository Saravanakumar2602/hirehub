import express from "express";
import {
    applyToJob,
    getApplicationsForJob,
    updateApplicationStatus
} from "../controllers/applicationController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Candidate applies
router.post(
    "/:jobId",
    protect,
    authorizeRoles("candidate"),
    upload.single("resume"),
    applyToJob
);

// Recruiter views applicants
router.get(
    "/job/:jobId",
    protect,
    authorizeRoles("recruiter"),
    getApplicationsForJob
);

// Recruiter updates status
router.put(
    "/:id",
    protect,
    authorizeRoles("recruiter"),
    updateApplicationStatus
);

export default router;
