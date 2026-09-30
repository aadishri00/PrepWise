const express = require("express");
const CodingQuestion = require("../models/CodingQuestion");

const router = express.Router();


// Random questions
router.get("/test", async (req, res) => {

    try {

        const limit = Number(req.query.limit) || 5;

        const questions = await CodingQuestion.aggregate([
            {
                $sample: {
                    size: limit
                }
            }
        ]);

        res.json({
            questions
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to get questions"
        });
    }
});


// All questions
router.get("/all", async (req, res) => {

    const questions =
        await CodingQuestion.find();

    res.json({
        questions
    });
});


module.exports = router;