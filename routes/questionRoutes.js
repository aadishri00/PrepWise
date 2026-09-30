const express = require("express");
const Question = require("../models/Question");

const router = express.Router();


// ADD QUESTION

router.post("/", async (req, res) => {
    try {
        const {
            question,
            options,
            correctAnswer,
            category
        } = req.body;

        if (
            !question ||
            !options ||
            !correctAnswer ||
            !category
        ) {
            return res.status(400).json({
                message: "All question fields are required"
            });
        }

        const newQuestion = await Question.create({
            question,
            options,
            correctAnswer,
            category
        });

        res.status(201).json({
            message: "Question created successfully",
            question: newQuestion
        });

    } catch (error) {

        console.log(
            "QUESTION CREATE ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to create question"
        });
    }
});


// GET RANDOM QUESTIONS FOR TEST

router.get("/test", async (req, res) => {

    try {

        const questions =
            await Question.aggregate([
                {
                    $sample: {
                        size: 20
                    }
                }
            ]);

        res.json({
            message:
                "Random aptitude questions fetched successfully",

            questions
        });

    } catch (error) {

        console.log(
            "RANDOM QUESTION ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch aptitude questions"
        });
    }
});


// GET ALL QUESTIONS

router.get("/", async (req, res) => {

    try {

        const questions =
            await Question.find({});

        res.json({
            message:
                "Questions fetched successfully",

            questions
        });

    } catch (error) {

        console.log(
            "QUESTION FETCH ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch questions"
        });
    }
});


module.exports = router;