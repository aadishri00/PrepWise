const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        score: {
            type: Number,
            required: true
        },

        totalQuestions: {
            type: Number,
            required: true
        },

        percentage: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            default: "Aptitude"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("TestResult", schema);