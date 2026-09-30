const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Upload folder
const uploadDir = path.join(__dirname, "../uploads");

// Folder automatically create karo agar nahi hai
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume is required"
            });
        }

        res.json({
            message: "Resume uploaded successfully",
            fileName: req.file.filename
        });
    }
);

module.exports = router;