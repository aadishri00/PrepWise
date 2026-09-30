const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const Resume = require("../models/Resume");

const {
    getResumeText,
    generateResumeFeedback
} = require("../utils/aiResumeFeedback");

const router = express.Router();

router.get("/feedback", authMiddleware, async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user.userId
        }).sort({
            createdAt: -1
        });

        if (!resume) {
            return res.status(404).json({
                message: "Please upload your resume first"
            });
        }

        const resumeText = await getResumeText(
            resume.filePath
        );

        if (!resumeText.trim()) {
            return res.status(400).json({
                message: "Could not read text from resume"
            });
        }

     
        const feedback =
            generateResumeFeedback(resumeText);

        res.json({
            message: "Resume feedback generated successfully",
            feedback: feedback
        });

    } catch (error) {

        console.log(
            "RESUME FEEDBACK ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to generate resume feedback"
        });
    }
});

module.exports = router;