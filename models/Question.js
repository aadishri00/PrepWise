const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },

        options: {
            type: [String],
            required: true,
            validate: {
                validator: (value) => {
                    return (
                        Array.isArray(value) &&
                        value.length >= 2
                    );
                },
                message:
                    "At least 2 options are required"
            }
        },

        correctAnswer: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Question = mongoose.model(
    "Question",
    questionSchema
);

module.exports = Question;