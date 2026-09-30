const mongoose = require("mongoose");

const codingResultSchema =
    new mongoose.Schema(
        {

            user: {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true
            },


            question: {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "CodingQuestion",

                required: true
            },


            code: {
                type: String,

                required: true
            },


            passed: {
                type: Number,

                default: 0
            },


            total: {
                type: Number,

                default: 0
            },


            percentage: {
                type: Number,

                default: 0
            },


            status: {
                type: String,

                enum: [
                    "ACCEPTED",
                    "WRONG_ANSWER",
                    "TIME_LIMIT_EXCEEDED",
                    "RUNTIME_ERROR",
                    "COMPILATION_ERROR"
                ],

                default: "WRONG_ANSWER"
            }

        },

        {
            timestamps: true
        }
    );


module.exports =
    mongoose.model(
        "CodingResult",
        codingResultSchema
    );