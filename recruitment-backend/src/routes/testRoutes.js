import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/private", protect, (req, res) => {
    res.json({
        message: "You accessed protected route",
        user: req.user
    });
});

router.get(
    "/recruiter-only",
    protect,
    authorizeRoles("recruiter"),
    (req, res) => {
        res.json({
            message: "Recruiter route accessed"
        });
    }
);

export default router;
