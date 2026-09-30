const express = require("express");
const User = require("../models/User");
const TestResult = require("../models/TestResult");
const CodingResult = require("../models/CodingResult");
const CodingQuestion = require("../models/CodingQuestion");
const AptitudeQuestion = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();


// ADMIN DASHBOARD

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const totalUsers =
                await User.countDocuments();

            const totalAdmins =
                await User.countDocuments({
                    role: "admin"
                });

            const aptitudeTests =
                await TestResult.countDocuments();

            const codingTests =
                await CodingResult.countDocuments();

            const aptitudeQuestions =
                await AptitudeQuestion.countDocuments();

            const codingQuestions =
                await CodingQuestion.countDocuments();


            res.json({
                success: true,

                stats: {
                    totalUsers,
                    totalAdmins,
                    aptitudeTests,
                    codingTests,
                    aptitudeQuestions,
                    codingQuestions
                }
            });

        } catch (error) {

            console.log("Dashboard Error:", error.message);

            res.status(500).json({
                message: "Failed to load dashboard"
            });

        }
    }
);


// GET ALL USERS

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const users =
                await User.find({})
                    .select("-password")
                    .sort({ createdAt: -1 });

            res.json({
                success: true,
                users
            });

        } catch (error) {

            console.log("Users Error:", error.message);

            res.status(500).json({
                message: "Failed to fetch users"
            });

        }
    }
);


// DELETE USER

router.delete(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const user =
                await User.findById(req.params.id);

            if (!user) {

                return res.status(404).json({
                    message: "User not found"
                });

            }

            // Admin khud ko delete nahi kar sakta

            if (
                user._id.toString() ===
                req.user.userId.toString()
            ) {

                return res.status(400).json({
                    message: "You cannot delete yourself"
                });

            }

            await User.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message: "User deleted successfully"
            });

        } catch (error) {

            console.log(
                "Delete User Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to delete user"
            });

        }
    }
);


// MAKE USER ADMIN

router.put(
    "/users/:id/make-admin",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const user =
                await User.findById(req.params.id);

            if (!user) {

                return res.status(404).json({
                    message: "User not found"
                });

            }

            if (user.role === "admin") {

                return res.status(400).json({
                    message: "User is already an admin"
                });

            }

            user.role = "admin";

            await user.save();

            res.json({
                success: true,
                message: "User is now an admin"
            });

        } catch (error) {

            console.log(
                "Make Admin Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to make user admin"
            });

        }
    }
);


// APTITUDE QUESTIONS


// GET ALL APTITUDE QUESTIONS

router.get(
    "/aptitude-questions",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const questions =
                await AptitudeQuestion.find({})
                    .sort({ createdAt: -1 });

            res.json({
                success: true,
                questions
            });

        } catch (error) {

            console.log(
                "Aptitude Questions Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to fetch aptitude questions"
            });

        }
    }
);


// ADD APTITUDE QUESTION

router.post(
    "/aptitude-questions",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const {
                question,
                options,
                correctAnswer,
                category
            } = req.body;


            // Question check

            if (!question || !question.trim()) {

                return res.status(400).json({
                    message: "Question is required"
                });

            }


            // Options check

            if (
                !options ||
                !Array.isArray(options) ||
                options.length !== 4
            ) {

                return res.status(400).json({
                    message: "4 options are required"
                });

            }


            // Correct answer check

            if (
                correctAnswer === undefined ||
                correctAnswer === null ||
                correctAnswer === ""
            ) {

                return res.status(400).json({
                    message: "Correct answer is required"
                });

            }


            const newQuestion =
                await AptitudeQuestion.create({

                    question: question.trim(),

                    options: options,

                    correctAnswer: correctAnswer,

                    category: category || "General"

                });


            res.status(201).json({

                success: true,

                message: "Aptitude question added successfully",

                question: newQuestion

            });

        } catch (error) {

            console.log(
                "Add Aptitude Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to add aptitude question"
            });

        }
    }
);


// DELETE APTITUDE QUESTION

router.delete(
    "/aptitude-questions/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const question =
                await AptitudeQuestion.findById(
                    req.params.id
                );

            if (!question) {

                return res.status(404).json({
                    message: "Question not found"
                });

            }

            await AptitudeQuestion.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message: "Question deleted successfully"
            });

        } catch (error) {

            console.log(
                "Delete Question Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to delete question"
            });

        }
    }
);


// CODING QUESTIONS


// GET ALL CODING QUESTIONS

router.get(
    "/coding-questions",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const questions =
                await CodingQuestion.find({})
                    .sort({ createdAt: -1 });

            res.json({
                success: true,
                questions
            });

        } catch (error) {

            console.log(
                "Coding Questions Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to fetch coding questions"
            });

        }
    }
);


// ADD CODING QUESTION

router.post(
    "/coding-questions",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const {
                title,
                description,
                difficulty,
                category,
                input,
                output,
                starterCode,
                hiddenTestCases
            } = req.body;


            // Title check

            if (!title || !title.trim()) {

                return res.status(400).json({
                    message: "Title is required"
                });

            }


            // Description check

            if (
                !description ||
                !description.trim()
            ) {

                return res.status(400).json({
                    message: "Description is required"
                });

            }


            // Hidden test cases

            if (
                !hiddenTestCases ||
                !Array.isArray(hiddenTestCases)
            ) {

                return res.status(400).json({
                    message: "Hidden test cases are required"
                });

            }


            const newQuestion =
                await CodingQuestion.create({

                    title: title.trim(),

                    description: description.trim(),

                    difficulty:
                        difficulty || "Easy",

                    category:
                        category || "General",

                    input: input || "",

                    output: output || "",

                    starterCode:
                        starterCode || "",

                    hiddenTestCases:
                        hiddenTestCases

                });


            res.status(201).json({

                success: true,

                message: "Coding question added successfully",

                question: newQuestion

            });

        } catch (error) {

            console.log(
                "Add Coding Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to add coding question"
            });

        }
    }
);


// DELETE CODING QUESTION

router.delete(
    "/coding-questions/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const question =
                await CodingQuestion.findById(
                    req.params.id
                );

            if (!question) {

                return res.status(404).json({
                    message: "Question not found"
                });

            }


            await CodingQuestion.findByIdAndDelete(
                req.params.id
            );


            res.json({
                success: true,
                message: "Coding question deleted successfully"
            });

        } catch (error) {

            console.log(
                "Delete Coding Question Error:",
                error.message
            );

            res.status(500).json({
                message: "Failed to delete coding question"
            });

        }
    }
);


module.exports = router;