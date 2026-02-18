import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files allowed"), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});
