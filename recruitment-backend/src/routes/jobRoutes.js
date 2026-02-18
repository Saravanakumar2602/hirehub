import express from "express";
import {
    createJob,
    getJobs,
    getJobById,
    deleteJob,
    getMyJobs
} from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

import { body } from "express-validator";

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("recruiter"),
    [
        body("title").notEmpty().withMessage("Title required"),
        body("salaryMin").isNumeric().withMessage("Salary must be number"),
        body("salaryMax").isNumeric().withMessage("Salary must be number")
    ],
    createJob
);
router.get("/", getJobs);
router.get(
    "/my",
    protect,
    authorizeRoles("recruiter"),
    getMyJobs
);
router.get("/:id", getJobById);
router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);

export default router;
