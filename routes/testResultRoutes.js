const express = require("express");
const TestResult = require("../models/TestResult");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

    try {

        const {
            score,
            totalQuestions,
            percentage,
            category
        } = req.body;

        const result = await TestResult.create({
            user: req.user.userId,
            score,
            totalQuestions,
            percentage,
            category: category || "Aptitude"
        });

        res.status(201).json({
            message: "Result saved",
            result
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to save result"
        });
    }
});


router.get("/", authMiddleware, async (req, res) => {

    const results = await TestResult.find({
        user: req.user.userId
    }).sort({ createdAt: -1 });

    res.json({
        results
    });
});


router.get("/aptitude", authMiddleware, async (req, res) => {

    const results = await TestResult.find({
        user: req.user.userId,
        category: "Aptitude"
    }).sort({ createdAt: -1 });

    res.json({
        results
    });
});


module.exports = router;