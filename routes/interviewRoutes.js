const express = require("express");
const InterviewQuestion = require("../models/InterviewQuestion");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const category = req.query.category;

        const filter = category
            ? { category: category }
            : {};

        const questions = await InterviewQuestion.aggregate([
            {
                $match: filter
            },
            {
                $sample: {
                    size: 10
                }
            }
        ]);

        res.json(questions);

    } catch (error) {
        console.log("INTERVIEW ERROR:", error);

        res.status(500).json({
            message: "Failed to get interview questions"
        });
    }
});

module.exports = router;